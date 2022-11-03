import { InvalidRequestError } from '@atproto/xrpc-server'
import { RepoStructure } from '@atproto/repo'
import { PlcClient } from '@atproto/plc'
import { AtUri } from '@atproto/uri'
import * as crypto from '@atproto/crypto'
import * as uint8arrays from 'uint8arrays'
import { Server, APP_BSKY } from '../../../lexicon'
import * as locals from '../../../locals'
import { countAll } from '../../../db/util'
import { UserAlreadyExistsError } from '../../../db'
import SqlBlockstore from '../../../sql-blockstore'
import { ensureValidHandle } from './util/handle'
import { grantRefreshToken } from './util/auth'
import * as schema from '../../../lexicon/schemas'

export default function (server: Server) {
  server.com.atproto.getAccountsConfig((_params, _input, _req, res) => {
    const cfg = locals.config(res)

    const availableUserDomains = cfg.availableUserDomains
    const inviteCodeRequired = cfg.inviteRequired

    return {
      encoding: 'application/json',
      body: { availableUserDomains, inviteCodeRequired },
    }
  })

  server.com.atproto.getAccount(() => {
    throw new InvalidRequestError('Not implemented')
  })

  server.com.atproto.createAccount(async (_params, input, _req, res) => {
    const { password, inviteCode, recoveryKey } = input.body
    const { db, auth, config, keypair, logger } = locals.get(res)
    const handle = input.body.handle.toLowerCase()
    const email = input.body.email.toLowerCase()

    // throws if not
    ensureValidHandle(handle, config.availableUserDomains)

    // In order to perform the significant db updates ahead of
    // registering the did, we will use a temp invalid did. Once everything
    // goes well and a fresh did is registered, we'll replace the temp values.
    const tempDid = uint8arrays.toString(crypto.randomBytes(16), 'base32')
    const now = new Date().toISOString()

    const result = await db.transaction(async (dbTxn) => {
      if (config.inviteRequired) {
        if (!inviteCode) {
          throw new InvalidRequestError(
            'No invite code provided',
            'InvalidInviteCode',
          )
        }

        const invite = await dbTxn.db
          .selectFrom('invite_code')
          .selectAll()
          .where('code', '=', inviteCode)
          // Lock invite code to avoid duplicate use
          .if(dbTxn.dialect === 'pg', (qb) => qb.forUpdate())
          .executeTakeFirst()

        const { useCount } = await dbTxn.db
          .selectFrom('invite_code_use')
          .select(countAll.as('useCount'))
          .where('code', '=', inviteCode)
          .executeTakeFirstOrThrow()

        if (!invite || invite.disabled || invite.availableUses <= useCount) {
          logger.info({ handle, email, inviteCode }, 'invalid invite code')
          throw new InvalidRequestError(
            'Provided invite code not available',
            'InvalidInviteCode',
          )
        }
      }

      // Pre-register user before going out to PLC to get a real did
      try {
        await dbTxn.preregisterUserDid(handle, tempDid)
      } catch (err) {
        if (err instanceof UserAlreadyExistsError) {
          throw new InvalidRequestError(`Handle already taken: ${handle}`)
        }
        throw err
      }
      try {
        await dbTxn.registerUser(email, handle, password)
      } catch (err) {
        if (err instanceof UserAlreadyExistsError) {
          throw new InvalidRequestError(`Email already taken: ${email}`)
        }
        throw err
      }

      // Generate a real did with PLC
      const plcClient = new PlcClient(config.didPlcUrl)
      let did: string
      try {
        did = await plcClient.createDid(
          keypair,
          recoveryKey || config.recoveryKey,
          handle,
          config.publicUrl,
        )
      } catch (err) {
        logger.error(
          { didKey: keypair.did(), handle },
          'failed to create did:plc',
        )
        throw err
      }

      // Now that we have a real did, we now replace the tempDid
      // and setup the repo root. This _should_ succeed under typical conditions.
      await dbTxn.finalizeUserDid(handle, did, tempDid)
      if (config.inviteRequired && inviteCode) {
        await dbTxn.db
          .insertInto('invite_code_use')
          .values({
            code: inviteCode,
            usedBy: did,
            usedAt: now,
          })
          .execute()
      }

      // Setup repo root
      const authStore = locals.getAuthstore(res, did)
      const blockstore = new SqlBlockstore(dbTxn, did, now)
      const repo = await RepoStructure.create(blockstore, did, authStore)

      const declaration = {
        $type: 'app.bsky.declaration',
        actorType: APP_BSKY.ActorUser,
      }
      const declarationCid = await blockstore.put(declaration)
      const uri = new AtUri(`${did}/${schema.ids.AppBskyDeclaration}/self`)

      await repo
        .stageUpdate({
          action: 'create',
          collection: uri.collection,
          rkey: uri.rkey,
          cid: declarationCid,
        })
        .createCommit(authStore, async (_prev, curr) => {
          await dbTxn.db
            .insertInto('repo_root')
            .values({
              did: did,
              root: curr.toString(),
              indexedAt: now,
            })
            .execute()
          return null
        })

      await dbTxn.indexRecord(uri, declarationCid, declaration, now)

      const access = auth.createAccessToken(did)
      const refresh = auth.createRefreshToken(did)
      await grantRefreshToken(dbTxn, refresh.payload)

      return {
        did,
        declarationCid,
        accessJwt: access.jwt,
        refreshJwt: refresh.jwt,
      }
    })

    return {
      encoding: 'application/json',
      body: {
        handle,
        did: result.did,
        accessJwt: result.accessJwt,
        refreshJwt: result.refreshJwt,
        declarationCid: result.declarationCid.toString(),
      },
    }
  })

  server.com.atproto.deleteAccount(() => {
    // TODO
    throw new InvalidRequestError('Not implemented')
  })
}

import { Kysely } from 'kysely';
import * as InviteAccept from '../../lexicon/types/app/bsky/graph/inviteAccept';
import { DbRecordPlugin } from '../types';
declare const tableName = "app_bsky_invite_accept";
export interface AppBskyInviteAccept {
    uri: string;
    cid: string;
    creator: string;
    groupDid: string;
    groupDeclarationCid: string;
    inviteUri: string;
    inviteCid: string;
    createdAt: string;
    indexedAt: string;
}
export declare type PartialDB = {
    [tableName]: AppBskyInviteAccept;
};
export declare const makePlugin: (db: Kysely<PartialDB>) => DbRecordPlugin<InviteAccept.Record, AppBskyInviteAccept>;
export default makePlugin;

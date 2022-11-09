import { Kysely, Migrator } from 'kysely';
import { ValidationResult } from '@atproto/lexicon';
import { DbRecordPlugin, NotificationsPlugin } from './types';
import * as Declaration from '../lexicon/types/app/bsky/system/declaration';
import * as Invite from '../lexicon/types/app/bsky/graph/invite';
import * as InviteAccept from '../lexicon/types/app/bsky/graph/inviteAccept';
import * as Follow from '../lexicon/types/app/bsky/graph/follow';
import * as Like from '../lexicon/types/app/bsky/feed/like';
import * as Post from '../lexicon/types/app/bsky/feed/post';
import * as Profile from '../lexicon/types/app/bsky/actor/profile';
import * as Repost from '../lexicon/types/app/bsky/feed/repost';
import { AppBskyDeclaration } from './records/declaration';
import { AppBskyPost } from './records/post';
import { AppBskyLike } from './records/like';
import { AppBskyRepost } from './records/repost';
import { AppBskyFollow } from './records/follow';
import { AppBskyInvite } from './records/invite';
import { AppBskyInviteAccept } from './records/inviteAccept';
import { AppBskyProfile } from './records/profile';
import { AtUri } from '@atproto/uri';
import { CID } from 'multiformats/cid';
import { DatabaseSchema } from './database-schema';
import { User } from './tables/user';
import { UserDid } from './tables/user-did';
export declare class Database {
    db: Kysely<DatabaseSchema>;
    dialect: Dialect;
    schema?: string | undefined;
    migrator: Migrator;
    records: {
        declaration: DbRecordPlugin<Declaration.Record, AppBskyDeclaration>;
        post: DbRecordPlugin<Post.Record, AppBskyPost>;
        like: DbRecordPlugin<Like.Record, AppBskyLike>;
        repost: DbRecordPlugin<Repost.Record, AppBskyRepost>;
        follow: DbRecordPlugin<Follow.Record, AppBskyFollow>;
        profile: DbRecordPlugin<Profile.Record, AppBskyProfile>;
        invite: DbRecordPlugin<Invite.Record, AppBskyInvite>;
        inviteAccept: DbRecordPlugin<InviteAccept.Record, AppBskyInviteAccept>;
    };
    notifications: NotificationsPlugin;
    constructor(db: Kysely<DatabaseSchema>, dialect: Dialect, schema?: string | undefined);
    static sqlite(location: string): Database;
    static postgres(opts: {
        url: string;
        schema?: string;
    }): Database;
    static memory(): Database;
    transaction<T>(fn: (db: Database) => Promise<T>): Promise<T>;
    get isTransaction(): boolean;
    assertTransaction(): void;
    close(): Promise<void>;
    migrateToLatestOrThrow(): Promise<import("kysely").MigrationResult[]>;
    getRepoRoot(did: string, forUpdate?: boolean): Promise<CID | null>;
    updateRepoRoot(did: string, root: CID, prev: CID, timestamp?: string): Promise<boolean>;
    getUser(handleOrDid: string): Promise<(User & UserDid) | null>;
    getUserByEmail(email: string): Promise<(User & UserDid) | null>;
    getUserDid(handleOrDid: string): Promise<string | null>;
    registerUser(email: string, handle: string, password: string): Promise<void>;
    registerUserDid(handle: string, did: string): Promise<void>;
    updateUserPassword(handle: string, password: string): Promise<void>;
    verifyUserPassword(handle: string, password: string): Promise<boolean>;
    validateRecord(collection: string, obj: unknown): ValidationResult;
    canIndexRecord(collection: string, obj: unknown): boolean;
    indexRecord(uri: AtUri, cid: CID, obj: unknown, timestamp?: string): Promise<void>;
    deleteRecord(uri: AtUri): Promise<void>;
    listCollectionsForDid(did: string): Promise<string[]>;
    listRecordsForCollection(did: string, collection: string, limit: number, reverse: boolean, before?: string, after?: string): Promise<{
        uri: string;
        cid: string;
        value: object;
    }[]>;
    getRecord(uri: AtUri, cid: string | null): Promise<{
        uri: string;
        cid: string;
        value: object;
    } | null>;
    findTableForCollection(collection: string): DbRecordPlugin<Declaration.Record, AppBskyDeclaration> | DbRecordPlugin<Post.Record, AppBskyPost> | DbRecordPlugin<Like.Record, AppBskyLike> | DbRecordPlugin<Repost.Record, AppBskyRepost> | DbRecordPlugin<Follow.Record, AppBskyFollow> | DbRecordPlugin<Invite.Record, AppBskyInvite> | DbRecordPlugin<InviteAccept.Record, AppBskyInviteAccept> | DbRecordPlugin<Profile.Record, AppBskyProfile>;
}
export default Database;
export declare type Dialect = 'pg' | 'sqlite';
export declare const dbType: Kysely<DatabaseSchema>;
export declare class UserAlreadyExistsError extends Error {
}

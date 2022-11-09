import { Kysely } from 'kysely';
import * as Invite from '../../lexicon/types/app/bsky/graph/invite';
import { DbRecordPlugin } from '../types';
declare const tableName = "app_bsky_invite";
export interface AppBskyInvite {
    uri: string;
    cid: string;
    creator: string;
    group: string;
    subjectDid: string;
    subjectDeclarationCid: string;
    createdAt: string;
    indexedAt: string;
}
export declare type PartialDB = {
    [tableName]: AppBskyInvite;
};
export declare const makePlugin: (db: Kysely<PartialDB>) => DbRecordPlugin<Invite.Record, AppBskyInvite>;
export default makePlugin;

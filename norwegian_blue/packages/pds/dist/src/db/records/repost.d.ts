import { Kysely } from 'kysely';
import * as Repost from '../../lexicon/types/app/bsky/feed/repost';
import { DbRecordPlugin } from '../types';
declare const tableName = "app_bsky_repost";
export interface AppBskyRepost {
    uri: string;
    cid: string;
    creator: string;
    subject: string;
    subjectCid: string;
    createdAt: string;
    indexedAt: string;
}
export declare type PartialDB = {
    [tableName]: AppBskyRepost;
};
export declare const makePlugin: (db: Kysely<PartialDB>) => DbRecordPlugin<Repost.Record, AppBskyRepost>;
export default makePlugin;

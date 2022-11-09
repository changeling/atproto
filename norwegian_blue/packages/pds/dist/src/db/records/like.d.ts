import { Kysely } from 'kysely';
import * as Like from '../../lexicon/types/app/bsky/feed/like';
import { DbRecordPlugin } from '../types';
declare const tableName = "app_bsky_like";
export interface AppBskyLike {
    uri: string;
    cid: string;
    creator: string;
    subject: string;
    subjectCid: string;
    createdAt: string;
    indexedAt: string;
}
export declare type PartialDB = {
    [tableName]: AppBskyLike;
};
export declare const makePlugin: (db: Kysely<PartialDB>) => DbRecordPlugin<Like.Record, AppBskyLike>;
export default makePlugin;

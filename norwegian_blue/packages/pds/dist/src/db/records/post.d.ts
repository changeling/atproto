import { Kysely } from 'kysely';
import * as Post from '../../lexicon/types/app/bsky/feed/post';
import { DbRecordPlugin } from '../types';
declare const tableName = "app_bsky_post";
export interface AppBskyPost {
    uri: string;
    cid: string;
    creator: string;
    text: string;
    replyRoot: string | null;
    replyRootCid: string | null;
    replyParent: string | null;
    replyParentCid: string | null;
    createdAt: string;
    indexedAt: string;
}
declare const supportingTableName = "app_bsky_post_entity";
export interface AppBskyPostEntity {
    postUri: string;
    startIndex: number;
    endIndex: number;
    type: string;
    value: string;
}
export declare type PartialDB = {
    [tableName]: AppBskyPost;
    [supportingTableName]: AppBskyPostEntity;
};
export declare const makePlugin: (db: Kysely<PartialDB>) => DbRecordPlugin<Post.Record, AppBskyPost>;
export default makePlugin;

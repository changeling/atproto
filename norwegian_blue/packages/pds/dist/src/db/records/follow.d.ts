import { Kysely } from 'kysely';
import * as Follow from '../../lexicon/types/app/bsky/graph/follow';
import { DbRecordPlugin } from '../types';
declare const tableName = "app_bsky_follow";
export interface AppBskyFollow {
    uri: string;
    cid: string;
    creator: string;
    subjectDid: string;
    subjectDeclarationCid: string;
    createdAt: string;
    indexedAt: string;
}
export declare type PartialDB = {
    [tableName]: AppBskyFollow;
};
export declare const makePlugin: (db: Kysely<PartialDB>) => DbRecordPlugin<Follow.Record, AppBskyFollow>;
export default makePlugin;

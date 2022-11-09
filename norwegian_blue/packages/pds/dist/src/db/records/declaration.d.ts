import { Kysely } from 'kysely';
import * as Declaration from '../../lexicon/types/app/bsky/system/declaration';
import { DbRecordPlugin } from '../types';
declare const tableName = "app_bsky_declaration";
export interface AppBskyDeclaration {
    uri: string;
    cid: string;
    creator: string;
    actorType: string;
    indexedAt: string;
}
export declare type PartialDB = {
    [tableName]: AppBskyDeclaration;
};
export declare const makePlugin: (db: Kysely<PartialDB>) => DbRecordPlugin<Declaration.Record, AppBskyDeclaration>;
export default makePlugin;

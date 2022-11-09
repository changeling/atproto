import { Kysely } from 'kysely';
import * as Profile from '../../lexicon/types/app/bsky/actor/profile';
import { DbRecordPlugin } from '../types';
declare const tableName = "app_bsky_profile";
export interface AppBskyProfile {
    uri: string;
    cid: string;
    creator: string;
    displayName: string;
    description: string | null;
    indexedAt: string;
}
export declare type PartialDB = {
    [tableName]: AppBskyProfile;
};
export declare const makePlugin: (db: Kysely<PartialDB>) => DbRecordPlugin<Profile.Record, AppBskyProfile>;
export default makePlugin;

import { AtUri } from '@atproto/uri';
import { ValidationResult } from '@atproto/lexicon';
import { CID } from 'multiformats/cid';
export declare type DbRecordPlugin<T, S> = {
    collection: string;
    tableName: string;
    validateSchema: (obj: unknown) => ValidationResult;
    matchesSchema: (obj: unknown) => obj is T;
    translateDbObj: (dbObj: S) => T;
    get: (uri: AtUri) => Promise<T | null>;
    insert: (uri: AtUri, cid: CID, obj: unknown, timestamp?: string) => Promise<void>;
    delete: (uri: AtUri) => Promise<void>;
    notifsForRecord: (uri: AtUri, cid: CID, obj: unknown) => Notification[];
};
export declare type NotificationsPlugin = {
    process: (notifs: Notification[]) => Promise<void>;
    deleteForRecord: (uri: AtUri) => Promise<void>;
};
export declare type Notification = {
    userDid: string;
    author: string;
    recordUri: string;
    recordCid: string;
    reason: string;
    reasonSubject?: string;
};
export declare type NotificationReason = 'like' | 'repost' | 'follow' | 'invite' | 'reply';

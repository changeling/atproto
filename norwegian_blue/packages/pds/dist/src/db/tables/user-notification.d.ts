import { Kysely } from 'kysely';
import { AtUri } from '@atproto/uri';
import { Notification, NotificationsPlugin } from '../types';
export declare const tableName = "user_notification";
export interface UserNotification {
    userDid: string;
    recordUri: string;
    recordCid: string;
    author: string;
    reason: string;
    reasonSubject: string | null;
    indexedAt: string;
}
export declare type PartialDB = {
    [tableName]: UserNotification;
};
export declare const process: (db: Kysely<PartialDB>) => (notifs: Notification[]) => Promise<void>;
export declare const deleteForRecord: (db: Kysely<PartialDB>) => (uri: AtUri) => Promise<void>;
declare const _default: (db: Kysely<PartialDB>) => NotificationsPlugin;
export default _default;

import { Kysely } from 'kysely';
import { DatabaseSchema } from '../../../../db/database-schema';
declare type UserInfo = {
    did: string;
    handle: string;
    displayName: string | undefined;
};
export declare const getUserInfo: (db: Kysely<DatabaseSchema>, user: string) => Promise<UserInfo>;
export declare const isEnum: <T extends {
    [s: string]: unknown;
}>(object: T, possibleValue: unknown) => possibleValue is T[keyof T];
export {};

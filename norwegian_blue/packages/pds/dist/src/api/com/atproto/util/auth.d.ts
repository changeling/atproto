import { RefreshToken } from '../../../../auth';
import Database from '../../../../db';
export declare const grantRefreshToken: (db: Database, payload: RefreshToken) => Promise<import("kysely").InsertResult>;
export declare const revokeRefreshToken: (db: Database, id: string) => Promise<boolean>;

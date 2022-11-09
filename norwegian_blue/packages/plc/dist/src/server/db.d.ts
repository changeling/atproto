import { Kysely, Migrator } from 'kysely';
import { CID } from 'multiformats/cid';
import * as t from '../lib/types';
export declare class Database {
    db: Kysely<DatabaseSchema>;
    dialect: Dialect;
    schema?: string | undefined;
    migrator: Migrator;
    constructor(db: Kysely<DatabaseSchema>, dialect: Dialect, schema?: string | undefined);
    static sqlite(location: string): Database;
    static postgres(opts: {
        url: string;
        schema?: string;
    }): Database;
    static memory(): Database;
    close(): Promise<void>;
    migrateToLatestOrThrow(): Promise<import("kysely").MigrationResult[]>;
    validateAndAddOp(did: string, proposed: t.Operation): Promise<void>;
    mostRecentCid(did: string, notIncluded: CID[]): Promise<CID | null>;
    opsForDid(did: string): Promise<t.Operation[]>;
    _opsForDid(did: string): Promise<t.IndexedOperation[]>;
}
export default Database;
export declare type Dialect = 'pg' | 'sqlite';
interface OperationsTable {
    did: string;
    operation: string;
    cid: string;
    nullified: 0 | 1;
    createdAt: string;
}
interface DatabaseSchema {
    operations: OperationsTable;
}

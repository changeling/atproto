import Database from '../../../../db';
import { DbRef } from '../../../../db/util';
export declare const getUserSearchQueryPg: (db: Database, opts: {
    term: string;
    limit: number;
    before?: string;
}) => import("kysely").SelectQueryBuilder<import("kysely/dist/cjs/parser/table-parser").From<import("../../../../db/database-schema").DatabaseSchema, import("kysely").AliasedQueryBuilder<import("kysely/dist/cjs/parser/table-parser").From<import("../../../../db/database-schema").DatabaseSchema, import("kysely").AliasedQueryBuilder<import("kysely/dist/cjs/parser/table-parser").From<import("../../../../db/database-schema").DatabaseSchema, "user">, "user", import("kysely").Selection<import("kysely/dist/cjs/parser/table-parser").From<import("../../../../db/database-schema").DatabaseSchema, "user">, "user", import("kysely").AliasedRawBuilder<unknown, "did"> | import("kysely").AliasedRawBuilder<number, "distance">>, "accounts_and_profiles">>, "accounts_and_profiles", {
    did: unknown;
    distance: number;
}, "results">>, "user_did" | "results", Partial<Omit<{}, never>>>;
export declare const getUserSearchQuerySqlite: (db: Database, opts: {
    term: string;
    limit: number;
    before?: string;
}) => import("kysely").SelectQueryBuilder<import("kysely/dist/cjs/parser/table-parser").From<import("../../../../db/database-schema").DatabaseSchema, "user_did">, "user_did", {}>;
export declare const packCursor: (row: {
    distance: number;
    handle: string;
}) => string;
export declare const unpackCursor: (before: string) => {
    distance: number;
    handle: string;
};
export declare const cleanTerm: (term: string) => string;
declare const distance: (term: string, ref: DbRef) => import("kysely").RawBuilder<number>;
export {};

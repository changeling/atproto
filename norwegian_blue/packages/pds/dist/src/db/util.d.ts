import { DummyDriver, DynamicModule, RawBuilder, SelectQueryBuilder, SqliteAdapter, SqliteIntrospector, SqliteQueryCompiler } from 'kysely';
export declare const userWhereClause: (user: string) => RawBuilder<0 | 1>;
export declare const countAll: RawBuilder<number>;
export declare const paginate: <QB extends SelectQueryBuilder<any, any, any>>(qb: QB, opts: {
    limit?: number;
    before?: string;
    by: DbRef;
}) => SelectQueryBuilder<any, any, any>;
export declare const dummyDialect: {
    createAdapter(): SqliteAdapter;
    createDriver(): DummyDriver;
    createIntrospector(db: any): SqliteIntrospector;
    createQueryCompiler(): SqliteQueryCompiler;
};
export declare type DbRef = RawBuilder | ReturnType<DynamicModule['ref']>;

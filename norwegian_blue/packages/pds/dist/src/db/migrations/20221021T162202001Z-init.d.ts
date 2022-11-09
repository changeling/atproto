import { Kysely } from 'kysely';
import { Dialect } from '..';
export declare function up(db: Kysely<unknown>, dialect: Dialect): Promise<void>;
export declare function down(db: Kysely<unknown>): Promise<void>;

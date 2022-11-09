import { IpldStore } from '@atproto/repo';
import { CID } from 'multiformats/cid';
import Database from './db';
export declare class SqlBlockstore extends IpldStore {
    db: Database;
    did: string;
    timestamp?: string | undefined;
    constructor(db: Database, did: string, timestamp?: string | undefined);
    has(cid: CID): Promise<boolean>;
    getBytes(cid: CID): Promise<Uint8Array>;
    putBytes(cid: CID, bytes: Uint8Array): Promise<void>;
    destroy(): Promise<void>;
}
export default SqlBlockstore;

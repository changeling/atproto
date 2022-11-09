import { NSID } from '@atproto/nsid';
import { CID } from 'multiformats/cid';
import Repo from './repo';
export declare class Collection {
    repo: Repo;
    nsid: NSID;
    constructor(repo: Repo, nsid: NSID | string);
    name(): string;
    dataIdForRecord(key: string): string;
    getRecord(key: string): Promise<unknown | null>;
    listRecords(count?: number, after?: string, before?: string): Promise<{
        key: string;
        value: unknown;
    }[]>;
    createRecord(record: unknown, rkey?: string): Promise<{
        rkey: string;
        cid: CID;
    }>;
    updateRecord(rkey: string, record: unknown): Promise<CID>;
    deleteRecord(rkey: string): Promise<void>;
}
export default Collection;

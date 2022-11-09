import * as auth from '@atproto/auth';
import { CID } from 'multiformats';
import CidSet from '../cid-set';
export declare class DataDiff {
    adds: Record<string, DataAdd>;
    updates: Record<string, DataUpdate>;
    deletes: Record<string, DataDelete>;
    newCids: CidSet;
    recordAdd(key: string, cid: CID): void;
    recordUpdate(key: string, prev: CID, cid: CID): void;
    recordDelete(key: string, cid: CID): void;
    recordNewCid(cid: CID): void;
    addDiff(diff: DataDiff): void;
    addList(): DataAdd[];
    updateList(): DataUpdate[];
    deleteList(): DataDelete[];
    newCidList(): CID[];
    updatedKeys(): string[];
    neededCapabilities(rootDid: string): auth.ucans.Capability[];
}
export declare type DataAdd = {
    key: string;
    cid: CID;
};
export declare type DataUpdate = {
    key: string;
    prev: CID;
    cid: CID;
};
export declare type DataDelete = {
    key: string;
    cid: CID;
};

import { CID } from 'multiformats/cid';
import { BlockWriter } from '@ipld/car/lib/writer-browser';
import { RepoRoot, Commit, CidWriteOp, DataStore, RepoMeta } from './types';
import IpldStore from './blockstore/ipld-store';
import * as auth from '@atproto/auth';
declare type Params = {
    blockstore: IpldStore;
    data: DataStore;
    commit: Commit;
    root: RepoRoot;
    meta: RepoMeta;
    cid: CID;
    stagedWrites: CidWriteOp[];
};
export declare class RepoStructure {
    blockstore: IpldStore;
    data: DataStore;
    commit: Commit;
    root: RepoRoot;
    meta: RepoMeta;
    cid: CID;
    stagedWrites: CidWriteOp[];
    constructor(params: Params);
    static create(blockstore: IpldStore, did: string, authStore: auth.AuthStore): Promise<RepoStructure>;
    static load(blockstore: IpldStore, cid: CID): Promise<RepoStructure>;
    private updateRepo;
    did(): string;
    getRecord(collection: string, rkey: string): Promise<unknown | null>;
    stageUpdate(write: CidWriteOp | CidWriteOp[]): RepoStructure;
    createCommit(authStore: auth.AuthStore, performUpdate?: (prev: CID, curr: CID) => Promise<CID | null>): Promise<RepoStructure>;
    revert(count: number): Promise<RepoStructure>;
    getCarNoHistory(): Promise<Uint8Array>;
    getDiffCar(to: CID | null): Promise<Uint8Array>;
    getFullHistory(): Promise<Uint8Array>;
    private openCar;
    writeCheckoutToCarStream(car: BlockWriter): Promise<void>;
    writeCommitsToCarStream(car: BlockWriter, oldestCommit: CID | null, recentCommit: CID): Promise<void>;
}
export default RepoStructure;

import { CID } from 'multiformats/cid';
import { BlockWriter } from '@ipld/car/lib/writer-browser';
import { RepoRoot, Commit, CidWriteOp, DataStore, RepoMeta, RecordWriteOp } from './types';
import IpldStore from './blockstore/ipld-store';
import * as auth from '@atproto/auth';
import { DataDiff } from './mst';
import Collection from './collection';
import RepoStructure from './structure';
export declare class Repo {
    blockstore: IpldStore;
    structure: RepoStructure;
    authStore: auth.AuthStore | null;
    verifier: auth.Verifier;
    constructor(params: {
        blockstore: IpldStore;
        structure: RepoStructure;
        authStore: auth.AuthStore | undefined;
        verifier: auth.Verifier | undefined;
    });
    static create(blockstore: IpldStore, did: string, authStore: auth.AuthStore, verifier?: auth.Verifier): Promise<Repo>;
    static load(blockstore: IpldStore, cid: CID, verifier?: auth.Verifier, authStore?: auth.AuthStore): Promise<Repo>;
    static fromCarFile(buf: Uint8Array, blockstore: IpldStore, verifier?: auth.Verifier, verifyAuthority?: boolean, authStore?: auth.AuthStore): Promise<Repo>;
    get did(): string;
    get data(): DataStore;
    get commit(): Commit;
    get root(): RepoRoot;
    get meta(): RepoMeta;
    get cid(): CID;
    getCollection(name: string): Collection;
    safeCommit(write: CidWriteOp | CidWriteOp[]): Promise<void>;
    batchWrite(writes: RecordWriteOp[]): Promise<void>;
    revert(count: number): Promise<void>;
    loadRoot(newRoot: CID): Promise<void>;
    verifyUpdates(earliest: CID | null, latest: CID): Promise<DataDiff>;
    loadAndVerifyDiff(buf: Uint8Array): Promise<DataDiff>;
    loadCarRoot(buf: Uint8Array): Promise<void>;
    getCarNoHistory(): Promise<Uint8Array>;
    getDiffCar(to: CID | null): Promise<Uint8Array>;
    getFullHistory(): Promise<Uint8Array>;
    writeCheckoutToCarStream(car: BlockWriter): Promise<void>;
    writeCommitsToCarStream(car: BlockWriter, oldestCommit: CID | null, recentCommit: CID): Promise<void>;
}
export default Repo;

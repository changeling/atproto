import { CID } from 'multiformats/cid';
import { BlockWriter } from '@ipld/car/writer';
import { check } from '@atproto/common';
import { BlockReader } from '@ipld/car/api';
import CidSet from '../cid-set';
export declare abstract class IpldStore {
    abstract has(cid: CID): Promise<boolean>;
    abstract getBytes(cid: CID): Promise<Uint8Array>;
    abstract putBytes(cid: CID, bytes: Uint8Array): Promise<void>;
    abstract destroy(): Promise<void>;
    put(value: unknown): Promise<CID>;
    get<T>(cid: CID, schema: check.Def<T>): Promise<T>;
    getUnchecked(cid: CID): Promise<unknown>;
    isMissing(cid: CID): Promise<boolean>;
    checkMissing(cids: CidSet): Promise<CidSet>;
    addToCar(car: BlockWriter, cid: CID): Promise<void>;
    loadCar(buf: Uint8Array): Promise<CID>;
    loadCarBlocks(car: BlockReader): Promise<void>;
}
export default IpldStore;

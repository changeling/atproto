import { CID } from 'multiformats/cid';
import IpldStore from './ipld-store';
export declare class MemoryBlockstore extends IpldStore {
    map: Map<string, Uint8Array>;
    constructor();
    getBytes(k: CID): Promise<Uint8Array>;
    putBytes(k: CID, v: Uint8Array): Promise<void>;
    has(k: CID): Promise<boolean>;
    sizeInBytes(): Promise<number>;
    destroy(): Promise<void>;
    getContents(): Promise<Record<string, unknown>>;
}
export default MemoryBlockstore;

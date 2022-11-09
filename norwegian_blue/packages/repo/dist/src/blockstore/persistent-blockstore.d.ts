import level from 'level';
import { CID } from 'multiformats/cid';
import IpldStore from './ipld-store';
export declare class PersistentBlockstore extends IpldStore {
    store: level.Level;
    constructor(location?: string);
    getBytes(cid: CID): Promise<Uint8Array>;
    putBytes(cid: CID, bytes: Uint8Array): Promise<void>;
    has(cid: CID): Promise<boolean>;
    destroy(): Promise<void>;
}
export default PersistentBlockstore;

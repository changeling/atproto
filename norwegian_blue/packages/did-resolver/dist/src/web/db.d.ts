import { DIDDocument } from 'did-resolver';
interface DidStore {
    put(key: string, val: string): Promise<void>;
    del(key: string): Promise<void>;
    get(key: string): Promise<string>;
}
export declare class DidWebDb {
    private store;
    constructor(store: DidStore);
    static persistent(location?: string): DidWebDb;
    static memory(): DidWebDb;
    put(didPath: string, didDoc: DIDDocument): Promise<void>;
    get(didPath: string): Promise<DIDDocument | null>;
    has(didPath: string): Promise<boolean>;
    del(didPath: string): Promise<void>;
}
export default DidWebDb;

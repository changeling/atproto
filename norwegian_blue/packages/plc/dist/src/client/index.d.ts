import { CID } from 'multiformats/cid';
import { DidableKey } from '@atproto/crypto';
import * as t from '../lib/types';
export declare class PlcClient {
    url: string;
    constructor(url: string);
    getDocument(did: string): Promise<t.DidDocument>;
    getDocumentData(did: string): Promise<t.DocumentData>;
    getOperationLog(did: string): Promise<t.Operation[]>;
    postOpUrl(did: string): string;
    createDid(signingKey: DidableKey, recoveryKey: string, handle: string, service: string): Promise<string>;
    getPrev(did: any): Promise<CID>;
    rotateSigningKey(did: string, newKey: string, signingKey: DidableKey, prev?: CID): Promise<void>;
    rotateRecoveryKey(did: string, newKey: string, signingKey: DidableKey, prev?: CID): Promise<void>;
    updateHandle(did: string, handle: string, signingKey: DidableKey): Promise<void>;
    updateAtpPds(did: string, service: string, signingKey: DidableKey): Promise<void>;
    health(): Promise<import("axios").AxiosResponse<any, any>>;
}
export default PlcClient;

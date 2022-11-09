import * as ucan from '@ucans/core';
import { DidableKey } from '@ucans/core';
import { CapWithProof, Signer } from './types';
import { PluginInjectedApi } from './plugins';
export declare class AuthStore implements Signer {
    protected keypair: DidableKey;
    protected ucanStore: ucan.StoreI | null;
    protected tokens: string[];
    protected controlledDid: string | null;
    protected ucanApi: PluginInjectedApi;
    constructor(ucanApi: PluginInjectedApi, keypair: DidableKey, tokens: string[], controlledDid?: string);
    protected getKeypair(): Promise<DidableKey>;
    addUcan(token: ucan.Ucan): Promise<void>;
    getUcanStore(): Promise<ucan.StoreI>;
    clear(): Promise<void>;
    reset(): Promise<void>;
    keypairDid(): Promise<string>;
    did(): Promise<string>;
    canSignForDid(did: string): Promise<boolean>;
    sign(data: Uint8Array): Promise<Uint8Array>;
    findProof(cap: ucan.Capability): Promise<ucan.DelegationChain | null>;
    findUcan(cap: ucan.Capability): Promise<ucan.Ucan | null>;
    hasUcan(cap: ucan.Capability): Promise<boolean>;
    createUcan(audience: string, cap: ucan.Capability, lifetime?: number): Promise<ucan.Ucan>;
    createUcanForCaps(audience: string, caps: ucan.Capability[], lifetime?: number): Promise<ucan.Ucan>;
    vaguestProofForCap(cap: ucan.Capability): Promise<CapWithProof | null>;
    claimFull(): Promise<ucan.Ucan>;
}
export default AuthStore;

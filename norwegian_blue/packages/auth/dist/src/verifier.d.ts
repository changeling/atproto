import * as ucans from '@ucans/core';
import { DidableKey } from '@atproto/crypto';
import { PluginInjectedApi } from './plugins';
import AuthStore from './auth-store';
import { DidResolver } from '@atproto/did-resolver';
export declare const DID_KEY_PLUGINS: ucans.DidKeyPlugin[];
export declare type VerifierOpts = {
    didResolver: DidResolver;
    plcUrl: string;
    resolutionTimeout: number;
    additionalDidMethods: Record<string, ucans.DidMethodPlugin>;
    additionalDidKeys: [ucans.DidKeyPlugin];
};
export declare class Verifier {
    didResolver: DidResolver;
    plugins: ucans.Plugins;
    ucanApi: PluginInjectedApi;
    constructor(opts?: Partial<VerifierOpts>);
    loadAuthStore(keypair: DidableKey, tokens: string[], controlledDid?: string): AuthStore;
    createTempAuthStore(tokens?: string[]): Promise<AuthStore>;
    verifySignature(did: string, data: Uint8Array, sig: Uint8Array): Promise<boolean>;
    verifySignatureUtf8(did: string, data: string, sig: string): Promise<boolean>;
    verifyUcan(token: ucans.Ucan | string, opts: ucans.VerifyOptions): Promise<ucans.Ucan>;
    verifyAtpUcan(token: ucans.Ucan | string, audience: string, cap: ucans.Capability): Promise<ucans.Ucan>;
    verifyFullWritePermission(token: ucans.Ucan | string, audience: string, repoDid: string): Promise<ucans.Ucan>;
    validateUcan(encodedUcan: string, opts?: Partial<ucans.ValidateOptions>): Promise<ucans.Ucan>;
}
export default Verifier;

import * as ucans from '@ucans/core';
export declare type BuildFn = (params: {
    issuer: ucans.DidableKey;
    audience: string;
    capabilities?: Array<ucans.Capability>;
    lifetimeInSeconds?: number;
    expiration?: number;
    notBefore?: number;
    facts?: Array<ucans.Fact>;
    proofs?: Array<string>;
    addNonce?: boolean;
}) => Promise<ucans.Ucan>;
export declare type SignFn = (payload: ucans.UcanPayload, jwtAlg: string, signFn: (data: Uint8Array) => Promise<Uint8Array>) => Promise<ucans.Ucan>;
export declare type SignWithKeypairFn = (payload: ucans.UcanPayload, keypair: ucans.Keypair) => Promise<ucans.Ucan>;
export declare type ValidateFn = (encodedUcan: string, opts?: Partial<ucans.ValidateOptions>) => Promise<ucans.Ucan>;
export declare type ValidateProofsFn = (ucan: ucans.Ucan, opts?: Partial<ucans.ValidateProofsOptions>) => AsyncIterable<ucans.Ucan | Error>;
export declare type VerifyFn = (ucan: string, options: ucans.VerifyOptions) => Promise<ucans.Result<ucans.Verification[], Error[]>>;
export declare type DelegationChainsFn = (semantics: ucans.DelegationSemantics, ucan: ucans.Ucan, isRevoked?: (ucan: ucans.Ucan) => Promise<boolean>) => AsyncIterable<ucans.DelegationChain | Error>;
export declare type BuilderClass = any;
export declare type StoreClass = any;
export declare type PluginInjectedApi = {
    build: BuildFn;
    sign: SignFn;
    signWithKeypair: SignWithKeypairFn;
    validate: ValidateFn;
    validateProofs: ValidateProofsFn;
    verify: VerifyFn;
    Builder: BuilderClass;
    Store: StoreClass;
    delegationChains: DelegationChainsFn;
};

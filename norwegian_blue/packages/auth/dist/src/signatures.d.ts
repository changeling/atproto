import * as ucans from '@ucans/core';
export declare const verifySignature: (plugins: ucans.Plugins) => (did: string, data: Uint8Array, sig: Uint8Array) => Promise<boolean>;
export declare const verifySignatureUtf8: (plugins: ucans.Plugins) => (did: string, data: string, sig: string) => Promise<boolean>;

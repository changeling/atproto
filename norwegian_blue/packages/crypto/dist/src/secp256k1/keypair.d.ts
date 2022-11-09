import * as ucan from '@ucans/core';
export declare type Secp256k1KeypairOptions = {
    exportable: boolean;
};
export declare class Secp256k1Keypair implements ucan.DidableKey {
    private privateKey;
    private exportable;
    jwtAlg: string;
    private publicKey;
    constructor(privateKey: Uint8Array, exportable: boolean);
    static create(opts?: Partial<Secp256k1KeypairOptions>): Promise<Secp256k1Keypair>;
    static import(privKey: Uint8Array | string, opts?: Partial<Secp256k1KeypairOptions>): Promise<Secp256k1Keypair>;
    publicKeyBytes(): Uint8Array;
    publicKeyStr(encoding?: ucan.Encodings): string;
    did(): string;
    sign(msg: Uint8Array): Promise<Uint8Array>;
    export(): Promise<Uint8Array>;
}
export default Secp256k1Keypair;

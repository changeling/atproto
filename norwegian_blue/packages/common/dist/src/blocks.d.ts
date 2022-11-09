import { CID } from 'multiformats/cid';
import * as Block from 'multiformats/block';
export declare const valueToIpldBlock: (data: unknown) => Promise<Block.Block<unknown>>;
export declare const cidForData: (data: unknown) => Promise<CID>;
export declare const valueToIpldBytes: (value: unknown) => Uint8Array;
export declare const ipldBytesToValue: (bytes: Uint8Array) => unknown;
export declare const ipldBytesToRecord: (bytes: Uint8Array) => object;

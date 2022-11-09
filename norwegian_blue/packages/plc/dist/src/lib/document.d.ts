import { CID } from 'multiformats/cid';
import * as t from './types';
export declare const assureValidNextOp: (did: string, ops: t.IndexedOperation[], proposed: t.Operation) => Promise<{
    nullified: CID[];
    prev: CID | null;
}>;
export declare const validateOperationLog: (did: string, ops: t.Operation[]) => Promise<t.DocumentData>;
export declare const hashAndFindDid: (op: t.CreateOp, truncate?: number) => Promise<string>;
export declare const assureValidCreationOp: (did: string, op: t.CreateOp) => Promise<void>;
export declare const assureValidSig: (allowedDids: string[], op: t.Operation) => Promise<void>;
export declare const formatDidDoc: (data: t.DocumentData) => t.DidDocument;
export declare const ensureHttpPrefix: (str: string) => string;

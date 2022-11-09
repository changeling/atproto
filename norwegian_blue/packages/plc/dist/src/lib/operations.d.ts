import { DidableKey } from '@atproto/crypto';
import * as t from './types';
export declare const didForCreateOp: (op: t.CreateOp, truncate?: number) => Promise<string>;
export declare const signOperation: (op: t.UnsignedOperation, signingKey: DidableKey) => Promise<t.Operation>;
export declare const create: (signingKey: DidableKey, recoveryKey: string, handle: string, service: string) => Promise<t.CreateOp>;
export declare const rotateSigningKey: (newKey: string, prev: string, signingKey: DidableKey) => Promise<t.Operation>;
export declare const rotateRecoveryKey: (newKey: string, prev: string, signingKey: DidableKey) => Promise<t.Operation>;
export declare const updateHandle: (handle: string, prev: string, signingKey: DidableKey) => Promise<t.Operation>;
export declare const updateAtpPds: (service: string, prev: string, signingKey: DidableKey) => Promise<t.Operation>;

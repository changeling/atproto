import * as ucan from '@ucans/core';
export declare const writeCap: (did: string, collection?: string, record?: string) => ucan.Capability;
export declare const maintenanceCap: (did: string) => ucan.Capability;
export declare const vaguerCap: (cap: ucan.Capability) => ucan.Capability | null;

export declare const wait: (ms: number) => Promise<unknown>;
export declare const flattenUint8Arrays: (arrs: Uint8Array[]) => Uint8Array;
export declare const streamToArray: (stream: AsyncIterable<Uint8Array>) => Promise<Uint8Array>;
export declare const s32encode: (i: number) => string;
export declare const s32decode: (s: string) => number;
export declare const asyncFilter: <T>(arr: T[], fn: (t: T) => Promise<boolean>) => Promise<T[]>;

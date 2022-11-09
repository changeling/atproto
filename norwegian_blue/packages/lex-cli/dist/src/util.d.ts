import { Schema } from '@atproto/lexicon';
import { GeneratedAPI, FileDiff } from './types';
export declare function schemaTemplate(nsid: string, options?: Record<string, string>): {
    xrpc: number;
    id: string;
    type: string;
    description: string;
    parameters: {};
    input: {
        encoding: string;
        schema: {};
    };
    output: {
        encoding: string;
        schema: {};
    };
};
export declare function readAllSchemas(paths: string[]): Schema[];
export declare function readSchema(path: string): Schema;
export declare function genTsObj(schemas: Schema[]): string;
export declare function genFileDiff(outDir: string, api: GeneratedAPI): FileDiff[];
export declare function printFileDiff(diff: FileDiff[]): void;
export declare function applyFileDiff(diff: FileDiff[]): void;

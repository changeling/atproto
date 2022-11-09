import { Schema } from '@atproto/lexicon';
export interface NsidNS {
    name: string;
    className: string;
    propName: string;
    children: NsidNS[];
    schemas: Schema[];
}
export declare function schemasToNsidTree(schemas: Schema[]): NsidNS[];
export declare function schemasToNsidTokens(schemas: Schema[]): Record<string, string[]>;
export declare function toTitleCase(v: string): string;
export declare function toCamelCase(v: string): string;
export declare function toScreamingSnakeCase(v: string): string;

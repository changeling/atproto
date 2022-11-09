import z from 'zod';
import { CID } from 'multiformats';
import IpldStore from '../blockstore/ipld-store';
import { DataDiff } from './diff';
import { DataStore } from '../types';
import { BlockWriter } from '@ipld/car/api';
export declare const nodeDataDef: z.ZodObject<{
    l: z.ZodNullable<z.ZodEffects<z.ZodEffects<z.ZodAny, any, any>, CID, any>>;
    e: z.ZodArray<z.ZodObject<{
        p: z.ZodNumber;
        k: z.ZodString;
        v: z.ZodEffects<z.ZodEffects<z.ZodAny, any, any>, CID, any>;
        t: z.ZodNullable<z.ZodEffects<z.ZodEffects<z.ZodAny, any, any>, CID, any>>;
    }, "strip", z.ZodTypeAny, {
        t: CID | null;
        p: number;
        k: string;
        v: CID;
    }, {
        t?: any;
        v?: any;
        p: number;
        k: string;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    l: CID | null;
    e: {
        t: CID | null;
        p: number;
        k: string;
        v: CID;
    }[];
}, {
    l?: any;
    e: {
        t?: any;
        v?: any;
        p: number;
        k: string;
    }[];
}>;
export declare type NodeData = z.infer<typeof nodeDataDef>;
export declare type NodeEntry = MST | Leaf;
export declare type Fanout = 2 | 8 | 16 | 32 | 64;
export declare type MstOpts = {
    layer: number;
    fanout: Fanout;
};
export declare class MST implements DataStore {
    blockstore: IpldStore;
    fanout: Fanout;
    entries: NodeEntry[] | null;
    layer: number | null;
    pointer: CID;
    outdatedPointer: boolean;
    constructor(blockstore: IpldStore, fanout: Fanout, pointer: CID, entries: NodeEntry[] | null, layer: number | null);
    static create(blockstore: IpldStore, entries?: NodeEntry[], opts?: Partial<MstOpts>): Promise<MST>;
    static fromData(blockstore: IpldStore, data: NodeData, opts?: Partial<MstOpts>): Promise<MST>;
    static load(blockstore: IpldStore, cid: CID, opts?: Partial<MstOpts>): MST;
    newTree(entries: NodeEntry[]): Promise<MST>;
    getEntries(): Promise<NodeEntry[]>;
    getPointer(): Promise<CID>;
    getLayer(): Promise<number>;
    save(): Promise<CID>;
    add(key: string, value: CID, knownZeros?: number): Promise<MST>;
    get(key: string): Promise<CID | null>;
    update(key: string, value: CID): Promise<MST>;
    delete(key: string): Promise<MST>;
    diff(other: MST): Promise<DataDiff>;
    updateEntry(index: number, entry: NodeEntry): Promise<MST>;
    removeEntry(index: number): Promise<MST>;
    append(entry: NodeEntry): Promise<MST>;
    prepend(entry: NodeEntry): Promise<MST>;
    atIndex(index: number): Promise<NodeEntry | null>;
    slice(start?: number | undefined, end?: number | undefined): Promise<NodeEntry[]>;
    spliceIn(entry: NodeEntry, index: number): Promise<MST>;
    replaceWithSplit(index: number, left: MST | null, leaf: Leaf, right: MST | null): Promise<MST>;
    splitAround(key: string): Promise<[MST | null, MST | null]>;
    appendMerge(toMerge: MST): Promise<MST>;
    createChild(): Promise<MST>;
    createParent(): Promise<MST>;
    findGtOrEqualLeafIndex(key: string): Promise<number>;
    walkLeavesFrom(key: string): AsyncIterable<Leaf>;
    list(count: number, after?: string, before?: string): Promise<Leaf[]>;
    listWithPrefix(prefix: string, count?: number): Promise<Leaf[]>;
    walk(): AsyncIterable<NodeEntry>;
    paths(): Promise<NodeEntry[][]>;
    allNodes(): Promise<NodeEntry[]>;
    leaves(): Promise<Leaf[]>;
    leafCount(): Promise<number>;
    writeToCarStream(car: BlockWriter): Promise<void>;
    isTree(): this is MST;
    isLeaf(): this is Leaf;
    equals(other: NodeEntry): Promise<boolean>;
}
export declare class Leaf {
    key: string;
    value: CID;
    constructor(key: string, value: CID);
    isTree(): this is MST;
    isLeaf(): this is Leaf;
    equals(entry: NodeEntry): boolean;
}
export default MST;

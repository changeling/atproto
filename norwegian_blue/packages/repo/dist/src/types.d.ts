import { z } from 'zod';
import { BlockWriter } from '@ipld/car/writer';
import { CID } from 'multiformats';
import { DataDiff } from './mst';
declare const repoMeta: z.ZodObject<{
    did: z.ZodString;
    version: z.ZodNumber;
    datastore: z.ZodString;
}, "strip", z.ZodTypeAny, {
    version: number;
    did: string;
    datastore: string;
}, {
    version: number;
    did: string;
    datastore: string;
}>;
export declare type RepoMeta = z.infer<typeof repoMeta>;
declare const repoRoot: z.ZodObject<{
    meta: z.ZodEffects<z.ZodEffects<z.ZodAny, any, any>, CID, any>;
    prev: z.ZodNullable<z.ZodEffects<z.ZodEffects<z.ZodAny, any, any>, CID, any>>;
    auth_token: z.ZodNullable<z.ZodEffects<z.ZodEffects<z.ZodAny, any, any>, CID, any>>;
    data: z.ZodEffects<z.ZodEffects<z.ZodAny, any, any>, CID, any>;
}, "strip", z.ZodTypeAny, {
    data: CID;
    meta: CID;
    prev: CID | null;
    auth_token: CID | null;
}, {
    data?: any;
    meta?: any;
    prev?: any;
    auth_token?: any;
}>;
export declare type RepoRoot = z.infer<typeof repoRoot>;
declare const commit: z.ZodObject<{
    root: z.ZodEffects<z.ZodEffects<z.ZodAny, any, any>, CID, any>;
    sig: z.ZodType<Uint8Array, z.ZodTypeDef, Uint8Array>;
}, "strip", z.ZodTypeAny, {
    root: CID;
    sig: Uint8Array;
}, {
    root?: any;
    sig: Uint8Array;
}>;
export declare type Commit = z.infer<typeof commit>;
export declare const cidCreateOp: z.ZodObject<{
    action: z.ZodLiteral<"create">;
    collection: z.ZodString;
    rkey: z.ZodString;
    cid: z.ZodEffects<z.ZodEffects<z.ZodAny, any, any>, CID, any>;
}, "strip", z.ZodTypeAny, {
    collection: string;
    action: "create";
    rkey: string;
    cid: CID;
}, {
    cid?: any;
    collection: string;
    action: "create";
    rkey: string;
}>;
export declare const cidUpdateOp: z.ZodObject<{
    action: z.ZodLiteral<"update">;
    collection: z.ZodString;
    rkey: z.ZodString;
    cid: z.ZodEffects<z.ZodEffects<z.ZodAny, any, any>, CID, any>;
}, "strip", z.ZodTypeAny, {
    collection: string;
    action: "update";
    rkey: string;
    cid: CID;
}, {
    cid?: any;
    collection: string;
    action: "update";
    rkey: string;
}>;
export declare const deleteOp: z.ZodObject<{
    action: z.ZodLiteral<"delete">;
    collection: z.ZodString;
    rkey: z.ZodString;
}, "strip", z.ZodTypeAny, {
    collection: string;
    action: "delete";
    rkey: string;
}, {
    collection: string;
    action: "delete";
    rkey: string;
}>;
export declare const cidWriteOp: z.ZodUnion<[z.ZodObject<{
    action: z.ZodLiteral<"create">;
    collection: z.ZodString;
    rkey: z.ZodString;
    cid: z.ZodEffects<z.ZodEffects<z.ZodAny, any, any>, CID, any>;
}, "strip", z.ZodTypeAny, {
    collection: string;
    action: "create";
    rkey: string;
    cid: CID;
}, {
    cid?: any;
    collection: string;
    action: "create";
    rkey: string;
}>, z.ZodObject<{
    action: z.ZodLiteral<"update">;
    collection: z.ZodString;
    rkey: z.ZodString;
    cid: z.ZodEffects<z.ZodEffects<z.ZodAny, any, any>, CID, any>;
}, "strip", z.ZodTypeAny, {
    collection: string;
    action: "update";
    rkey: string;
    cid: CID;
}, {
    cid?: any;
    collection: string;
    action: "update";
    rkey: string;
}>, z.ZodObject<{
    action: z.ZodLiteral<"delete">;
    collection: z.ZodString;
    rkey: z.ZodString;
}, "strip", z.ZodTypeAny, {
    collection: string;
    action: "delete";
    rkey: string;
}, {
    collection: string;
    action: "delete";
    rkey: string;
}>]>;
export declare type CidWriteOp = z.infer<typeof cidWriteOp>;
export declare const recordCreateOp: z.ZodObject<{
    action: z.ZodLiteral<"create">;
    collection: z.ZodString;
    rkey: z.ZodString;
    value: z.ZodAny;
}, "strip", z.ZodTypeAny, {
    value?: any;
    collection: string;
    action: "create";
    rkey: string;
}, {
    value?: any;
    collection: string;
    action: "create";
    rkey: string;
}>;
export declare const recordUpdateOp: z.ZodObject<{
    action: z.ZodLiteral<"update">;
    collection: z.ZodString;
    rkey: z.ZodString;
    value: z.ZodAny;
}, "strip", z.ZodTypeAny, {
    value?: any;
    collection: string;
    action: "update";
    rkey: string;
}, {
    value?: any;
    collection: string;
    action: "update";
    rkey: string;
}>;
export declare const recordWriteOp: z.ZodUnion<[z.ZodObject<{
    action: z.ZodLiteral<"create">;
    collection: z.ZodString;
    rkey: z.ZodString;
    value: z.ZodAny;
}, "strip", z.ZodTypeAny, {
    value?: any;
    collection: string;
    action: "create";
    rkey: string;
}, {
    value?: any;
    collection: string;
    action: "create";
    rkey: string;
}>, z.ZodObject<{
    action: z.ZodLiteral<"update">;
    collection: z.ZodString;
    rkey: z.ZodString;
    value: z.ZodAny;
}, "strip", z.ZodTypeAny, {
    value?: any;
    collection: string;
    action: "update";
    rkey: string;
}, {
    value?: any;
    collection: string;
    action: "update";
    rkey: string;
}>, z.ZodObject<{
    action: z.ZodLiteral<"delete">;
    collection: z.ZodString;
    rkey: z.ZodString;
}, "strip", z.ZodTypeAny, {
    collection: string;
    action: "delete";
    rkey: string;
}, {
    collection: string;
    action: "delete";
    rkey: string;
}>]>;
export declare type RecordWriteOp = z.infer<typeof recordWriteOp>;
export declare const def: {
    repoMeta: z.ZodObject<{
        did: z.ZodString;
        version: z.ZodNumber;
        datastore: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        version: number;
        did: string;
        datastore: string;
    }, {
        version: number;
        did: string;
        datastore: string;
    }>;
    repoRoot: z.ZodObject<{
        meta: z.ZodEffects<z.ZodEffects<z.ZodAny, any, any>, CID, any>;
        prev: z.ZodNullable<z.ZodEffects<z.ZodEffects<z.ZodAny, any, any>, CID, any>>;
        auth_token: z.ZodNullable<z.ZodEffects<z.ZodEffects<z.ZodAny, any, any>, CID, any>>;
        data: z.ZodEffects<z.ZodEffects<z.ZodAny, any, any>, CID, any>;
    }, "strip", z.ZodTypeAny, {
        data: CID;
        meta: CID;
        prev: CID | null;
        auth_token: CID | null;
    }, {
        data?: any;
        meta?: any;
        prev?: any;
        auth_token?: any;
    }>;
    commit: z.ZodObject<{
        root: z.ZodEffects<z.ZodEffects<z.ZodAny, any, any>, CID, any>;
        sig: z.ZodType<Uint8Array, z.ZodTypeDef, Uint8Array>;
    }, "strip", z.ZodTypeAny, {
        root: CID;
        sig: Uint8Array;
    }, {
        root?: any;
        sig: Uint8Array;
    }>;
    cidWriteOp: z.ZodUnion<[z.ZodObject<{
        action: z.ZodLiteral<"create">;
        collection: z.ZodString;
        rkey: z.ZodString;
        cid: z.ZodEffects<z.ZodEffects<z.ZodAny, any, any>, CID, any>;
    }, "strip", z.ZodTypeAny, {
        collection: string;
        action: "create";
        rkey: string;
        cid: CID;
    }, {
        cid?: any;
        collection: string;
        action: "create";
        rkey: string;
    }>, z.ZodObject<{
        action: z.ZodLiteral<"update">;
        collection: z.ZodString;
        rkey: z.ZodString;
        cid: z.ZodEffects<z.ZodEffects<z.ZodAny, any, any>, CID, any>;
    }, "strip", z.ZodTypeAny, {
        collection: string;
        action: "update";
        rkey: string;
        cid: CID;
    }, {
        cid?: any;
        collection: string;
        action: "update";
        rkey: string;
    }>, z.ZodObject<{
        action: z.ZodLiteral<"delete">;
        collection: z.ZodString;
        rkey: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        collection: string;
        action: "delete";
        rkey: string;
    }, {
        collection: string;
        action: "delete";
        rkey: string;
    }>]>;
    recordWriteOp: z.ZodUnion<[z.ZodObject<{
        action: z.ZodLiteral<"create">;
        collection: z.ZodString;
        rkey: z.ZodString;
        value: z.ZodAny;
    }, "strip", z.ZodTypeAny, {
        value?: any;
        collection: string;
        action: "create";
        rkey: string;
    }, {
        value?: any;
        collection: string;
        action: "create";
        rkey: string;
    }>, z.ZodObject<{
        action: z.ZodLiteral<"update">;
        collection: z.ZodString;
        rkey: z.ZodString;
        value: z.ZodAny;
    }, "strip", z.ZodTypeAny, {
        value?: any;
        collection: string;
        action: "update";
        rkey: string;
    }, {
        value?: any;
        collection: string;
        action: "update";
        rkey: string;
    }>, z.ZodObject<{
        action: z.ZodLiteral<"delete">;
        collection: z.ZodString;
        rkey: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        collection: string;
        action: "delete";
        rkey: string;
    }, {
        collection: string;
        action: "delete";
        rkey: string;
    }>]>;
    string: z.ZodString;
    cid: z.ZodEffects<z.ZodEffects<z.ZodAny, any, any>, CID, any>;
    strToCid: z.ZodEffects<z.ZodEffects<z.ZodString, string, string>, CID, string>;
    bytes: z.ZodType<Uint8Array, z.ZodTypeDef, Uint8Array>;
    strToInt: z.ZodEffects<z.ZodEffects<z.ZodString, string, string>, number, string>;
    strToBool: z.ZodEffects<z.ZodString, boolean, string>;
};
export interface CarStreamable {
    writeToCarStream(car: BlockWriter): Promise<void>;
}
export declare type DataValue = {
    key: string;
    value: CID;
};
export interface DataStore {
    add(key: string, value: CID): Promise<DataStore>;
    update(key: string, value: CID): Promise<DataStore>;
    delete(key: string): Promise<DataStore>;
    get(key: string): Promise<CID | null>;
    list(count: number, after?: string, before?: string): Promise<DataValue[]>;
    listWithPrefix(prefix: string, count?: number): Promise<DataValue[]>;
    diff(other: DataStore): Promise<DataDiff>;
    save(): Promise<CID>;
    writeToCarStream(car: BlockWriter): Promise<void>;
}
export {};

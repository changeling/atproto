import { z } from 'zod';
export declare const tokenSchema: z.ZodObject<{
    lexicon: z.ZodLiteral<1>;
    id: z.ZodEffects<z.ZodString, string, string>;
    type: z.ZodEnum<["token"]>;
    revision: z.ZodOptional<z.ZodNumber>;
    description: z.ZodOptional<z.ZodString>;
    defs: z.ZodOptional<z.ZodAny>;
}, "strip", z.ZodTypeAny, {
    revision?: number | undefined;
    description?: string | undefined;
    defs?: any;
    lexicon: 1;
    type: "token";
    id: string;
}, {
    revision?: number | undefined;
    description?: string | undefined;
    defs?: any;
    lexicon: 1;
    type: "token";
    id: string;
}>;
export declare type TokenSchema = z.infer<typeof tokenSchema>;
export declare function isValidTokenSchema(v: unknown): v is TokenSchema;
export declare const recordSchema: z.ZodObject<{
    lexicon: z.ZodLiteral<1>;
    id: z.ZodEffects<z.ZodString, string, string>;
    type: z.ZodEnum<["record"]>;
    revision: z.ZodOptional<z.ZodNumber>;
    description: z.ZodOptional<z.ZodString>;
    key: z.ZodOptional<z.ZodString>;
    record: z.ZodOptional<z.ZodAny>;
    defs: z.ZodOptional<z.ZodAny>;
}, "strip", z.ZodTypeAny, {
    revision?: number | undefined;
    description?: string | undefined;
    defs?: any;
    record?: any;
    key?: string | undefined;
    lexicon: 1;
    type: "record";
    id: string;
}, {
    revision?: number | undefined;
    description?: string | undefined;
    defs?: any;
    record?: any;
    key?: string | undefined;
    lexicon: 1;
    type: "record";
    id: string;
}>;
export declare type RecordSchema = z.infer<typeof recordSchema>;
export declare function isValidRecordSchema(v: unknown): v is RecordSchema;
export declare class RecordSchemaMalformedError extends Error {
    schemaDef: any;
    issues?: z.ZodIssue[] | undefined;
    constructor(message: string, schemaDef: any, issues?: z.ZodIssue[] | undefined);
}
export declare const methodSchemaBody: z.ZodObject<{
    encoding: z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>;
    description: z.ZodOptional<z.ZodString>;
    schema: z.ZodOptional<z.ZodAny>;
}, "strip", z.ZodTypeAny, {
    description?: string | undefined;
    schema?: any;
    encoding: string | string[];
}, {
    description?: string | undefined;
    schema?: any;
    encoding: string | string[];
}>;
export declare type MethodSchemaBody = z.infer<typeof methodSchemaBody>;
export declare const methodSchemaParam: z.ZodObject<{
    type: z.ZodEnum<["string", "number", "integer", "boolean"]>;
    description: z.ZodOptional<z.ZodString>;
    default: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean]>>;
    required: z.ZodOptional<z.ZodBoolean>;
    minLength: z.ZodOptional<z.ZodNumber>;
    maxLength: z.ZodOptional<z.ZodNumber>;
    minimum: z.ZodOptional<z.ZodNumber>;
    maximum: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    minimum?: number | undefined;
    maximum?: number | undefined;
    description?: string | undefined;
    default?: string | number | boolean | undefined;
    required?: boolean | undefined;
    minLength?: number | undefined;
    maxLength?: number | undefined;
    type: "string" | "number" | "integer" | "boolean";
}, {
    minimum?: number | undefined;
    maximum?: number | undefined;
    description?: string | undefined;
    default?: string | number | boolean | undefined;
    required?: boolean | undefined;
    minLength?: number | undefined;
    maxLength?: number | undefined;
    type: "string" | "number" | "integer" | "boolean";
}>;
export declare type MethodSchemaParam = z.infer<typeof methodSchemaParam>;
export declare const methodSchemaError: z.ZodObject<{
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    description?: string | undefined;
    name: string;
}, {
    description?: string | undefined;
    name: string;
}>;
export declare type MethodSchemaError = z.infer<typeof methodSchemaError>;
export declare const methodSchema: z.ZodObject<{
    lexicon: z.ZodLiteral<1>;
    id: z.ZodString;
    type: z.ZodEnum<["query", "procedure"]>;
    description: z.ZodOptional<z.ZodString>;
    parameters: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
        type: z.ZodEnum<["string", "number", "integer", "boolean"]>;
        description: z.ZodOptional<z.ZodString>;
        default: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean]>>;
        required: z.ZodOptional<z.ZodBoolean>;
        minLength: z.ZodOptional<z.ZodNumber>;
        maxLength: z.ZodOptional<z.ZodNumber>;
        minimum: z.ZodOptional<z.ZodNumber>;
        maximum: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        minimum?: number | undefined;
        maximum?: number | undefined;
        description?: string | undefined;
        default?: string | number | boolean | undefined;
        required?: boolean | undefined;
        minLength?: number | undefined;
        maxLength?: number | undefined;
        type: "string" | "number" | "integer" | "boolean";
    }, {
        minimum?: number | undefined;
        maximum?: number | undefined;
        description?: string | undefined;
        default?: string | number | boolean | undefined;
        required?: boolean | undefined;
        minLength?: number | undefined;
        maxLength?: number | undefined;
        type: "string" | "number" | "integer" | "boolean";
    }>>>;
    input: z.ZodOptional<z.ZodObject<{
        encoding: z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>;
        description: z.ZodOptional<z.ZodString>;
        schema: z.ZodOptional<z.ZodAny>;
    }, "strip", z.ZodTypeAny, {
        description?: string | undefined;
        schema?: any;
        encoding: string | string[];
    }, {
        description?: string | undefined;
        schema?: any;
        encoding: string | string[];
    }>>;
    output: z.ZodOptional<z.ZodObject<{
        encoding: z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>;
        description: z.ZodOptional<z.ZodString>;
        schema: z.ZodOptional<z.ZodAny>;
    }, "strip", z.ZodTypeAny, {
        description?: string | undefined;
        schema?: any;
        encoding: string | string[];
    }, {
        description?: string | undefined;
        schema?: any;
        encoding: string | string[];
    }>>;
    errors: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        description?: string | undefined;
        name: string;
    }, {
        description?: string | undefined;
        name: string;
    }>, "many">>;
    defs: z.ZodOptional<z.ZodAny>;
}, "strip", z.ZodTypeAny, {
    description?: string | undefined;
    defs?: any;
    parameters?: Record<string, {
        minimum?: number | undefined;
        maximum?: number | undefined;
        description?: string | undefined;
        default?: string | number | boolean | undefined;
        required?: boolean | undefined;
        minLength?: number | undefined;
        maxLength?: number | undefined;
        type: "string" | "number" | "integer" | "boolean";
    }> | undefined;
    input?: {
        description?: string | undefined;
        schema?: any;
        encoding: string | string[];
    } | undefined;
    output?: {
        description?: string | undefined;
        schema?: any;
        encoding: string | string[];
    } | undefined;
    errors?: {
        description?: string | undefined;
        name: string;
    }[] | undefined;
    lexicon: 1;
    type: "query" | "procedure";
    id: string;
}, {
    description?: string | undefined;
    defs?: any;
    parameters?: Record<string, {
        minimum?: number | undefined;
        maximum?: number | undefined;
        description?: string | undefined;
        default?: string | number | boolean | undefined;
        required?: boolean | undefined;
        minLength?: number | undefined;
        maxLength?: number | undefined;
        type: "string" | "number" | "integer" | "boolean";
    }> | undefined;
    input?: {
        description?: string | undefined;
        schema?: any;
        encoding: string | string[];
    } | undefined;
    output?: {
        description?: string | undefined;
        schema?: any;
        encoding: string | string[];
    } | undefined;
    errors?: {
        description?: string | undefined;
        name: string;
    }[] | undefined;
    lexicon: 1;
    type: "query" | "procedure";
    id: string;
}>;
export declare type MethodSchema = z.infer<typeof methodSchema>;
export declare function isValidMethodSchema(v: unknown): v is MethodSchema;
export declare type Schema = TokenSchema | RecordSchema | MethodSchema;
export declare class SchemaNotFoundError extends Error {
}

import express from 'express';
import { ValidateFunction } from 'ajv';
import { MethodSchema } from '@atproto/lexicon';
import { XRPCHandler } from './types';
export declare function createServer(schemas?: unknown[]): Server;
export declare class Server {
    router: import("express-serve-static-core").Router;
    handlers: Map<string, XRPCHandler>;
    schemas: Map<string, MethodSchema>;
    inputValidators: Map<string, ValidateFunction>;
    outputValidators: Map<string, ValidateFunction>;
    constructor(schemas?: unknown[]);
    method(nsid: string, fn: XRPCHandler): void;
    addMethod(nsid: string, fn: XRPCHandler): void;
    removeMethod(nsid: string): void;
    addSchema(schema: unknown): void;
    addSchemas(schemas: unknown[]): void;
    removeSchema(nsid: string): void;
    handle(req: express.Request, res: express.Response): Promise<void | express.Response<any, Record<string, any>>>;
}

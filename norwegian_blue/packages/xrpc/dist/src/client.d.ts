import { MethodSchema } from '@atproto/lexicon';
import { FetchHandler, CallOptions, QueryParams, XRPCResponse } from './types';
export declare class Client {
    fetch: FetchHandler;
    schemas: Map<string, MethodSchema>;
    call(serviceUri: string | URL, methodNsid: string, params?: QueryParams, data?: unknown, opts?: CallOptions): Promise<XRPCResponse>;
    service(serviceUri: string | URL): ServiceClient;
    addSchema(schema: unknown): void;
    addSchemas(schemas: unknown[]): void;
    listSchemaIds(): string[];
    removeSchema(nsid: string): void;
}
export declare class ServiceClient {
    baseClient: Client;
    uri: URL;
    headers: Record<string, string>;
    constructor(baseClient: Client, serviceUri: string | URL);
    setHeader(key: string, value: string): void;
    unsetHeader(key: string): void;
    call(methodNsid: string, params?: QueryParams, data?: unknown, opts?: CallOptions): Promise<XRPCResponse>;
}

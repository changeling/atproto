import { MethodSchema } from '@atproto/lexicon';
import { CallOptions, Headers, QueryParams, ResponseType } from './types';
export declare function getMethodSchemaHTTPMethod(schema: MethodSchema): "get" | "post";
export declare function constructMethodCallUri(schema: MethodSchema, serviceUri: URL, params?: QueryParams): string;
export declare function encodeQueryParam(type: 'string' | 'number' | 'integer' | 'boolean', value: any): string;
export declare function constructMethodCallHeaders(schema: MethodSchema, data?: any, opts?: CallOptions): Headers;
export declare function encodeMethodCallBody(headers: Headers, data?: any): ArrayBuffer | undefined;
export declare function httpResponseCodeToEnum(status: number): ResponseType;
export declare function httpResponseBodyParse(mimeType: string | null, data: ArrayBuffer | undefined): any;

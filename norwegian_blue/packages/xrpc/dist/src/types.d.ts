import { z } from 'zod';
export declare type QueryParams = Record<string, any>;
export declare type Headers = Record<string, string>;
export interface CallOptions {
    encoding?: string;
    headers?: Headers;
}
export interface FetchHandlerResponse {
    status: number;
    headers: Headers;
    body: ArrayBuffer | undefined;
}
export declare type FetchHandler = (httpUri: string, httpMethod: string, httpHeaders: Headers, httpReqBody: any) => Promise<FetchHandlerResponse>;
export declare const errorResponseBody: z.ZodObject<{
    error: z.ZodOptional<z.ZodString>;
    message: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    error?: string | undefined;
    message?: string | undefined;
}, {
    error?: string | undefined;
    message?: string | undefined;
}>;
export declare type ErrorResponseBody = z.infer<typeof errorResponseBody>;
export declare enum ResponseType {
    Unknown = 1,
    InvalidResponse = 2,
    Success = 200,
    InvalidRequest = 400,
    AuthRequired = 401,
    Forbidden = 403,
    XRPCNotSupported = 404,
    PayloadTooLarge = 413,
    RateLimitExceeded = 429,
    InternalServerError = 500,
    MethodNotImplemented = 501,
    UpstreamFailure = 502,
    NotEnoughResouces = 503,
    UpstreamTimeout = 504
}
export declare const ResponseTypeNames: {
    2: string;
    200: string;
    400: string;
    401: string;
    403: string;
    404: string;
    413: string;
    429: string;
    500: string;
    501: string;
    502: string;
    503: string;
    504: string;
};
export declare const ResponseTypeStrings: {
    2: string;
    200: string;
    400: string;
    401: string;
    403: string;
    404: string;
    413: string;
    429: string;
    500: string;
    501: string;
    502: string;
    503: string;
    504: string;
};
export declare class XRPCResponse {
    data: any;
    headers: Headers;
    success: boolean;
    constructor(data: any, headers: Headers);
}
export declare class XRPCError extends Error {
    status: ResponseType;
    error?: string | undefined;
    success: boolean;
    constructor(status: ResponseType, error?: string | undefined, message?: string);
}

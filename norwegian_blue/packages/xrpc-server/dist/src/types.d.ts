import express from 'express';
import zod from 'zod';
import { ResponseType } from '@atproto/xrpc';
export declare type Params = Record<string, string | number | boolean>;
export declare const handlerInput: zod.ZodObject<{
    encoding: zod.ZodString;
    body: zod.ZodAny;
}, "strip", zod.ZodTypeAny, {
    body?: any;
    encoding: string;
}, {
    body?: any;
    encoding: string;
}>;
export declare type HandlerInput = zod.infer<typeof handlerInput>;
export declare const handlerSuccess: zod.ZodObject<{
    encoding: zod.ZodString;
    body: zod.ZodAny;
}, "strip", zod.ZodTypeAny, {
    body?: any;
    encoding: string;
}, {
    body?: any;
    encoding: string;
}>;
export declare type HandlerSuccess = zod.infer<typeof handlerSuccess>;
export declare const handlerError: zod.ZodObject<{
    status: zod.ZodNumber;
    error: zod.ZodOptional<zod.ZodString>;
    message: zod.ZodOptional<zod.ZodString>;
}, "strip", zod.ZodTypeAny, {
    error?: string | undefined;
    message?: string | undefined;
    status: number;
}, {
    error?: string | undefined;
    message?: string | undefined;
    status: number;
}>;
export declare type HandlerError = zod.infer<typeof handlerError>;
export declare type HandlerOutput = HandlerSuccess | HandlerError;
export declare type XRPCHandler = (params: Params, input: HandlerInput | undefined, req: express.Request, res: express.Response) => Promise<HandlerOutput> | HandlerOutput | undefined;
export declare class XRPCError extends Error {
    type: ResponseType;
    errorMessage?: string | undefined;
    customErrorName?: string | undefined;
    constructor(type: ResponseType, errorMessage?: string | undefined, customErrorName?: string | undefined);
    get payload(): {
        error: string | undefined;
        message: string | undefined;
    };
    get typeStr(): string | undefined;
}
export declare class InvalidRequestError extends XRPCError {
    constructor(errorMessage?: string, customErrorName?: string);
}
export declare class AuthRequiredError extends XRPCError {
    constructor(errorMessage?: string, customErrorName?: string);
}
export declare class ForbiddenError extends XRPCError {
    constructor(errorMessage?: string, customErrorName?: string);
}
export declare class InternalServerError extends XRPCError {
    constructor(errorMessage?: string, customErrorName?: string);
}
export declare class UpstreamFailureError extends XRPCError {
    constructor(errorMessage?: string, customErrorName?: string);
}
export declare class NotEnoughResoucesError extends XRPCError {
    constructor(errorMessage?: string, customErrorName?: string);
}
export declare class UpstreamTimeoutError extends XRPCError {
    constructor(errorMessage?: string, customErrorName?: string);
}

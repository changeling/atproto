import { ErrorRequestHandler } from 'express';
export declare const handler: ErrorRequestHandler;
export declare class ServerError extends Error {
    status: number;
    constructor(status: number, message: string);
    static is(obj: unknown): obj is ServerError;
}

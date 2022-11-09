import express from 'express';
export interface QueryParams {
    term: string;
    limit?: number;
    before?: string;
}
export declare type HandlerInput = undefined;
export interface HandlerSuccess {
    encoding: 'application/json';
    body: OutputSchema;
}
export interface HandlerError {
    status: number;
    message?: string;
}
export declare type HandlerOutput = HandlerError | HandlerSuccess;
export interface OutputSchema {
    cursor?: string;
    users: {
        did: string;
        handle: string;
        displayName?: string;
        description?: string;
        indexedAt?: string;
    }[];
}
export declare type Handler = (params: QueryParams, input: HandlerInput, req: express.Request, res: express.Response) => Promise<HandlerOutput> | HandlerOutput;

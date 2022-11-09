import express from 'express';
export interface QueryParams {
    uri: string;
    cid?: string;
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
    uri: string;
    cid?: string;
    cursor?: string;
    likedBy: {
        did: string;
        handle: string;
        displayName?: string;
        createdAt?: string;
        indexedAt: string;
    }[];
}
export declare type Handler = (params: QueryParams, input: HandlerInput, req: express.Request, res: express.Response) => Promise<HandlerOutput> | HandlerOutput;

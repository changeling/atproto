import express from 'express';
export interface QueryParams {
    term: string;
    limit?: number;
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
    users: {
        did: string;
        handle: string;
        displayName?: string;
    }[];
}
export declare type Handler = (params: QueryParams, input: HandlerInput, req: express.Request, res: express.Response) => Promise<HandlerOutput> | HandlerOutput;

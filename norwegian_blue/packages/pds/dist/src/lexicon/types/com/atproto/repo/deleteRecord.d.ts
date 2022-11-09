import express from 'express';
export interface QueryParams {
}
export interface HandlerInput {
    encoding: 'application/json';
    body: InputSchema;
}
export interface InputSchema {
    did: string;
    collection: string;
    rkey: string;
}
export interface HandlerError {
    status: number;
    message?: string;
}
export declare type HandlerOutput = HandlerError | void;
export declare type Handler = (params: QueryParams, input: HandlerInput, req: express.Request, res: express.Response) => Promise<HandlerOutput> | HandlerOutput;

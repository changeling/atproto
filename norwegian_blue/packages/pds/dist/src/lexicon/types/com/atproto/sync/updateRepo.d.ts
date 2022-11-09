import express from 'express';
export interface QueryParams {
    did: string;
}
export interface HandlerInput {
    encoding: 'application/cbor';
    body: Uint8Array;
}
export interface HandlerError {
    status: number;
    message?: string;
}
export declare type HandlerOutput = HandlerError | void;
export declare type Handler = (params: QueryParams, input: HandlerInput, req: express.Request, res: express.Response) => Promise<HandlerOutput> | HandlerOutput;

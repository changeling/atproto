import express from 'express';
export interface QueryParams {
    user: string;
    collection: string;
    limit?: number;
    before?: string;
    after?: string;
    reverse?: boolean;
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
    records: {
        uri: string;
        cid: string;
        value: {};
    }[];
}
export declare type Handler = (params: QueryParams, input: HandlerInput, req: express.Request, res: express.Response) => Promise<HandlerOutput> | HandlerOutput;

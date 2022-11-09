import express from 'express';
export interface QueryParams {
    user: string;
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
    did: string;
    handle: string;
    displayName?: string;
    description?: string;
    followersCount: number;
    followsCount: number;
    postsCount: number;
    myState?: {
        follow?: string;
    };
}
export declare type Handler = (params: QueryParams, input: HandlerInput, req: express.Request, res: express.Response) => Promise<HandlerOutput> | HandlerOutput;

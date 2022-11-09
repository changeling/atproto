import express from 'express';
export interface QueryParams {
}
export interface HandlerInput {
    encoding: 'application/json';
    body: InputSchema;
}
export interface InputSchema {
    useCount: number;
}
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
    code: string;
}
export declare type Handler = (params: QueryParams, input: HandlerInput, req: express.Request, res: express.Response) => Promise<HandlerOutput> | HandlerOutput;

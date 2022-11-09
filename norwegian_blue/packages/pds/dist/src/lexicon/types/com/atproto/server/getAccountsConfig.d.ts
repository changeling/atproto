import express from 'express';
export interface QueryParams {
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
    inviteCodeRequired?: boolean;
    availableUserDomains: string[];
}
export declare type Handler = (params: QueryParams, input: HandlerInput, req: express.Request, res: express.Response) => Promise<HandlerOutput> | HandlerOutput;

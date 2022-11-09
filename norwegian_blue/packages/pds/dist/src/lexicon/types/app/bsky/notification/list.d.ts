import express from 'express';
export interface QueryParams {
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
    notifications: Notification[];
}
export interface Notification {
    uri: string;
    cid: string;
    author: {
        did: string;
        handle: string;
        displayName?: string;
    };
    reason: string;
    reasonSubject?: string;
    record: {};
    isRead: boolean;
    indexedAt: string;
}
export declare type Handler = (params: QueryParams, input: HandlerInput, req: express.Request, res: express.Response) => Promise<HandlerOutput> | HandlerOutput;

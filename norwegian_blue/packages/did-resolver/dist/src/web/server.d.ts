/// <reference types="node" />
import express from 'express';
import http from 'http';
import { DIDDocument } from 'did-resolver';
import DidWebDb from './db';
export declare class DidWebServer {
    port: number;
    private _db;
    _app: express.Application;
    _httpServer: http.Server | null;
    constructor(_app: express.Application, _db: DidWebDb, port: number);
    static create(db: DidWebDb, port: number): DidWebServer;
    getByPath(didPath?: string): Promise<DIDDocument | null>;
    getById(did?: string): Promise<DIDDocument | null>;
    put(didDoc: DIDDocument): Promise<void>;
    delete(didOrDoc: string | DIDDocument): Promise<void>;
    close(): Promise<void>;
}

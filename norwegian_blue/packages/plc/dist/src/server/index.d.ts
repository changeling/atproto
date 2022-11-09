/// <reference types="node" />
/// <reference types="node/http" />
/// <reference types="pino-http" />
import 'express-async-errors';
import express from 'express';
import { Database } from './db';
export * from './db';
export declare type App = express.Application;
export declare const server: (db: Database, port?: number, _version?: string) => {
    app: import("express-serve-static-core").Express;
    listener: import("http").Server;
};
export default server;

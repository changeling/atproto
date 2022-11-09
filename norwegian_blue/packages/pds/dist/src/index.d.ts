/// <reference types="node" />
/// <reference types="node/http" />
/// <reference types="pino-http" />
import 'express-async-errors';
import express from 'express';
import * as auth from '@atproto/auth';
import Database from './db';
import { ServerConfigValues } from './config';
export type { ServerConfigValues } from './config';
export { ServerConfig } from './config';
export { Database } from './db';
export declare type App = express.Application;
declare const runServer: (db: Database, keypair: auth.DidableKey, cfg: ServerConfigValues) => {
    app: import("express-serve-static-core").Express;
    listener: import("http").Server;
};
export default runServer;

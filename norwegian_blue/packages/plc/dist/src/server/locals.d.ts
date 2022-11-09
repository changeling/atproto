import { Response } from 'express';
import pino from 'pino';
import { App } from '.';
import { Database } from './db';
export interface Locals {
    logger: pino.Logger;
    db: Database;
    version: string;
}
declare type HasLocals = App | Response;
export declare const get: (res: HasLocals) => Locals;
export {};

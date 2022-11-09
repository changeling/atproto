import pino from 'pino';
export declare const dbLogger: pino.Logger<pino.LoggerOptions>;
export declare const httpLogger: pino.Logger<pino.LoggerOptions>;
export declare const loggerMiddleware: import("pino-http").HttpLogger;

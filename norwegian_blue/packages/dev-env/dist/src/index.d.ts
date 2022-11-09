/// <reference types="node" />
import http from 'http';
import { ServiceClient } from '@atproto/api';
import { ServerType, ServerConfig, StartParams } from './types.js';
export declare class DevEnvServer {
    private env;
    type: ServerType;
    port: number;
    inst?: http.Server;
    constructor(env: DevEnv, type: ServerType, port: number);
    get name(): string;
    get description(): string;
    get url(): string;
    start(): Promise<void>;
    close(): Promise<void>;
    getClient(): ServiceClient;
}
export declare class DevEnv {
    plcUrl: string | undefined;
    servers: Map<number, DevEnvServer>;
    static create(params: StartParams): Promise<DevEnv>;
    add(cfg: ServerConfig): Promise<void>;
    remove(server: number | DevEnvServer): Promise<void>;
    shutdown(): Promise<void>;
    hasType(type: ServerType): boolean;
    listOfType(type: ServerType): DevEnvServer[];
}

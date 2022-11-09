import * as auth from '@atproto/auth';
import { DidResolver } from '@atproto/did-resolver';
import express from 'express';
import * as jwt from 'jsonwebtoken';
export declare type ServerAuthOpts = {
    jwtSecret: string;
    didResolver: DidResolver;
    adminPass: string;
};
export declare enum AuthScopes {
    Access = "com.atproto.access",
    Refresh = "com.atproto.refresh",
    ResetPassword = "com.atproto.resetAccountPassword"
}
export declare type AuthToken = {
    scope: AuthScopes;
    sub: string;
    exp: number;
};
export declare type RefreshToken = AuthToken & {
    jti: string;
};
export declare class ServerAuth {
    private _secret;
    private _adminPass;
    didResolver: DidResolver;
    verifier: auth.Verifier;
    constructor(opts: ServerAuthOpts);
    createAccessToken(did: string, expiresIn?: string | number): {
        payload: AuthToken;
        jwt: string;
    };
    createRefreshToken(did: string, expiresIn?: string | number): {
        payload: RefreshToken;
        jwt: string;
    };
    getUserDid(req: express.Request, scope?: AuthScopes): string | null;
    getUserDidOrThrow(req: express.Request, scope?: AuthScopes): string;
    verifyUser(req: express.Request, did: string, scope?: AuthScopes): boolean;
    verifyAdmin(req: express.Request): boolean;
    getToken(req: express.Request): string | null;
    verifyToken(token: string, scope?: AuthScopes, options?: jwt.VerifyOptions): jwt.JwtPayload;
    toString(): string;
}
export declare const parseBasicAuth: (token: string) => {
    username: string;
    password: string;
} | null;
export default ServerAuth;

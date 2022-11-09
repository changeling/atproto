export interface RefreshToken {
    id: string;
    did: string;
    expiresAt: string;
}
export declare const tableName = "refresh_token";
export declare type PartialDB = {
    [tableName]: RefreshToken;
};

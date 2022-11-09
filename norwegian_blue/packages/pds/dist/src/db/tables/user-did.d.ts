export interface UserDid {
    did: string;
    handle: string;
}
export declare const tableName = "user_did";
export declare type PartialDB = {
    [tableName]: UserDid;
};

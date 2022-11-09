export interface Record {
    uri: string;
    cid: string;
    did: string;
    collection: string;
    rkey: string;
}
export declare const tableName = "record";
export declare type PartialDB = {
    [tableName]: Record;
};

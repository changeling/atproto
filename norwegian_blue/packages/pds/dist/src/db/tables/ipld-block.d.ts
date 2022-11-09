export interface IpldBlock {
    cid: string;
    size: number;
    content: Uint8Array;
    indexedAt: string;
}
export declare const tableName = "ipld_block";
export declare type PartialDB = {
    [tableName]: IpldBlock;
};

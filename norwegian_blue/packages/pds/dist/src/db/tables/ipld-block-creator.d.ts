export interface IpldBlockCreator {
    cid: string;
    did: string;
}
export declare const tableName = "ipld_block_creator";
export declare type PartialDB = {
    [tableName]: IpldBlockCreator;
};

export interface InviteCode {
    code: string;
    availableUses: number;
    disabled: 0 | 1;
    forUser: string;
    createdBy: string;
    createdAt: string;
}
export interface InviteCodeUse {
    code: string;
    usedBy: string;
    usedAt: string;
}
export declare const tableName = "invite_code";
export declare const supportingTableName = "invite_code_use";
export declare type PartialDB = {
    [tableName]: InviteCode;
    [supportingTableName]: InviteCodeUse;
};

export interface User {
    handle: string;
    email: string;
    password: string;
    lastSeenNotifs: string;
    createdAt: string;
}
export declare const tableName = "user";
export declare type PartialDB = {
    [tableName]: User;
};

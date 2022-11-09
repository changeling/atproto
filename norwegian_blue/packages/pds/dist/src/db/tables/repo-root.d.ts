export interface RepoRoot {
    did: string;
    root: string;
    indexedAt: string;
}
export declare const tableName = "repo_root";
export declare type PartialDB = {
    [tableName]: RepoRoot;
};

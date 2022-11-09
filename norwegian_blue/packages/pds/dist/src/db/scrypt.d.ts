export declare const hash: (password: string) => Promise<string>;
export declare const verify: (password: string, storedHash: string) => Promise<boolean>;

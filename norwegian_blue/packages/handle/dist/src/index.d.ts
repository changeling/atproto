export declare const ensureValid: (handle: string, availableUserDomains: string[]) => void;
export declare const isValid: (handle: string, availableUserDomains: string[]) => boolean;
export declare class InvalidHandleError extends Error {
}

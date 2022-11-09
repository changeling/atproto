import { ValidateFunction } from 'ajv';
import CompiledRecordSchema from './schema';
export declare class ValidationError extends Error {
    code: ValidationResultCode;
    messages: string[];
    constructor(res: ValidationResult);
}
export declare enum ValidationResultCode {
    Full = "full",
    Partial = "partial",
    Incompatible = "incompatible",
    Invalid = "invalid"
}
export declare class ValidationResult {
    code: ValidationResultCode;
    error: string | undefined;
    fallbacks: string[];
    messages: string[];
    get valid(): boolean;
    get fullySupported(): boolean;
    get compatible(): boolean;
    _t(to: ValidationResultCode, message?: string): void;
    _fail(schema: CompiledRecordSchema, validator: ValidateFunction): void;
}

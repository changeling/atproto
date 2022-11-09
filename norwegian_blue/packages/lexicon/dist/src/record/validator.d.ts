import CompiledRecordSchema from './schema';
import RecordSchemas from './schemas';
import { ValidationResult } from './validation';
export interface RecordValidatorDescription {
    type: string | string[];
    ext?: string | string[];
}
export declare class RecordValidator {
    private schemas;
    type: CompiledRecordSchema[];
    ext: CompiledRecordSchema[];
    constructor(schemas: RecordSchemas, type: CompiledRecordSchema[], ext: CompiledRecordSchema[]);
    validate(value: unknown): ValidationResult;
    isValid(value: unknown): boolean;
    assertValid(value: unknown): ValidationResult;
}
export default RecordValidator;

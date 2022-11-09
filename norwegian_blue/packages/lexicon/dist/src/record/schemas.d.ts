import CompiledRecordSchema from './schema';
import RecordValidator, { RecordValidatorDescription } from './validator';
export declare class RecordSchemas {
    schemas: Map<string, CompiledRecordSchema>;
    add(schemaDef: unknown): void;
    remove(key: string): void;
    get(key: string): CompiledRecordSchema | undefined;
    createRecordValidator(desc: string | string[] | RecordValidatorDescription): RecordValidator;
}
export default RecordSchemas;

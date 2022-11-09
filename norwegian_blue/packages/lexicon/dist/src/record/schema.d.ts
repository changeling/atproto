import { ValidateFunction } from 'ajv';
import { RecordSchema } from '../types';
export declare class CompiledRecordSchema {
    def: RecordSchema;
    id: string;
    validate?: ValidateFunction;
    constructor(def: RecordSchema);
}
export default CompiledRecordSchema;

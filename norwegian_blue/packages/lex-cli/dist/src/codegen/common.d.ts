import { Project, SourceFile } from 'ts-morph';
import { Schema } from '@atproto/lexicon';
import { GeneratedFile } from '../types';
export declare const schemasTs: (project: any, schemas: Schema[]) => Promise<GeneratedFile>;
export declare function gen(project: Project, path: string, gen: (file: SourceFile) => Promise<void>): Promise<GeneratedFile>;

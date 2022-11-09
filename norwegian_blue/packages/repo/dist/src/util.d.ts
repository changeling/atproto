import { CID } from 'multiformats/cid';
import * as auth from '@atproto/auth';
import { DataStore } from './types';
import { IpldStore } from './blockstore';
export declare const ucanForOperation: (prevData: DataStore, newData: DataStore, rootDid: string, authStore: auth.AuthStore) => Promise<string>;
export declare const getCommitPath: (blockstore: IpldStore, earliest: CID | null, latest: CID) => Promise<CID[] | null>;

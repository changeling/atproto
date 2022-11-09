import { CID } from 'multiformats/cid';
import * as auth from '@atproto/auth';
import { IpldStore } from './blockstore';
import { DataDiff } from './mst';
export declare const verifyUpdates: (blockstore: IpldStore, earliest: CID | null, latest: CID, verifier: auth.Verifier) => Promise<DataDiff>;

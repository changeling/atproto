import { CID } from 'multiformats';
import IpldStore from '../blockstore/ipld-store';
import { NodeEntry, NodeData, MstOpts, Fanout } from './mst';
export declare const leadingZerosOnHash: (key: string, fanout: Fanout) => Promise<number>;
export declare const layerForEntries: (entries: NodeEntry[], fanout: Fanout) => Promise<number | null>;
export declare const deserializeNodeData: (blockstore: IpldStore, data: NodeData, opts?: Partial<MstOpts>) => Promise<NodeEntry[]>;
export declare const serializeNodeData: (entries: NodeEntry[]) => NodeData;
export declare const countPrefixLen: (a: string, b: string) => number;
export declare const cidForEntries: (entries: NodeEntry[]) => Promise<CID>;

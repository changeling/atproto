import * as ucans from '@ucans/core';
import { PluginInjectedApi } from './plugins';
export declare const verifyUcan: (ucanApi: PluginInjectedApi) => (token: ucans.Ucan | string, opts: ucans.VerifyOptions) => Promise<ucans.Ucan>;
export declare const verifyAtpUcan: (ucanApi: PluginInjectedApi) => (token: ucans.Ucan | string, audience: string, cap: ucans.Capability) => Promise<ucans.Ucan>;
export declare const verifyFullWritePermission: (ucanApi: PluginInjectedApi) => (token: ucans.Ucan | string, audience: string, repoDid: string) => Promise<ucans.Ucan>;

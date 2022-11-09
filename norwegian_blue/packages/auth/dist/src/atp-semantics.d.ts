import * as ucans from '@ucans/core';
export declare const ATP_ABILITY_LEVELS: {
    SUPER_USER: number;
    WRITE: number;
    MAINTENANCE: number;
};
export declare const ATP_ABILITIES: string[];
export declare type AtpAbility = keyof typeof ATP_ABILITY_LEVELS;
export declare const isAtpCap: (cap: ucans.Capability) => boolean;
export declare const isAtpAbility: (ability: unknown) => ability is "SUPER_USER" | "WRITE" | "MAINTENANCE";
export declare const parseAtpAbility: (ability: ucans.capability.ability.Ability) => AtpAbility | null;
export declare const atpCapability: (resource: string, ability: AtpAbility) => ucans.Capability;
export interface AtpResourcePointer {
    did: string;
    collection: string;
    record: string;
}
export declare const parseAtpResource: (pointer: ucans.capability.resourcePointer.ResourcePointer) => AtpResourcePointer | null;
export declare const atpSemantics: ucans.DelegationSemantics;

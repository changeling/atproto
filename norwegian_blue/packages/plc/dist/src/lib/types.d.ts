import * as z from 'zod';
import * as mf from 'multiformats/cid';
declare const cid: z.ZodEffects<z.ZodEffects<z.ZodAny, any, any>, mf.CID, any>;
export declare type CID = z.infer<typeof cid>;
declare const documentData: z.ZodObject<{
    did: z.ZodString;
    signingKey: z.ZodString;
    recoveryKey: z.ZodString;
    handle: z.ZodString;
    atpPds: z.ZodString;
}, "strip", z.ZodTypeAny, {
    did: string;
    signingKey: string;
    recoveryKey: string;
    handle: string;
    atpPds: string;
}, {
    did: string;
    signingKey: string;
    recoveryKey: string;
    handle: string;
    atpPds: string;
}>;
export declare type DocumentData = z.infer<typeof documentData>;
declare const unsignedCreateOp: z.ZodObject<{
    type: z.ZodLiteral<"create">;
    signingKey: z.ZodString;
    recoveryKey: z.ZodString;
    handle: z.ZodString;
    service: z.ZodString;
    prev: z.ZodNull;
}, "strip", z.ZodTypeAny, {
    type: "create";
    signingKey: string;
    recoveryKey: string;
    handle: string;
    service: string;
    prev: null;
}, {
    type: "create";
    signingKey: string;
    recoveryKey: string;
    handle: string;
    service: string;
    prev: null;
}>;
export declare type UnsignedCreateOp = z.infer<typeof unsignedCreateOp>;
declare const createOp: z.ZodObject<z.extendShape<{
    type: z.ZodLiteral<"create">;
    signingKey: z.ZodString;
    recoveryKey: z.ZodString;
    handle: z.ZodString;
    service: z.ZodString;
    prev: z.ZodNull;
}, {
    sig: z.ZodString;
}>, "strip", z.ZodTypeAny, {
    type: "create";
    signingKey: string;
    recoveryKey: string;
    handle: string;
    service: string;
    prev: null;
    sig: string;
}, {
    type: "create";
    signingKey: string;
    recoveryKey: string;
    handle: string;
    service: string;
    prev: null;
    sig: string;
}>;
export declare type CreateOp = z.infer<typeof createOp>;
declare const unsignedRotateSigningKeyOp: z.ZodObject<{
    type: z.ZodLiteral<"rotate_signing_key">;
    key: z.ZodString;
    prev: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: "rotate_signing_key";
    prev: string;
    key: string;
}, {
    type: "rotate_signing_key";
    prev: string;
    key: string;
}>;
export declare type UnsignedRotateSigningKeyOp = z.infer<typeof unsignedRotateSigningKeyOp>;
declare const rotateSigningKeyOp: z.ZodObject<z.extendShape<{
    type: z.ZodLiteral<"rotate_signing_key">;
    key: z.ZodString;
    prev: z.ZodString;
}, {
    sig: z.ZodString;
}>, "strip", z.ZodTypeAny, {
    type: "rotate_signing_key";
    prev: string;
    sig: string;
    key: string;
}, {
    type: "rotate_signing_key";
    prev: string;
    sig: string;
    key: string;
}>;
export declare type RotateSigningKeyOp = z.infer<typeof rotateSigningKeyOp>;
declare const unsignedRotateRecoveryKeyOp: z.ZodObject<{
    type: z.ZodLiteral<"rotate_recovery_key">;
    key: z.ZodString;
    prev: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: "rotate_recovery_key";
    prev: string;
    key: string;
}, {
    type: "rotate_recovery_key";
    prev: string;
    key: string;
}>;
export declare type UnsignedRotateRecoveryKeyOp = z.infer<typeof unsignedRotateRecoveryKeyOp>;
declare const rotateRecoveryKeyOp: z.ZodObject<z.extendShape<{
    type: z.ZodLiteral<"rotate_recovery_key">;
    key: z.ZodString;
    prev: z.ZodString;
}, {
    sig: z.ZodString;
}>, "strip", z.ZodTypeAny, {
    type: "rotate_recovery_key";
    prev: string;
    sig: string;
    key: string;
}, {
    type: "rotate_recovery_key";
    prev: string;
    sig: string;
    key: string;
}>;
export declare type RotateRecoveryKeyOp = z.infer<typeof rotateRecoveryKeyOp>;
declare const unsignedUpdateHandleOp: z.ZodObject<{
    type: z.ZodLiteral<"update_handle">;
    handle: z.ZodString;
    prev: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: "update_handle";
    handle: string;
    prev: string;
}, {
    type: "update_handle";
    handle: string;
    prev: string;
}>;
export declare type UnsignedUpdateHandleOp = z.infer<typeof unsignedUpdateHandleOp>;
declare const updateHandleOp: z.ZodObject<z.extendShape<{
    type: z.ZodLiteral<"update_handle">;
    handle: z.ZodString;
    prev: z.ZodString;
}, {
    sig: z.ZodString;
}>, "strip", z.ZodTypeAny, {
    type: "update_handle";
    handle: string;
    prev: string;
    sig: string;
}, {
    type: "update_handle";
    handle: string;
    prev: string;
    sig: string;
}>;
export declare type UpdateHandleOp = z.infer<typeof updateHandleOp>;
declare const unsignedUpdateAtpPdsOp: z.ZodObject<{
    type: z.ZodLiteral<"update_atp_pds">;
    service: z.ZodString;
    prev: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: "update_atp_pds";
    service: string;
    prev: string;
}, {
    type: "update_atp_pds";
    service: string;
    prev: string;
}>;
export declare type UnsignedUpdateAtpPdsOp = z.infer<typeof unsignedUpdateAtpPdsOp>;
declare const updateAtpPdsOp: z.ZodObject<z.extendShape<{
    type: z.ZodLiteral<"update_atp_pds">;
    service: z.ZodString;
    prev: z.ZodString;
}, {
    sig: z.ZodString;
}>, "strip", z.ZodTypeAny, {
    type: "update_atp_pds";
    service: string;
    prev: string;
    sig: string;
}, {
    type: "update_atp_pds";
    service: string;
    prev: string;
    sig: string;
}>;
export declare type UpdateAtpPdsOp = z.infer<typeof updateAtpPdsOp>;
declare const updateOperation: z.ZodUnion<[z.ZodObject<z.extendShape<{
    type: z.ZodLiteral<"rotate_signing_key">;
    key: z.ZodString;
    prev: z.ZodString;
}, {
    sig: z.ZodString;
}>, "strip", z.ZodTypeAny, {
    type: "rotate_signing_key";
    prev: string;
    sig: string;
    key: string;
}, {
    type: "rotate_signing_key";
    prev: string;
    sig: string;
    key: string;
}>, z.ZodObject<z.extendShape<{
    type: z.ZodLiteral<"rotate_recovery_key">;
    key: z.ZodString;
    prev: z.ZodString;
}, {
    sig: z.ZodString;
}>, "strip", z.ZodTypeAny, {
    type: "rotate_recovery_key";
    prev: string;
    sig: string;
    key: string;
}, {
    type: "rotate_recovery_key";
    prev: string;
    sig: string;
    key: string;
}>, z.ZodObject<z.extendShape<{
    type: z.ZodLiteral<"update_handle">;
    handle: z.ZodString;
    prev: z.ZodString;
}, {
    sig: z.ZodString;
}>, "strip", z.ZodTypeAny, {
    type: "update_handle";
    handle: string;
    prev: string;
    sig: string;
}, {
    type: "update_handle";
    handle: string;
    prev: string;
    sig: string;
}>, z.ZodObject<z.extendShape<{
    type: z.ZodLiteral<"update_atp_pds">;
    service: z.ZodString;
    prev: z.ZodString;
}, {
    sig: z.ZodString;
}>, "strip", z.ZodTypeAny, {
    type: "update_atp_pds";
    service: string;
    prev: string;
    sig: string;
}, {
    type: "update_atp_pds";
    service: string;
    prev: string;
    sig: string;
}>]>;
export declare type UpdateOperation = z.infer<typeof updateOperation>;
declare const operation: z.ZodUnion<[z.ZodObject<z.extendShape<{
    type: z.ZodLiteral<"create">;
    signingKey: z.ZodString;
    recoveryKey: z.ZodString;
    handle: z.ZodString;
    service: z.ZodString;
    prev: z.ZodNull;
}, {
    sig: z.ZodString;
}>, "strip", z.ZodTypeAny, {
    type: "create";
    signingKey: string;
    recoveryKey: string;
    handle: string;
    service: string;
    prev: null;
    sig: string;
}, {
    type: "create";
    signingKey: string;
    recoveryKey: string;
    handle: string;
    service: string;
    prev: null;
    sig: string;
}>, z.ZodUnion<[z.ZodObject<z.extendShape<{
    type: z.ZodLiteral<"rotate_signing_key">;
    key: z.ZodString;
    prev: z.ZodString;
}, {
    sig: z.ZodString;
}>, "strip", z.ZodTypeAny, {
    type: "rotate_signing_key";
    prev: string;
    sig: string;
    key: string;
}, {
    type: "rotate_signing_key";
    prev: string;
    sig: string;
    key: string;
}>, z.ZodObject<z.extendShape<{
    type: z.ZodLiteral<"rotate_recovery_key">;
    key: z.ZodString;
    prev: z.ZodString;
}, {
    sig: z.ZodString;
}>, "strip", z.ZodTypeAny, {
    type: "rotate_recovery_key";
    prev: string;
    sig: string;
    key: string;
}, {
    type: "rotate_recovery_key";
    prev: string;
    sig: string;
    key: string;
}>, z.ZodObject<z.extendShape<{
    type: z.ZodLiteral<"update_handle">;
    handle: z.ZodString;
    prev: z.ZodString;
}, {
    sig: z.ZodString;
}>, "strip", z.ZodTypeAny, {
    type: "update_handle";
    handle: string;
    prev: string;
    sig: string;
}, {
    type: "update_handle";
    handle: string;
    prev: string;
    sig: string;
}>, z.ZodObject<z.extendShape<{
    type: z.ZodLiteral<"update_atp_pds">;
    service: z.ZodString;
    prev: z.ZodString;
}, {
    sig: z.ZodString;
}>, "strip", z.ZodTypeAny, {
    type: "update_atp_pds";
    service: string;
    prev: string;
    sig: string;
}, {
    type: "update_atp_pds";
    service: string;
    prev: string;
    sig: string;
}>]>]>;
export declare type Operation = z.infer<typeof operation>;
declare const unsignedUpdateOperation: z.ZodUnion<[z.ZodObject<{
    type: z.ZodLiteral<"rotate_signing_key">;
    key: z.ZodString;
    prev: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: "rotate_signing_key";
    prev: string;
    key: string;
}, {
    type: "rotate_signing_key";
    prev: string;
    key: string;
}>, z.ZodObject<{
    type: z.ZodLiteral<"rotate_recovery_key">;
    key: z.ZodString;
    prev: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: "rotate_recovery_key";
    prev: string;
    key: string;
}, {
    type: "rotate_recovery_key";
    prev: string;
    key: string;
}>, z.ZodObject<{
    type: z.ZodLiteral<"update_handle">;
    handle: z.ZodString;
    prev: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: "update_handle";
    handle: string;
    prev: string;
}, {
    type: "update_handle";
    handle: string;
    prev: string;
}>, z.ZodObject<{
    type: z.ZodLiteral<"update_atp_pds">;
    service: z.ZodString;
    prev: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: "update_atp_pds";
    service: string;
    prev: string;
}, {
    type: "update_atp_pds";
    service: string;
    prev: string;
}>]>;
export declare type UnsignedUpdateOperation = z.infer<typeof unsignedUpdateOperation>;
declare const unsignedOperation: z.ZodUnion<[z.ZodObject<{
    type: z.ZodLiteral<"create">;
    signingKey: z.ZodString;
    recoveryKey: z.ZodString;
    handle: z.ZodString;
    service: z.ZodString;
    prev: z.ZodNull;
}, "strip", z.ZodTypeAny, {
    type: "create";
    signingKey: string;
    recoveryKey: string;
    handle: string;
    service: string;
    prev: null;
}, {
    type: "create";
    signingKey: string;
    recoveryKey: string;
    handle: string;
    service: string;
    prev: null;
}>, z.ZodUnion<[z.ZodObject<{
    type: z.ZodLiteral<"rotate_signing_key">;
    key: z.ZodString;
    prev: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: "rotate_signing_key";
    prev: string;
    key: string;
}, {
    type: "rotate_signing_key";
    prev: string;
    key: string;
}>, z.ZodObject<{
    type: z.ZodLiteral<"rotate_recovery_key">;
    key: z.ZodString;
    prev: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: "rotate_recovery_key";
    prev: string;
    key: string;
}, {
    type: "rotate_recovery_key";
    prev: string;
    key: string;
}>, z.ZodObject<{
    type: z.ZodLiteral<"update_handle">;
    handle: z.ZodString;
    prev: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: "update_handle";
    handle: string;
    prev: string;
}, {
    type: "update_handle";
    handle: string;
    prev: string;
}>, z.ZodObject<{
    type: z.ZodLiteral<"update_atp_pds">;
    service: z.ZodString;
    prev: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: "update_atp_pds";
    service: string;
    prev: string;
}, {
    type: "update_atp_pds";
    service: string;
    prev: string;
}>]>]>;
export declare type UnsignedOperation = z.infer<typeof unsignedOperation>;
export declare const indexedOperation: z.ZodObject<{
    did: z.ZodString;
    operation: z.ZodUnion<[z.ZodObject<z.extendShape<{
        type: z.ZodLiteral<"create">;
        signingKey: z.ZodString;
        recoveryKey: z.ZodString;
        handle: z.ZodString;
        service: z.ZodString;
        prev: z.ZodNull;
    }, {
        sig: z.ZodString;
    }>, "strip", z.ZodTypeAny, {
        type: "create";
        signingKey: string;
        recoveryKey: string;
        handle: string;
        service: string;
        prev: null;
        sig: string;
    }, {
        type: "create";
        signingKey: string;
        recoveryKey: string;
        handle: string;
        service: string;
        prev: null;
        sig: string;
    }>, z.ZodUnion<[z.ZodObject<z.extendShape<{
        type: z.ZodLiteral<"rotate_signing_key">;
        key: z.ZodString;
        prev: z.ZodString;
    }, {
        sig: z.ZodString;
    }>, "strip", z.ZodTypeAny, {
        type: "rotate_signing_key";
        prev: string;
        sig: string;
        key: string;
    }, {
        type: "rotate_signing_key";
        prev: string;
        sig: string;
        key: string;
    }>, z.ZodObject<z.extendShape<{
        type: z.ZodLiteral<"rotate_recovery_key">;
        key: z.ZodString;
        prev: z.ZodString;
    }, {
        sig: z.ZodString;
    }>, "strip", z.ZodTypeAny, {
        type: "rotate_recovery_key";
        prev: string;
        sig: string;
        key: string;
    }, {
        type: "rotate_recovery_key";
        prev: string;
        sig: string;
        key: string;
    }>, z.ZodObject<z.extendShape<{
        type: z.ZodLiteral<"update_handle">;
        handle: z.ZodString;
        prev: z.ZodString;
    }, {
        sig: z.ZodString;
    }>, "strip", z.ZodTypeAny, {
        type: "update_handle";
        handle: string;
        prev: string;
        sig: string;
    }, {
        type: "update_handle";
        handle: string;
        prev: string;
        sig: string;
    }>, z.ZodObject<z.extendShape<{
        type: z.ZodLiteral<"update_atp_pds">;
        service: z.ZodString;
        prev: z.ZodString;
    }, {
        sig: z.ZodString;
    }>, "strip", z.ZodTypeAny, {
        type: "update_atp_pds";
        service: string;
        prev: string;
        sig: string;
    }, {
        type: "update_atp_pds";
        service: string;
        prev: string;
        sig: string;
    }>]>]>;
    cid: z.ZodEffects<z.ZodEffects<z.ZodAny, any, any>, mf.CID, any>;
    nullified: z.ZodBoolean;
    createdAt: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    did: string;
    operation: {
        type: "create";
        signingKey: string;
        recoveryKey: string;
        handle: string;
        service: string;
        prev: null;
        sig: string;
    } | {
        type: "rotate_signing_key";
        prev: string;
        sig: string;
        key: string;
    } | {
        type: "rotate_recovery_key";
        prev: string;
        sig: string;
        key: string;
    } | {
        type: "update_handle";
        handle: string;
        prev: string;
        sig: string;
    } | {
        type: "update_atp_pds";
        service: string;
        prev: string;
        sig: string;
    };
    cid: mf.CID;
    nullified: boolean;
    createdAt: Date;
}, {
    cid?: any;
    did: string;
    operation: {
        type: "create";
        signingKey: string;
        recoveryKey: string;
        handle: string;
        service: string;
        prev: null;
        sig: string;
    } | {
        type: "rotate_signing_key";
        prev: string;
        sig: string;
        key: string;
    } | {
        type: "rotate_recovery_key";
        prev: string;
        sig: string;
        key: string;
    } | {
        type: "update_handle";
        handle: string;
        prev: string;
        sig: string;
    } | {
        type: "update_atp_pds";
        service: string;
        prev: string;
        sig: string;
    };
    nullified: boolean;
    createdAt: Date;
}>;
export declare type IndexedOperation = z.infer<typeof indexedOperation>;
export declare const didDocVerificationMethod: z.ZodObject<{
    id: z.ZodString;
    type: z.ZodString;
    controller: z.ZodString;
    publicKeyMultibase: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: string;
    id: string;
    controller: string;
    publicKeyMultibase: string;
}, {
    type: string;
    id: string;
    controller: string;
    publicKeyMultibase: string;
}>;
export declare const didDocService: z.ZodObject<{
    id: z.ZodString;
    type: z.ZodString;
    serviceEndpoint: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: string;
    id: string;
    serviceEndpoint: string;
}, {
    type: string;
    id: string;
    serviceEndpoint: string;
}>;
export declare const didDocument: z.ZodObject<{
    '@context': z.ZodArray<z.ZodString, "many">;
    id: z.ZodString;
    alsoKnownAs: z.ZodArray<z.ZodString, "many">;
    verificationMethod: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        type: z.ZodString;
        controller: z.ZodString;
        publicKeyMultibase: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: string;
        id: string;
        controller: string;
        publicKeyMultibase: string;
    }, {
        type: string;
        id: string;
        controller: string;
        publicKeyMultibase: string;
    }>, "many">;
    assertionMethod: z.ZodArray<z.ZodString, "many">;
    capabilityInvocation: z.ZodArray<z.ZodString, "many">;
    capabilityDelegation: z.ZodArray<z.ZodString, "many">;
    service: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        type: z.ZodString;
        serviceEndpoint: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: string;
        id: string;
        serviceEndpoint: string;
    }, {
        type: string;
        id: string;
        serviceEndpoint: string;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    service: {
        type: string;
        id: string;
        serviceEndpoint: string;
    }[];
    id: string;
    '@context': string[];
    alsoKnownAs: string[];
    verificationMethod: {
        type: string;
        id: string;
        controller: string;
        publicKeyMultibase: string;
    }[];
    assertionMethod: string[];
    capabilityInvocation: string[];
    capabilityDelegation: string[];
}, {
    service: {
        type: string;
        id: string;
        serviceEndpoint: string;
    }[];
    id: string;
    '@context': string[];
    alsoKnownAs: string[];
    verificationMethod: {
        type: string;
        id: string;
        controller: string;
        publicKeyMultibase: string;
    }[];
    assertionMethod: string[];
    capabilityInvocation: string[];
    capabilityDelegation: string[];
}>;
export declare type DidDocument = z.infer<typeof didDocument>;
export declare const def: {
    documentData: z.ZodObject<{
        did: z.ZodString;
        signingKey: z.ZodString;
        recoveryKey: z.ZodString;
        handle: z.ZodString;
        atpPds: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        did: string;
        signingKey: string;
        recoveryKey: string;
        handle: string;
        atpPds: string;
    }, {
        did: string;
        signingKey: string;
        recoveryKey: string;
        handle: string;
        atpPds: string;
    }>;
    unsignedCreateOp: z.ZodObject<{
        type: z.ZodLiteral<"create">;
        signingKey: z.ZodString;
        recoveryKey: z.ZodString;
        handle: z.ZodString;
        service: z.ZodString;
        prev: z.ZodNull;
    }, "strip", z.ZodTypeAny, {
        type: "create";
        signingKey: string;
        recoveryKey: string;
        handle: string;
        service: string;
        prev: null;
    }, {
        type: "create";
        signingKey: string;
        recoveryKey: string;
        handle: string;
        service: string;
        prev: null;
    }>;
    createOp: z.ZodObject<z.extendShape<{
        type: z.ZodLiteral<"create">;
        signingKey: z.ZodString;
        recoveryKey: z.ZodString;
        handle: z.ZodString;
        service: z.ZodString;
        prev: z.ZodNull;
    }, {
        sig: z.ZodString;
    }>, "strip", z.ZodTypeAny, {
        type: "create";
        signingKey: string;
        recoveryKey: string;
        handle: string;
        service: string;
        prev: null;
        sig: string;
    }, {
        type: "create";
        signingKey: string;
        recoveryKey: string;
        handle: string;
        service: string;
        prev: null;
        sig: string;
    }>;
    unsignedRotateSigningKeyOp: z.ZodObject<{
        type: z.ZodLiteral<"rotate_signing_key">;
        key: z.ZodString;
        prev: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: "rotate_signing_key";
        prev: string;
        key: string;
    }, {
        type: "rotate_signing_key";
        prev: string;
        key: string;
    }>;
    rotateSigningKeyOp: z.ZodObject<z.extendShape<{
        type: z.ZodLiteral<"rotate_signing_key">;
        key: z.ZodString;
        prev: z.ZodString;
    }, {
        sig: z.ZodString;
    }>, "strip", z.ZodTypeAny, {
        type: "rotate_signing_key";
        prev: string;
        sig: string;
        key: string;
    }, {
        type: "rotate_signing_key";
        prev: string;
        sig: string;
        key: string;
    }>;
    unsignedRotateRecoveryKeyOp: z.ZodObject<{
        type: z.ZodLiteral<"rotate_recovery_key">;
        key: z.ZodString;
        prev: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: "rotate_recovery_key";
        prev: string;
        key: string;
    }, {
        type: "rotate_recovery_key";
        prev: string;
        key: string;
    }>;
    rotateRecoveryKeyOp: z.ZodObject<z.extendShape<{
        type: z.ZodLiteral<"rotate_recovery_key">;
        key: z.ZodString;
        prev: z.ZodString;
    }, {
        sig: z.ZodString;
    }>, "strip", z.ZodTypeAny, {
        type: "rotate_recovery_key";
        prev: string;
        sig: string;
        key: string;
    }, {
        type: "rotate_recovery_key";
        prev: string;
        sig: string;
        key: string;
    }>;
    unsignedUpdateHandleOp: z.ZodObject<{
        type: z.ZodLiteral<"update_handle">;
        handle: z.ZodString;
        prev: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: "update_handle";
        handle: string;
        prev: string;
    }, {
        type: "update_handle";
        handle: string;
        prev: string;
    }>;
    updateHandleOp: z.ZodObject<z.extendShape<{
        type: z.ZodLiteral<"update_handle">;
        handle: z.ZodString;
        prev: z.ZodString;
    }, {
        sig: z.ZodString;
    }>, "strip", z.ZodTypeAny, {
        type: "update_handle";
        handle: string;
        prev: string;
        sig: string;
    }, {
        type: "update_handle";
        handle: string;
        prev: string;
        sig: string;
    }>;
    unsignedUpdateAtpPdsOp: z.ZodObject<{
        type: z.ZodLiteral<"update_atp_pds">;
        service: z.ZodString;
        prev: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: "update_atp_pds";
        service: string;
        prev: string;
    }, {
        type: "update_atp_pds";
        service: string;
        prev: string;
    }>;
    updateAtpPdsOp: z.ZodObject<z.extendShape<{
        type: z.ZodLiteral<"update_atp_pds">;
        service: z.ZodString;
        prev: z.ZodString;
    }, {
        sig: z.ZodString;
    }>, "strip", z.ZodTypeAny, {
        type: "update_atp_pds";
        service: string;
        prev: string;
        sig: string;
    }, {
        type: "update_atp_pds";
        service: string;
        prev: string;
        sig: string;
    }>;
    updateOperation: z.ZodUnion<[z.ZodObject<z.extendShape<{
        type: z.ZodLiteral<"rotate_signing_key">;
        key: z.ZodString;
        prev: z.ZodString;
    }, {
        sig: z.ZodString;
    }>, "strip", z.ZodTypeAny, {
        type: "rotate_signing_key";
        prev: string;
        sig: string;
        key: string;
    }, {
        type: "rotate_signing_key";
        prev: string;
        sig: string;
        key: string;
    }>, z.ZodObject<z.extendShape<{
        type: z.ZodLiteral<"rotate_recovery_key">;
        key: z.ZodString;
        prev: z.ZodString;
    }, {
        sig: z.ZodString;
    }>, "strip", z.ZodTypeAny, {
        type: "rotate_recovery_key";
        prev: string;
        sig: string;
        key: string;
    }, {
        type: "rotate_recovery_key";
        prev: string;
        sig: string;
        key: string;
    }>, z.ZodObject<z.extendShape<{
        type: z.ZodLiteral<"update_handle">;
        handle: z.ZodString;
        prev: z.ZodString;
    }, {
        sig: z.ZodString;
    }>, "strip", z.ZodTypeAny, {
        type: "update_handle";
        handle: string;
        prev: string;
        sig: string;
    }, {
        type: "update_handle";
        handle: string;
        prev: string;
        sig: string;
    }>, z.ZodObject<z.extendShape<{
        type: z.ZodLiteral<"update_atp_pds">;
        service: z.ZodString;
        prev: z.ZodString;
    }, {
        sig: z.ZodString;
    }>, "strip", z.ZodTypeAny, {
        type: "update_atp_pds";
        service: string;
        prev: string;
        sig: string;
    }, {
        type: "update_atp_pds";
        service: string;
        prev: string;
        sig: string;
    }>]>;
    operation: z.ZodUnion<[z.ZodObject<z.extendShape<{
        type: z.ZodLiteral<"create">;
        signingKey: z.ZodString;
        recoveryKey: z.ZodString;
        handle: z.ZodString;
        service: z.ZodString;
        prev: z.ZodNull;
    }, {
        sig: z.ZodString;
    }>, "strip", z.ZodTypeAny, {
        type: "create";
        signingKey: string;
        recoveryKey: string;
        handle: string;
        service: string;
        prev: null;
        sig: string;
    }, {
        type: "create";
        signingKey: string;
        recoveryKey: string;
        handle: string;
        service: string;
        prev: null;
        sig: string;
    }>, z.ZodUnion<[z.ZodObject<z.extendShape<{
        type: z.ZodLiteral<"rotate_signing_key">;
        key: z.ZodString;
        prev: z.ZodString;
    }, {
        sig: z.ZodString;
    }>, "strip", z.ZodTypeAny, {
        type: "rotate_signing_key";
        prev: string;
        sig: string;
        key: string;
    }, {
        type: "rotate_signing_key";
        prev: string;
        sig: string;
        key: string;
    }>, z.ZodObject<z.extendShape<{
        type: z.ZodLiteral<"rotate_recovery_key">;
        key: z.ZodString;
        prev: z.ZodString;
    }, {
        sig: z.ZodString;
    }>, "strip", z.ZodTypeAny, {
        type: "rotate_recovery_key";
        prev: string;
        sig: string;
        key: string;
    }, {
        type: "rotate_recovery_key";
        prev: string;
        sig: string;
        key: string;
    }>, z.ZodObject<z.extendShape<{
        type: z.ZodLiteral<"update_handle">;
        handle: z.ZodString;
        prev: z.ZodString;
    }, {
        sig: z.ZodString;
    }>, "strip", z.ZodTypeAny, {
        type: "update_handle";
        handle: string;
        prev: string;
        sig: string;
    }, {
        type: "update_handle";
        handle: string;
        prev: string;
        sig: string;
    }>, z.ZodObject<z.extendShape<{
        type: z.ZodLiteral<"update_atp_pds">;
        service: z.ZodString;
        prev: z.ZodString;
    }, {
        sig: z.ZodString;
    }>, "strip", z.ZodTypeAny, {
        type: "update_atp_pds";
        service: string;
        prev: string;
        sig: string;
    }, {
        type: "update_atp_pds";
        service: string;
        prev: string;
        sig: string;
    }>]>]>;
    unsignedUpdateOperation: z.ZodUnion<[z.ZodObject<{
        type: z.ZodLiteral<"rotate_signing_key">;
        key: z.ZodString;
        prev: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: "rotate_signing_key";
        prev: string;
        key: string;
    }, {
        type: "rotate_signing_key";
        prev: string;
        key: string;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"rotate_recovery_key">;
        key: z.ZodString;
        prev: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: "rotate_recovery_key";
        prev: string;
        key: string;
    }, {
        type: "rotate_recovery_key";
        prev: string;
        key: string;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"update_handle">;
        handle: z.ZodString;
        prev: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: "update_handle";
        handle: string;
        prev: string;
    }, {
        type: "update_handle";
        handle: string;
        prev: string;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"update_atp_pds">;
        service: z.ZodString;
        prev: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: "update_atp_pds";
        service: string;
        prev: string;
    }, {
        type: "update_atp_pds";
        service: string;
        prev: string;
    }>]>;
    unsignedOperation: z.ZodUnion<[z.ZodObject<{
        type: z.ZodLiteral<"create">;
        signingKey: z.ZodString;
        recoveryKey: z.ZodString;
        handle: z.ZodString;
        service: z.ZodString;
        prev: z.ZodNull;
    }, "strip", z.ZodTypeAny, {
        type: "create";
        signingKey: string;
        recoveryKey: string;
        handle: string;
        service: string;
        prev: null;
    }, {
        type: "create";
        signingKey: string;
        recoveryKey: string;
        handle: string;
        service: string;
        prev: null;
    }>, z.ZodUnion<[z.ZodObject<{
        type: z.ZodLiteral<"rotate_signing_key">;
        key: z.ZodString;
        prev: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: "rotate_signing_key";
        prev: string;
        key: string;
    }, {
        type: "rotate_signing_key";
        prev: string;
        key: string;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"rotate_recovery_key">;
        key: z.ZodString;
        prev: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: "rotate_recovery_key";
        prev: string;
        key: string;
    }, {
        type: "rotate_recovery_key";
        prev: string;
        key: string;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"update_handle">;
        handle: z.ZodString;
        prev: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: "update_handle";
        handle: string;
        prev: string;
    }, {
        type: "update_handle";
        handle: string;
        prev: string;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"update_atp_pds">;
        service: z.ZodString;
        prev: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: "update_atp_pds";
        service: string;
        prev: string;
    }, {
        type: "update_atp_pds";
        service: string;
        prev: string;
    }>]>]>;
    indexedOperation: z.ZodObject<{
        did: z.ZodString;
        operation: z.ZodUnion<[z.ZodObject<z.extendShape<{
            type: z.ZodLiteral<"create">;
            signingKey: z.ZodString;
            recoveryKey: z.ZodString;
            handle: z.ZodString;
            service: z.ZodString;
            prev: z.ZodNull;
        }, {
            sig: z.ZodString;
        }>, "strip", z.ZodTypeAny, {
            type: "create";
            signingKey: string;
            recoveryKey: string;
            handle: string;
            service: string;
            prev: null;
            sig: string;
        }, {
            type: "create";
            signingKey: string;
            recoveryKey: string;
            handle: string;
            service: string;
            prev: null;
            sig: string;
        }>, z.ZodUnion<[z.ZodObject<z.extendShape<{
            type: z.ZodLiteral<"rotate_signing_key">;
            key: z.ZodString;
            prev: z.ZodString;
        }, {
            sig: z.ZodString;
        }>, "strip", z.ZodTypeAny, {
            type: "rotate_signing_key";
            prev: string;
            sig: string;
            key: string;
        }, {
            type: "rotate_signing_key";
            prev: string;
            sig: string;
            key: string;
        }>, z.ZodObject<z.extendShape<{
            type: z.ZodLiteral<"rotate_recovery_key">;
            key: z.ZodString;
            prev: z.ZodString;
        }, {
            sig: z.ZodString;
        }>, "strip", z.ZodTypeAny, {
            type: "rotate_recovery_key";
            prev: string;
            sig: string;
            key: string;
        }, {
            type: "rotate_recovery_key";
            prev: string;
            sig: string;
            key: string;
        }>, z.ZodObject<z.extendShape<{
            type: z.ZodLiteral<"update_handle">;
            handle: z.ZodString;
            prev: z.ZodString;
        }, {
            sig: z.ZodString;
        }>, "strip", z.ZodTypeAny, {
            type: "update_handle";
            handle: string;
            prev: string;
            sig: string;
        }, {
            type: "update_handle";
            handle: string;
            prev: string;
            sig: string;
        }>, z.ZodObject<z.extendShape<{
            type: z.ZodLiteral<"update_atp_pds">;
            service: z.ZodString;
            prev: z.ZodString;
        }, {
            sig: z.ZodString;
        }>, "strip", z.ZodTypeAny, {
            type: "update_atp_pds";
            service: string;
            prev: string;
            sig: string;
        }, {
            type: "update_atp_pds";
            service: string;
            prev: string;
            sig: string;
        }>]>]>;
        cid: z.ZodEffects<z.ZodEffects<z.ZodAny, any, any>, mf.CID, any>;
        nullified: z.ZodBoolean;
        createdAt: z.ZodDate;
    }, "strip", z.ZodTypeAny, {
        did: string;
        operation: {
            type: "create";
            signingKey: string;
            recoveryKey: string;
            handle: string;
            service: string;
            prev: null;
            sig: string;
        } | {
            type: "rotate_signing_key";
            prev: string;
            sig: string;
            key: string;
        } | {
            type: "rotate_recovery_key";
            prev: string;
            sig: string;
            key: string;
        } | {
            type: "update_handle";
            handle: string;
            prev: string;
            sig: string;
        } | {
            type: "update_atp_pds";
            service: string;
            prev: string;
            sig: string;
        };
        cid: mf.CID;
        nullified: boolean;
        createdAt: Date;
    }, {
        cid?: any;
        did: string;
        operation: {
            type: "create";
            signingKey: string;
            recoveryKey: string;
            handle: string;
            service: string;
            prev: null;
            sig: string;
        } | {
            type: "rotate_signing_key";
            prev: string;
            sig: string;
            key: string;
        } | {
            type: "rotate_recovery_key";
            prev: string;
            sig: string;
            key: string;
        } | {
            type: "update_handle";
            handle: string;
            prev: string;
            sig: string;
        } | {
            type: "update_atp_pds";
            service: string;
            prev: string;
            sig: string;
        };
        nullified: boolean;
        createdAt: Date;
    }>;
    didDocument: z.ZodObject<{
        '@context': z.ZodArray<z.ZodString, "many">;
        id: z.ZodString;
        alsoKnownAs: z.ZodArray<z.ZodString, "many">;
        verificationMethod: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            type: z.ZodString;
            controller: z.ZodString;
            publicKeyMultibase: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: string;
            id: string;
            controller: string;
            publicKeyMultibase: string;
        }, {
            type: string;
            id: string;
            controller: string;
            publicKeyMultibase: string;
        }>, "many">;
        assertionMethod: z.ZodArray<z.ZodString, "many">;
        capabilityInvocation: z.ZodArray<z.ZodString, "many">;
        capabilityDelegation: z.ZodArray<z.ZodString, "many">;
        service: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            type: z.ZodString;
            serviceEndpoint: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: string;
            id: string;
            serviceEndpoint: string;
        }, {
            type: string;
            id: string;
            serviceEndpoint: string;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        service: {
            type: string;
            id: string;
            serviceEndpoint: string;
        }[];
        id: string;
        '@context': string[];
        alsoKnownAs: string[];
        verificationMethod: {
            type: string;
            id: string;
            controller: string;
            publicKeyMultibase: string;
        }[];
        assertionMethod: string[];
        capabilityInvocation: string[];
        capabilityDelegation: string[];
    }, {
        service: {
            type: string;
            id: string;
            serviceEndpoint: string;
        }[];
        id: string;
        '@context': string[];
        alsoKnownAs: string[];
        verificationMethod: {
            type: string;
            id: string;
            controller: string;
            publicKeyMultibase: string;
        }[];
        assertionMethod: string[];
        capabilityInvocation: string[];
        capabilityDelegation: string[];
    }>;
};
export {};

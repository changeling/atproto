export declare enum ServerType {
    PersonalDataServer = "pds",
    DidPlaceholder = "plc"
}
export interface ServerConfig {
    type: ServerType;
    port: number;
}
export interface StartParams {
    servers?: ServerConfig[];
}
export declare const PORTS: {
    pds: number;
    plc: number;
};
export declare const SERVER_TYPE_LABELS: {
    pds: string;
};

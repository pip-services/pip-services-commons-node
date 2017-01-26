import { ConfigParams } from '../config/ConfigParams';
export declare class CredentialParams extends ConfigParams {
    constructor(values?: any);
    useCredentialStore(): boolean;
    getStoreKey(): string;
    setStoreKey(value: string): void;
    getUsername(): string;
    setUsername(value: string): void;
    getPassword(): string;
    setPassword(value: string): void;
    getAccessId(): string;
    setAccessId(value: string): void;
    getAccessKey(): string;
    setAccessKey(value: string): void;
    static fromString(line: string): CredentialParams;
    static manyFromConfig(config: ConfigParams, configAsDefault?: boolean): CredentialParams[];
    static fromConfig(config: ConfigParams, configAsDefault: boolean): CredentialParams;
}

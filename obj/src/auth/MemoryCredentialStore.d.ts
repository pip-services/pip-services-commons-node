import { ConfigParams } from '../config/ConfigParams';
import { IReconfigurable } from '../config/IReconfigurable';
import { CredentialParams } from './CredentialParams';
import { ICredentialStore } from './ICredentialStore';
export declare class MemoryCredentialStore implements ICredentialStore, IReconfigurable {
    private readonly _items;
    constructor(config?: ConfigParams);
    configure(config: ConfigParams): void;
    readCredentials(credentials: ConfigParams): void;
    store(correlationId: string, key: string, credential: CredentialParams, callback: (err: any) => void): void;
    lookup(correlationId: string, key: string, callback: (err: any, result: CredentialParams) => void): void;
}

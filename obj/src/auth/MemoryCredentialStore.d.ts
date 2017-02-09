import { ConfigParams } from '../config/ConfigParams';
import { IReconfigurable } from '../config/IReconfigurable';
import { CredentialParams } from './CredentialParams';
import { ICredentialStore } from './ICredentialStore';
import { IDescriptable } from '../refer/IDescriptable';
import { Descriptor } from '../refer/Descriptor';
export declare class MemoryCredentialStore implements ICredentialStore, IReconfigurable, IDescriptable {
    private readonly _items;
    private _name;
    constructor(name?: string, credentials?: ConfigParams);
    getName(): string;
    getDescriptor(): Descriptor;
    configure(config: ConfigParams): void;
    readCredentials(credentials: ConfigParams): void;
    store(correlationId: string, key: string, credential: CredentialParams, callback: (err: any) => void): void;
    lookup(correlationId: string, key: string, callback: (err: any, result: CredentialParams) => void): void;
}

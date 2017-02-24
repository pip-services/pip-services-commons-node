let async = require('async');

import { ConfigParams } from '../config/ConfigParams';
import { IReconfigurable } from '../config/IReconfigurable';
import { NameResolver } from '../config/NameResolver';
import { CredentialParams } from './CredentialParams';
import { ICredentialStore } from './ICredentialStore';
import { IDescriptable } from '../refer/IDescriptable';
import { Descriptor } from '../refer/Descriptor';
import { StringValueMap } from '../data/StringValueMap';

export class MemoryCredentialStore implements ICredentialStore, IReconfigurable, IDescriptable {
    private readonly _items: StringValueMap = new StringValueMap();
    private _name: string;

    public constructor(name: string = null, credentials: ConfigParams = null) {
        name = name;
        if (credentials != null)
            this.configure(credentials);
    }

    public getName(): string {
        return this._name;
    }

    public getDescriptor(): Descriptor {
        let name = this._name || "default";
        return new Descriptor("pip-services-commons", "credential-store", "memory", name, "1.0");
    }

    public configure(config: ConfigParams): void {
        this._name = NameResolver.resolve(config, this._name);
        this.readCredentials(config);
    }

    public readCredentials(credentials: ConfigParams) {
        this._items.clear();
        for (let key in credentials.getKeyNames())
            this._items.put(key, CredentialParams.fromTuples([key, credentials.getAsNullableString(key)]));
    }

    public store(correlationId: string, key: string, credential: CredentialParams, callback: (err: any) => void): void {
        if (credential != null)
            this._items.put(key, credential);
        else
            this._items.delete(key);

        if (callback) callback(null);
    }

    public lookup(correlationId: string, key: string, callback: (err: any, result: CredentialParams) => void): void {
        let credential: any = this._items.getAsObject(key);
        callback(null, <CredentialParams>credential);
    }
}
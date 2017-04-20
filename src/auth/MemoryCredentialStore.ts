let async = require('async');

import { ConfigParams } from '../config/ConfigParams';
import { IReconfigurable } from '../config/IReconfigurable';
import { CredentialParams } from './CredentialParams';
import { ICredentialStore } from './ICredentialStore';
import { StringValueMap } from '../data/StringValueMap';

export class MemoryCredentialStore implements ICredentialStore, IReconfigurable {
    private readonly _items: StringValueMap = new StringValueMap();

    public constructor(config: ConfigParams = null) {
        if (config != null)
            this.configure(config);
    }

    public configure(config: ConfigParams): void {
        this.readCredentials(config);
    }

    public readCredentials(credentials: ConfigParams) {
        this._items.clear();
        let keys = credentials.getKeyNames();
        for (let index = 0; index < keys.length; index++) {
            let key = keys[index];
            let value = credentials.getAsNullableString(key);
            this._items.put(key, CredentialParams.fromTuplesArray([key, value]));
        }
    }

    public store(correlationId: string, key: string, credential: CredentialParams, callback: (err: any) => void): void {
        if (credential != null)
            this._items.put(key, credential);
        else
            this._items.remove(key);

        if (callback) callback(null);
    }

    public lookup(correlationId: string, key: string, callback: (err: any, result: CredentialParams) => void): void {
        let credential: any = this._items.getAsObject(key);
        callback(null, <CredentialParams>credential);
    }
}
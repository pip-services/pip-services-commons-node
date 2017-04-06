let async = require('async');

import { CredentialParams } from './CredentialParams';
import { ICredentialStore } from './ICredentialStore';
import { ConfigParams } from '../config/ConfigParams';
import { IReferences } from '../refer/IReferences';
import { ReferenceException } from '../refer/ReferenceException';
import { Descriptor } from '../refer/Descriptor';

export class CredentialResolver {
    private readonly _credentials: CredentialParams[] = [];
    private _references: IReferences = null;

    public constructor(config: ConfigParams = null, references: IReferences = null) {
        if (config != null) this.configure(config);
        if (references != null) this.setReferences(references);
    }

    public setReferences(references: IReferences): void {
        this._references = references;
    }

    public configure(config: ConfigParams): void {
        let credentials: CredentialParams[] = CredentialParams.manyFromConfig(config);
        this._credentials.push(...credentials);
    }

    public getAll(): CredentialParams[] {
        return this._credentials;
    }

    public add(connection: CredentialParams): void {
        this._credentials.push(connection);
    }

    public lookupInStores(correlationId: string, credential: CredentialParams, 
        callback: (err: any, result: CredentialParams) => void): void {

        if (!credential.useCredentialStore()) {
            callback(null, null);
            return;
        }

        let key: string = credential.getStoreKey();
        if (this._references == null) {
            callback(null, null);
            return;
        }

        let storeDescriptor = new Descriptor("*", "credential_store", "*", "*", "*")
        let components: any[] = this._references.getOptional<any>(storeDescriptor)
        if (components.length == 0) {
            let err = new ReferenceException(correlationId, storeDescriptor);
            callback(err, null);
            return;
        }

        let firstResult: CredentialParams = null;

        async.any(
            components,
            (component, callback) => {
                let store: ICredentialStore = component;
                store.lookup(correlationId, key, (err, result) => {
                    if (err || result == null) {
                        callback(err, false);
                    } else {
                        firstResult = result;
                        callback(err, true);
                    }

                });
            },
            (err) => {
                if (callback) callback(err, firstResult);
            }
        );
    }

    public lookup(correlationId: string, callback: (err: any, result: CredentialParams) => void): void {

        if (this._credentials.length == 0) {
            if (callback) callback(null, null);
            return;
        }

        let lookupCredentials: CredentialParams[] = [];

        for (let index = 0; index < this._credentials.length; index++) {
            if (!this._credentials[index].useCredentialStore()) {
                if (callback) callback(null, this._credentials[index]);
                return;
            } else {
                lookupCredentials.push(this._credentials[index]);
            }
        }

        let firstResult: CredentialParams = null;
        async.any(
            lookupCredentials,
            (credential, callback) => {
                this.lookupInStores(correlationId, credential, (err, result) => {
                    if (err || result == null) {
                        callback(err, false);
                    } else {
                        firstResult = result;
                        callback(err, true);
                    }
                });
            },
            (err) => {
                if (callback) callback(err, firstResult);
            }
        );
    }
}
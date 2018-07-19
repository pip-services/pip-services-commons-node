let async = require('async');

import { CredentialParams } from './CredentialParams';
import { ICredentialStore } from './ICredentialStore';
import { ConfigParams } from '../config/ConfigParams';
import { IReferences } from '../refer/IReferences';
import { ReferenceException } from '../refer/ReferenceException';
import { Descriptor } from '../refer/Descriptor';

/**
 * Helper class that stores credential parameters ({@link CredentialParams}) and is capable of acquiring parameters 
 * from various credential stores.
 * 
 * @see CredentialParams
 * @see ICredentialStore
 */
export class CredentialResolver {
    private readonly _credentials: CredentialParams[] = [];
    private _references: IReferences = null;

    /**
     * @param config        ConfigParams (credentials) to configure this object with.
     * @param references    references to the credential stores that should be used by this CredentialResolver.
     * 
     * @see #configure
     * @see #setReferences
     */
    public constructor(config: ConfigParams = null, references: IReferences = null) {
        if (config != null) this.configure(config);
        if (references != null) this.setReferences(references);
    }

    /**
     * Sets the credential stores that this CredentialResolver references.
     * 
     * @param references    references to set.
     */
    public setReferences(references: IReferences): void {
        this._references = references;
    }

    /**
     * Configures this object by converting the passed ConfigParams into a list of CredentialParams
     * and adding them to this CredentialResolver's list of credentials.
     * 
     * @param config    credentials to add to this CredentialResolver's list of credentials.
     * 
     * @see CredentialParams#manyFromConfig
     * @see CredentialParams
     * @see ConfigParams
     * @see IConfigurable
     */
    public configure(config: ConfigParams): void {
        let credentials: CredentialParams[] = CredentialParams.manyFromConfig(config);
        this._credentials.push(...credentials);
    }

    /**
     * @returns a list of all credentials that are stored in this CredentialResolver.
     */
    public getAll(): CredentialParams[] {
        return this._credentials;
    }

    /**
     * Adds a new credential to this CredentialResolver's list of credentials.
     * 
     * @param credential    CredentialParams for the credential that is to be added.
     * 
     * @see CredentialParams
     */
    public add(credential: CredentialParams): void {
        this._credentials.push(credential);
    }

    /**
     * Looks up a credential for a given connection using the 'credential' parameter's 
     * store key in the credential stores referenced.
     * 
     * @param correlationId     unique business transaction id to trace calls across components.
     * @param credential        CredentialParams that contain a store key, which will be used for 
     *                          looking up credentials.
     * @param callback          callback function that will be called with an error or with the 
     *                          first CredentialParams found. Null will be returned if the credential
     *                          does not have a key, or there are no references set.
     * @throws a ReferenceException, if no valid "credential-store" services are referenced.
     */
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

        let storeDescriptor = new Descriptor("*", "credential-store", "*", "*", "*")
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

    /**
     * Looks up a credential in this CredentialResolver using its list of credentials ({@link CredentialParams}) 
     * and the credential stores ({@link ICredentialStore}) referenced.
     * 
     * @param correlationId     unique business transaction id to trace calls across components.
     * @param callback          callback function that will be called with an error or with the 
     *                          return value. Returns: the first credential found that does not 
     *                          need to be looked up in a credential store or the first credential 
     *                          successfully looked up in a credential store. Returns null 
     *                          if no credentials were found.
     */
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
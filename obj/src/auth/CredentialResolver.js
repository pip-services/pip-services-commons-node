"use strict";
var async = require('async');
var CredentialParams_1 = require("./CredentialParams");
var ReferenceException_1 = require("../refer/ReferenceException");
var Descriptor_1 = require("../refer/Descriptor");
var CredentialResolver = (function () {
    function CredentialResolver(config, references) {
        if (config === void 0) { config = null; }
        if (references === void 0) { references = null; }
        this._credentials = [];
        this._references = null;
        if (config != null)
            this.configure(config);
        if (references != null)
            this.setReferences(references);
    }
    CredentialResolver.prototype.setReferences = function (references) {
        this._references = references;
    };
    CredentialResolver.prototype.configure = function (config, configAsDefault) {
        if (configAsDefault === void 0) { configAsDefault = true; }
        var credentials = CredentialParams_1.CredentialParams.manyFromConfig(config, configAsDefault);
        (_a = this._credentials).push.apply(_a, credentials);
        var _a;
    };
    CredentialResolver.prototype.getAll = function () {
        return this._credentials;
    };
    CredentialResolver.prototype.add = function (connection) {
        this._credentials.push(connection);
    };
    CredentialResolver.prototype.lookupInStores = function (correlationId, credential, callback) {
        if (!credential.useCredentialStore()) {
            callback(null, null);
            return;
        }
        var key = credential.getStoreKey();
        if (this._references == null)
            return;
        var components = this._references.getOptional(new Descriptor_1.Descriptor("*", "credential_store", "*", "*", "*"));
        if (components.length == 0)
            throw new ReferenceException_1.ReferenceException(correlationId, "Credential store wasn't found to make lookup");
        var firstResult = null;
        async.any(components, function (component, cb) {
            var store = component;
            store.lookup(correlationId, key, function (err, result) {
                if (err || result == null) {
                    cb(err, false);
                }
                else {
                    firstResult = result;
                    cb(err, true);
                }
            });
        }, function (err) {
            if (callback)
                callback(err, firstResult);
        });
    };
    CredentialResolver.prototype.lookup = function (correlationId, callback) {
        var _this = this;
        if (this._credentials.length == 0) {
            if (callback)
                callback(null, null);
            return;
        }
        var lookupCredentials = [];
        for (var index = 0; index < this._credentials.length; index++) {
            if (!this._credentials[index].useCredentialStore()) {
                if (callback)
                    callback(null, this._credentials[index]);
                return;
            }
            else {
                lookupCredentials.push(this._credentials[index]);
            }
        }
        var firstResult = null;
        async.any(lookupCredentials, function (credential, cb) {
            _this.lookupInStores(correlationId, credential, function (err, result) {
                if (err || result == null) {
                    cb(err, false);
                }
                else {
                    firstResult = result;
                    cb(err, true);
                }
            });
        }, function (err) {
            if (callback)
                callback(err, firstResult);
        });
    };
    return CredentialResolver;
}());
exports.CredentialResolver = CredentialResolver;
//# sourceMappingURL=CredentialResolver.js.map
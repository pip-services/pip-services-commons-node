"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var async = require('async');
var NameResolver_1 = require("../config/NameResolver");
var CredentialParams_1 = require("./CredentialParams");
var Descriptor_1 = require("../refer/Descriptor");
var StringValueMap_1 = require("../data/StringValueMap");
var MemoryCredentialStore = (function () {
    function MemoryCredentialStore(name, credentials) {
        if (name === void 0) { name = null; }
        if (credentials === void 0) { credentials = null; }
        this._items = new StringValueMap_1.StringValueMap();
        name = name;
        if (credentials != null)
            this.configure(credentials);
    }
    MemoryCredentialStore.prototype.getName = function () {
        return this._name;
    };
    MemoryCredentialStore.prototype.getDescriptor = function () {
        var name = this._name || "default";
        return new Descriptor_1.Descriptor("pip-services-commons", "credential-store", "memory", name, "1.0");
    };
    MemoryCredentialStore.prototype.configure = function (config) {
        this._name = NameResolver_1.NameResolver.resolve(config, this._name);
        this.readCredentials(config);
    };
    MemoryCredentialStore.prototype.readCredentials = function (credentials) {
        this._items.clear();
        for (var key in credentials.getKeyNames())
            this._items.put(key, CredentialParams_1.CredentialParams.fromTuples([key, credentials.getAsNullableString(key)]));
    };
    MemoryCredentialStore.prototype.store = function (correlationId, key, credential, callback) {
        if (credential != null)
            this._items.put(key, credential);
        else
            this._items.delete(key);
        if (callback)
            callback(null);
    };
    MemoryCredentialStore.prototype.lookup = function (correlationId, key, callback) {
        var credential = this._items.getAsObject(key);
        callback(null, credential);
    };
    return MemoryCredentialStore;
}());
exports.MemoryCredentialStore = MemoryCredentialStore;
//# sourceMappingURL=MemoryCredentialStore.js.map
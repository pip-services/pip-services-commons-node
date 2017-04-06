"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var async = require('async');
var CredentialParams_1 = require("./CredentialParams");
var StringValueMap_1 = require("../data/StringValueMap");
var MemoryCredentialStore = (function () {
    function MemoryCredentialStore(config) {
        if (config === void 0) { config = null; }
        this._items = new StringValueMap_1.StringValueMap();
        if (config != null)
            this.configure(config);
    }
    MemoryCredentialStore.prototype.configure = function (config) {
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
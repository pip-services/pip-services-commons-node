"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ConfigParams_1 = require("../config/ConfigParams");
var StringValueMap_1 = require("../data/StringValueMap");
var CredentialParams = (function (_super) {
    __extends(CredentialParams, _super);
    function CredentialParams(values) {
        if (values === void 0) { values = null; }
        return _super.call(this, values) || this;
    }
    CredentialParams.prototype.useCredentialStore = function () {
        return _super.prototype.getAsNullableString.call(this, "store_key") != null;
    };
    CredentialParams.prototype.getStoreKey = function () {
        return _super.prototype.getAsNullableString.call(this, "store_key");
    };
    CredentialParams.prototype.setStoreKey = function (value) {
        _super.prototype.put.call(this, "store_key", value);
    };
    CredentialParams.prototype.getUsername = function () {
        return _super.prototype.getAsNullableString.call(this, "username");
    };
    CredentialParams.prototype.setUsername = function (value) {
        _super.prototype.put.call(this, "username", value);
    };
    CredentialParams.prototype.getPassword = function () {
        return _super.prototype.getAsNullableString.call(this, "password");
    };
    CredentialParams.prototype.setPassword = function (value) {
        _super.prototype.put.call(this, "password", value);
    };
    CredentialParams.prototype.getAccessId = function () {
        return _super.prototype.getAsNullableString.call(this, "access_id") || _super.prototype.getAsNullableString.call(this, "client_id");
    };
    CredentialParams.prototype.setAccessId = function (value) {
        _super.prototype.put.call(this, "access_id", value);
    };
    CredentialParams.prototype.getAccessKey = function () {
        return _super.prototype.getAsNullableString.call(this, "access_key") || _super.prototype.getAsNullableString.call(this, "client_key");
    };
    CredentialParams.prototype.setAccessKey = function (value) {
        _super.prototype.put.call(this, "access_key", value);
    };
    CredentialParams.fromString = function (line) {
        var map = StringValueMap_1.StringValueMap.fromString(line);
        return new CredentialParams(map);
    };
    CredentialParams.manyFromConfig = function (config, configAsDefault) {
        if (configAsDefault === void 0) { configAsDefault = true; }
        var result = [];
        var credentials = config.getSection("credentials");
        if (credentials.getCount() > 0) {
            for (var section in credentials.getSectionNames()) {
                var credential = credentials.getSection(section);
                result.push(new CredentialParams(credential));
            }
        }
        else {
            var credential = config.getSection("credential");
            if (credential.getCount() > 0)
                result.push(new CredentialParams(credential));
            else if (configAsDefault)
                result.push(new CredentialParams(config));
        }
        return null;
    };
    CredentialParams.fromConfig = function (config, configAsDefault) {
        if (configAsDefault === void 0) { configAsDefault = true; }
        var connections = this.manyFromConfig(config, configAsDefault);
        return connections.length > 0 ? connections[0] : null;
    };
    return CredentialParams;
}(ConfigParams_1.ConfigParams));
exports.CredentialParams = CredentialParams;
//# sourceMappingURL=CredentialParams.js.map
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ConfigParams_1 = require("../config/ConfigParams");
var StringValueMap_1 = require("../data/StringValueMap");
var ConnectionParams = (function (_super) {
    __extends(ConnectionParams, _super);
    function ConnectionParams(values) {
        if (values === void 0) { values = null; }
        return _super.call(this, values) || this;
    }
    ConnectionParams.prototype.useDiscovery = function () {
        return _super.prototype.getAsNullableString.call(this, "discovery_key") != null;
    };
    ConnectionParams.prototype.getDiscoveryKey = function () {
        return _super.prototype.getAsString.call(this, "discovery_key");
    };
    ConnectionParams.prototype.setDiscoveryKey = function (value) {
        return _super.prototype.put.call(this, "discovery_key", value);
    };
    ConnectionParams.prototype.getProtocol = function (defaultValue) {
        if (defaultValue === void 0) { defaultValue = null; }
        return _super.prototype.getAsStringWithDefault.call(this, "protocol", defaultValue);
    };
    ConnectionParams.prototype.setProtocol = function (value) {
        return _super.prototype.put.call(this, "protocol", value);
    };
    ConnectionParams.prototype.getHost = function () {
        var host = _super.prototype.getAsNullableString.call(this, "host");
        host = host || _super.prototype.getAsNullableString.call(this, "ip");
        return host;
    };
    ConnectionParams.prototype.setHost = function (value) {
        return _super.prototype.put.call(this, "host", value);
    };
    ConnectionParams.prototype.getPort = function () {
        return _super.prototype.getAsInteger.call(this, "port");
    };
    ConnectionParams.prototype.setPort = function (value) {
        return _super.prototype.put.call(this, "port", value);
    };
    ConnectionParams.prototype.getUri = function () {
        return _super.prototype.getAsString.call(this, "uri");
    };
    ConnectionParams.prototype.setUri = function (value) {
        return _super.prototype.put.call(this, "uri", value);
    };
    ConnectionParams.fromString = function (line) {
        var map = StringValueMap_1.StringValueMap.fromString(line);
        return new ConnectionParams(map);
    };
    ConnectionParams.manyFromConfig = function (config, configAsDefault) {
        if (configAsDefault === void 0) { configAsDefault = true; }
        var result = [];
        var connections = config.getSection("connections");
        if (connections.length() > 0) {
            var connectionSections = connections.getSectionNames();
            for (var index = void 0; index < connectionSections.length; index++) {
                var connection = connections.getSection(connectionSections[index]);
                result.push(new ConnectionParams(connection));
            }
        }
        else {
            var connection = config.getSection("connection");
            if (connection.length() > 0)
                result.push(new ConnectionParams(connection));
            else
                result.push(new ConnectionParams(config));
        }
        return result;
    };
    ConnectionParams.fromConfig = function (config, configAsDefault) {
        if (configAsDefault === void 0) { configAsDefault = true; }
        var connections = this.manyFromConfig(config, configAsDefault);
        return connections.length > 0 ? connections[0] : null;
    };
    return ConnectionParams;
}(ConfigParams_1.ConfigParams));
exports.ConnectionParams = ConnectionParams;
//# sourceMappingURL=ConnectionParams.js.map
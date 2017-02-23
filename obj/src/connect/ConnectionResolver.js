"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var async = require('async');
var ConnectionParams_1 = require("./ConnectionParams");
var ConfigParams_1 = require("../config/ConfigParams");
var ConfigException_1 = require("../errors/ConfigException");
var Descriptor_1 = require("../refer/Descriptor");
var ConnectionResolver = (function () {
    function ConnectionResolver(config, references) {
        if (config === void 0) { config = null; }
        if (references === void 0) { references = null; }
        this._connections = [];
        this._references = null;
        if (config != null)
            this.configure(config);
        if (references != null)
            this.setReferences(references);
    }
    ConnectionResolver.prototype.setReferences = function (references) {
        this._references = references;
    };
    ConnectionResolver.prototype.configure = function (config, configAsDefault) {
        if (configAsDefault === void 0) { configAsDefault = true; }
        var connections = ConnectionParams_1.ConnectionParams.manyFromConfig(config, configAsDefault);
        (_a = this._connections).push.apply(_a, connections);
        var _a;
    };
    ConnectionResolver.prototype.getAll = function () {
        return this._connections;
    };
    ConnectionResolver.prototype.add = function (connection) {
        this._connections.push(connection);
    };
    ConnectionResolver.prototype.resolveInDiscovery = function (correlationId, connection, callback) {
        if (!connection.getUseDiscovery()) {
            callback(null, null);
            return;
        }
        var key = connection.getDiscoveryKey();
        if (this._references == null)
            return;
        var discoveries = this._references.getOptional(new Descriptor_1.Descriptor("*", "discovery", "*", "*", "*"));
        if (discoveries.length == 0)
            throw new ConfigException_1.ConfigException(correlationId, "CANNOT_RESOLVE", "Discovery wasn't found to make resolution");
        var firstResult = null;
        async.any(discoveries, function (discovery, cb) {
            var discoveryTyped = discovery;
            discoveryTyped.resolveOne(correlationId, key, function (err, result) {
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
    ConnectionResolver.prototype.resolve = function (correlationId, callback) {
        var _this = this;
        if (this._connections.length == 0) {
            if (callback)
                callback(null, null);
            return;
        }
        var connections = [];
        for (var index = 0; index < this._connections.length; index++) {
            if (!this._connections[index].getUseDiscovery()) {
                if (callback)
                    callback(null, this._connections[index]);
                return;
            }
            else {
                connections.push(this._connections[index]);
            }
        }
        if (connections.length == 0)
            return null;
        var firstResult = null;
        async.any(connections, function (connection, cb) {
            _this.resolveInDiscovery(correlationId, connection, function (err, result) {
                if (err || result == null) {
                    cb(err, false);
                }
                else {
                    firstResult = new ConnectionParams_1.ConnectionParams(ConfigParams_1.ConfigParams.mergeConfigs(connection, result));
                    cb(err, true);
                }
            });
        }, function (err) {
            if (callback)
                callback(err, firstResult);
        });
    };
    ConnectionResolver.prototype.resolveAllInDiscovery = function (correlationId, connection, callback) {
        var result = [];
        var key = connection.getDiscoveryKey();
        if (!connection.getUseDiscovery()) {
            callback(null, null);
            return;
        }
        if (this._references == null)
            return;
        var discoveries = this._references.getOptional(new Descriptor_1.Descriptor("*", "discovery", "*", "*", "*"));
        if (discoveries.length == 0)
            throw new ConfigException_1.ConfigException(correlationId, "CANNOT_RESOLVE", "Discovery wasn't found to make resolution");
        async.each(discoveries, function (discovery, cb) {
            var discoveryTyped = discovery;
            discoveryTyped.resolveAll(correlationId, key, function (err, result) {
                if (err || result == null) {
                    cb(err);
                }
                else {
                    result.push.apply(result, result);
                    cb(null);
                }
            });
        }, function (err) {
            if (callback)
                callback(err, result);
        });
    };
    ConnectionResolver.prototype.resolveAll = function (correlationId, callback) {
        var _this = this;
        var resolved = [];
        var toResolve = [];
        for (var index = 0; index < this._connections.length; index++) {
            if (this._connections[index].getUseDiscovery())
                toResolve.push(this._connections[index]);
            else
                resolved.push(this._connections[index]);
        }
        if (toResolve.length <= 0) {
            if (callback)
                callback(null, resolved);
            return;
        }
        async.each(toResolve, function (connection, cb) {
            _this.resolveAllInDiscovery(correlationId, connection, function (err, result) {
                if (err) {
                    cb(err);
                }
                else {
                    for (var index = 0; index < result.length; index++) {
                        var localResolvedConnection = new ConnectionParams_1.ConnectionParams(ConfigParams_1.ConfigParams.mergeConfigs(connection, result[index]));
                        resolved.push(localResolvedConnection);
                    }
                    cb(null);
                }
            });
        }, function (err) {
            if (callback)
                callback(err, resolved);
        });
    };
    ConnectionResolver.prototype.registerInDiscovery = function (correlationId, connection, callback) {
        if (!connection.getUseDiscovery()) {
            callback(null, false);
            return;
        }
        var key = connection.getDiscoveryKey();
        if (this._references == null) {
            callback(null, false);
            return;
        }
        var discoveries = this._references.getOptional(new Descriptor_1.Descriptor("*", "discovery", "*", "*", "*"));
        if (discoveries == null) {
            callback(null, false);
            return;
        }
        async.each(discoveries, function (discovery, cb) {
            discovery.register(correlationId, key, connection, function (err, result) {
                cb(err);
            });
        }, function (err) {
            if (callback)
                callback(err, err == null);
        });
    };
    ConnectionResolver.prototype.register = function (correlationId, connection, callback) {
        var _this = this;
        var result = this.registerInDiscovery(correlationId, connection, function (err) {
            if (result)
                _this._connections.push(connection);
            callback(err);
        });
    };
    return ConnectionResolver;
}());
exports.ConnectionResolver = ConnectionResolver;
//# sourceMappingURL=ConnectionResolver.js.map
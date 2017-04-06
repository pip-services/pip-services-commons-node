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
    ConnectionResolver.prototype.configure = function (config) {
        var connections = ConnectionParams_1.ConnectionParams.manyFromConfig(config);
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
        if (!connection.useDiscovery()) {
            callback(null, null);
            return;
        }
        var key = connection.getDiscoveryKey();
        if (this._references == null) {
            callback(null, null);
            return;
        }
        var discoveries = this._references.getOptional(new Descriptor_1.Descriptor("*", "discovery", "*", "*", "*"));
        if (discoveries.length == 0) {
            var err = new ConfigException_1.ConfigException(correlationId, "CANNOT_RESOLVE", "Discovery wasn't found to make resolution");
            callback(err, null);
            return;
        }
        var firstResult = null;
        async.any(discoveries, function (discovery, callback) {
            var discoveryTyped = discovery;
            discoveryTyped.resolveOne(correlationId, key, function (err, result) {
                if (err || result == null) {
                    callback(err, false);
                }
                else {
                    firstResult = result;
                    callback(err, true);
                }
            });
        }, function (err) {
            callback(err, firstResult);
        });
    };
    ConnectionResolver.prototype.resolve = function (correlationId, callback) {
        var _this = this;
        if (this._connections.length == 0) {
            callback(null, null);
            return;
        }
        var connections = [];
        for (var index = 0; index < this._connections.length; index++) {
            if (!this._connections[index].useDiscovery()) {
                callback(null, this._connections[index]);
                return;
            }
            else {
                connections.push(this._connections[index]);
            }
        }
        if (connections.length == 0) {
            callback(null, null);
            return;
        }
        var firstResult = null;
        async.any(connections, function (connection, callback) {
            _this.resolveInDiscovery(correlationId, connection, function (err, result) {
                if (err || result == null) {
                    callback(err, false);
                }
                else {
                    firstResult = new ConnectionParams_1.ConnectionParams(ConfigParams_1.ConfigParams.mergeConfigs(connection, result));
                    callback(err, true);
                }
            });
        }, function (err) {
            callback(err, firstResult);
        });
    };
    ConnectionResolver.prototype.resolveAllInDiscovery = function (correlationId, connection, callback) {
        var result = [];
        var key = connection.getDiscoveryKey();
        if (!connection.useDiscovery()) {
            callback(null, []);
            return;
        }
        if (this._references == null) {
            callback(null, []);
            return;
        }
        var discoveries = this._references.getOptional(new Descriptor_1.Descriptor("*", "discovery", "*", "*", "*"));
        if (discoveries.length == 0) {
            var err = new ConfigException_1.ConfigException(correlationId, "CANNOT_RESOLVE", "Discovery wasn't found to make resolution");
            callback(err, null);
            return;
        }
        async.each(discoveries, function (discovery, callback) {
            var discoveryTyped = discovery;
            discoveryTyped.resolveAll(correlationId, key, function (err, result) {
                if (err || result == null) {
                    callback(err);
                }
                else {
                    result.push.apply(result, result);
                    callback(null);
                }
            });
        }, function (err) {
            callback(err, result);
        });
    };
    ConnectionResolver.prototype.resolveAll = function (correlationId, callback) {
        var _this = this;
        var resolved = [];
        var toResolve = [];
        for (var index = 0; index < this._connections.length; index++) {
            if (this._connections[index].useDiscovery())
                toResolve.push(this._connections[index]);
            else
                resolved.push(this._connections[index]);
        }
        if (toResolve.length <= 0) {
            callback(null, resolved);
            return;
        }
        async.each(toResolve, function (connection, callback) {
            _this.resolveAllInDiscovery(correlationId, connection, function (err, result) {
                if (err) {
                    callback(err);
                }
                else {
                    for (var index = 0; index < result.length; index++) {
                        var localResolvedConnection = new ConnectionParams_1.ConnectionParams(ConfigParams_1.ConfigParams.mergeConfigs(connection, result[index]));
                        resolved.push(localResolvedConnection);
                    }
                    callback(null);
                }
            });
        }, function (err) {
            callback(err, resolved);
        });
    };
    ConnectionResolver.prototype.registerInDiscovery = function (correlationId, connection, callback) {
        if (!connection.useDiscovery()) {
            if (callback)
                callback(null, false);
            return;
        }
        var key = connection.getDiscoveryKey();
        if (this._references == null) {
            if (callback)
                callback(null, false);
            return;
        }
        var discoveries = this._references.getOptional(new Descriptor_1.Descriptor("*", "discovery", "*", "*", "*"));
        if (discoveries == null) {
            if (callback)
                callback(null, false);
            return;
        }
        async.each(discoveries, function (discovery, callback) {
            discovery.register(correlationId, key, connection, function (err, result) {
                callback(err);
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
            if (callback)
                callback(err);
        });
    };
    return ConnectionResolver;
}());
exports.ConnectionResolver = ConnectionResolver;
//# sourceMappingURL=ConnectionResolver.js.map
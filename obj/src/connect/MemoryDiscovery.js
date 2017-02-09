"use strict";
var async = require('async');
var NameResolver_1 = require("../config/NameResolver");
var ConnectionParams_1 = require("./ConnectionParams");
var Descriptor_1 = require("../refer/Descriptor");
var DiscoveryItem = (function () {
    function DiscoveryItem() {
    }
    return DiscoveryItem;
}());
var MemoryDiscovery = (function () {
    function MemoryDiscovery(name, config) {
        if (name === void 0) { name = null; }
        if (config === void 0) { config = null; }
        this._items = [];
        name = name;
        if (config != null)
            this.configure(config);
    }
    MemoryDiscovery.prototype.getName = function () {
        return this._name;
    };
    MemoryDiscovery.prototype.getDescriptor = function () {
        return new Descriptor_1.Descriptor("pip-services-commons", "discovery", "memory", name || "default", "1.0");
    };
    MemoryDiscovery.prototype.configure = function (config) {
        this._name = NameResolver_1.NameResolver.resolve(config, name);
        this.readConnections(config);
    };
    MemoryDiscovery.prototype.readConnections = function (connections) {
        this._items.splice(0, this._items.length);
        for (var key in connections.getKeyNames()) {
            var item = new DiscoveryItem();
            item.key = key;
            item.connection = ConnectionParams_1.ConnectionParams.fromString(connections.getAsNullableString(key));
            this._items.push(item);
        }
    };
    MemoryDiscovery.prototype.register = function (correlationId, key, connection, callback) {
        var item = new DiscoveryItem();
        item.key = key;
        item.connection = connection;
        this._items.push(item);
        if (callback)
            callback(null, null);
    };
    MemoryDiscovery.prototype.resolveOne = function (correlationId, key, callback) {
        var connection = null;
        for (var index = void 0; index < this._items.length; index++) {
            if (this._items[index].key == key && this._items[index].connection != null) {
                connection = this._items[index].connection;
                break;
            }
        }
        if (callback)
            callback(null, connection);
    };
    MemoryDiscovery.prototype.resolveAll = function (correlationId, key, callback) {
        var connections = [];
        for (var index = void 0; index < this._items.length; index++) {
            if (this._items[index].key == key && this._items[index].connection != null)
                connections.push(this._items[index].connection);
        }
        if (callback)
            callback(null, connections);
    };
    return MemoryDiscovery;
}());
exports.MemoryDiscovery = MemoryDiscovery;
//# sourceMappingURL=MemoryDiscovery.js.map
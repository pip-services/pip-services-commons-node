"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var async = require('async');
var ConnectionParams_1 = require("./ConnectionParams");
var DiscoveryItem = (function () {
    function DiscoveryItem() {
    }
    return DiscoveryItem;
}());
var MemoryDiscovery = (function () {
    function MemoryDiscovery(config) {
        if (config === void 0) { config = null; }
        this._items = [];
        if (config != null)
            this.configure(config);
    }
    MemoryDiscovery.prototype.configure = function (config) {
        this.readConnections(config);
    };
    MemoryDiscovery.prototype.readConnections = function (connections) {
        this._items = [];
        var keys = connections.getKeyNames();
        for (var index = 0; index < keys.length; index++) {
            var key = keys[index];
            var value = connections.getAsNullableString(key);
            var item = new DiscoveryItem();
            item.key = key;
            item.connection = ConnectionParams_1.ConnectionParams.fromString(value);
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
        for (var index = 0; index < this._items.length; index++) {
            var item = this._items[index];
            if (item.key == key && item.connection != null) {
                connection = item.connection;
                break;
            }
        }
        callback(null, connection);
    };
    MemoryDiscovery.prototype.resolveAll = function (correlationId, key, callback) {
        var connections = [];
        for (var index = 0; index < this._items.length; index++) {
            var item = this._items[index];
            if (item.key == key && item.connection != null)
                connections.push(item.connection);
        }
        callback(null, connections);
    };
    return MemoryDiscovery;
}());
exports.MemoryDiscovery = MemoryDiscovery;
//# sourceMappingURL=MemoryDiscovery.js.map
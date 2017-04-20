"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CacheEntry_1 = require("./CacheEntry");
var MemoryCache = (function () {
    /**
     * Creates instance of local in-memory cache component
     */
    function MemoryCache() {
        this._cache = {};
        this._count = 0;
        //milliseconds
        this._timeout = MemoryCache._defaultTimeout;
        this._maxSize = MemoryCache._defaultMaxSize;
    }
    /**
     * Sets component configuration parameters and switches component
     * to 'Configured' state. The configuration is only allowed once
     * right after creation. Attempts to perform reconfiguration will
     * cause an exception.
     * @param config the component configuration parameters.
     * @throws MicroserviceError when component is in illegal state
     * or configuration validation fails.
     */
    MemoryCache.prototype.configure = function (config) {
        this._timeout = config.getAsLongWithDefault("timeout", this._timeout);
        this._maxSize = config.getAsLongWithDefault("max_size", this._maxSize);
    };
    /**
     * Cleans up cache from obsolete values and shrinks the cache
     * to fit into allowed max size by dropping values that were not
     * accessed for a long time
     */
    MemoryCache.prototype.cleanup = function () {
        var oldest = null;
        var now = new Date().getTime();
        this._count = 0;
        // Cleanup obsolete entries and find the oldest
        for (var prop in this._cache) {
            var entry = this._cache[prop];
            // Remove obsolete entry
            if (entry.isExpired()) {
                delete this._cache[prop];
            }
            else {
                this._count++;
                if (oldest == null || oldest.getExpiration() > entry.getExpiration())
                    oldest = entry;
            }
        }
        // Remove the oldest if cache size exceeded maximum
        if (this._count > this._maxSize && oldest != null) {
            delete this._cache[oldest.getKey()];
            this._count--;
        }
    };
    /**
     * Retrieves a value from the cache by unique key.
     * It is recommended to use either string GUIDs like '123456789abc'
     * or unique natural keys prefixed with the functional group
     * like 'pip-services-storage:block-123'.
     * @param correlationId a unique id to correlate across all request flow.
     * @param key a unique key to locate value in the cache
     * @param callback a callback function to be called
     * with error or retrieved value. It returns <b>null</b>
     * when value was not found
     */
    MemoryCache.prototype.retrieve = function (correlationId, key, callback) {
        if (key == null) {
            var err = new Error('Key cannot be null');
            callback(err, null);
            return;
        }
        // Get entry from the cache
        var entry = this._cache[key];
        // Cache has nothing
        if (entry == null) {
            callback(null, null);
            return;
        }
        // Remove entry if expiration set and entry is expired
        if (this._timeout > 0 && entry.isExpired()) {
            delete this._cache[key];
            this._count--;
            callback(null, null);
            return;
        }
        callback(null, entry.getValue());
    };
    /**
     * Stores value identified by unique key in the cache.
     * Stale timeout is configured in the component options.
     * @param correlationId a unique id to correlate across all request flow.
     * @param key a unique key to locate value in the cache.
     * @param value a value to store.
     * @param callback a callback function to be called with error
     * or stored value
     */
    MemoryCache.prototype.store = function (correlationId, key, value, timeout, callback) {
        if (key == null) {
            var err = new Error('Key cannot be null');
            if (callback)
                callback(err, null);
            return;
        }
        // Get the entry
        var entry = this._cache[key];
        // Shortcut to remove entry from the cache
        if (value == null) {
            if (entry != null) {
                delete this._cache[key];
                this._count--;
            }
            if (callback)
                callback(null, value);
            return;
        }
        timeout = timeout != null && timeout > 0 ? timeout : this._timeout;
        // Update the entry
        if (entry) {
            entry.setValue(value, timeout);
        }
        else {
            entry = new CacheEntry_1.CacheEntry(key, value, timeout);
            this._cache[key] = entry;
            this._count++;
        }
        // Clean up the cache
        if (this._maxSize > 0 && this._count > this._maxSize)
            this.cleanup();
        if (callback)
            callback(null, value);
    };
    /**
     * Removes value stored in the cache.
     * @param correlationId a unique id to correlate across all request flow.
     * @param key a unique key to locate value in the cache.
     * @param callback a callback function to be called
     * with error or success
     */
    MemoryCache.prototype.remove = function (correlationId, key, callback) {
        if (key == null) {
            var err = new Error('Key cannot be null');
            if (callback)
                callback(err);
            return;
        }
        // Get the entry
        var entry = this._cache[key];
        // Remove entry from the cache
        if (entry != null) {
            delete this._cache[key];
            this._count--;
        }
        if (callback)
            callback(null);
    };
    return MemoryCache;
}());
//milliseconds
MemoryCache._defaultTimeout = 60000;
MemoryCache._defaultMaxSize = 1000;
exports.MemoryCache = MemoryCache;
//# sourceMappingURL=MemoryCache.js.map
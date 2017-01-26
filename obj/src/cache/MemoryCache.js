"use strict";
var CacheEntry_1 = require("./CacheEntry");
var Descriptor_1 = require("../refer/Descriptor");
var NameResolver_1 = require("../config/NameResolver");
var ApplicationException_1 = require("../errors/ApplicationException");
var MemoryCache = (function () {
    /**
     * Creates instance of local in-memory cache component
     */
    function MemoryCache(name, config) {
        if (name === void 0) { name = null; }
        if (config === void 0) { config = null; }
        this._cache = {};
        this._count = 0;
        this._name = name;
        this._timeout = MemoryCache._defaultTimeout;
        this._maxSize = MemoryCache._defaultMaxSize;
        if (config != null)
            this.configure(config);
    }
    Object.defineProperty(MemoryCache.prototype, "name", {
        get: function () {
            return this._name;
        },
        set: function (value) {
            this._name = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MemoryCache.prototype, "timeout", {
        get: function () {
            return this._timeout;
        },
        set: function (value) {
            this._timeout = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MemoryCache.prototype, "maxSize", {
        get: function () {
            return this._maxSize;
        },
        set: function (value) {
            this._maxSize = value;
        },
        enumerable: true,
        configurable: true
    });
    MemoryCache.prototype.getDescriptor = function () {
        return MemoryCache.Descriptor;
    };
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
        this.name = NameResolver_1.NameResolver.resolve(config, this.name);
        this.timeout = config.getAsLongWithDefault("timeout", this.timeout);
        this.maxSize = config.getAsLongWithDefault("max_size", this.maxSize);
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
            if (this._cache.hasOwnProperty(prop)) {
                var entry = this._cache[prop];
                // Remove obsolete entry
                if (entry.isExpired()) {
                    delete this._cache[prop];
                }
                else {
                    this._count++;
                    if (oldest == null || oldest.expiration > entry.expiration)
                        oldest = entry;
                }
            }
        }
        // Remove the oldest if cache size exceeded maximum
        if (this._count > this._maxSize && oldest != null) {
            delete this._cache[oldest.key];
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
        if (key == null)
            throw new ApplicationException_1.ApplicationException(null, correlationId, null, 'Key cannot be null');
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
        callback(null, entry.value);
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
        if (key == null)
            throw new ApplicationException_1.ApplicationException(null, correlationId, null, 'Key cannot be null');
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
        if (key == null)
            throw new ApplicationException_1.ApplicationException(null, correlationId, null, 'Key cannot be null');
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
/**
 * Default configuration for memory cache component
 */
//milliseconds
MemoryCache._defaultTimeout = 60000;
MemoryCache._defaultMaxSize = 1000;
/**
 * Unique descriptor for the Memory Cache component
 */
MemoryCache.Descriptor = new Descriptor_1.Descriptor("pip-services-common", "cache", "memory", "default", "1.0");
exports.MemoryCache = MemoryCache;
//# sourceMappingURL=MemoryCache.js.map
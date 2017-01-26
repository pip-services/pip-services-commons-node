"use strict";
var NameResolver_1 = require("./NameResolver");
var CachedConfigReader = (function () {
    function CachedConfigReader(name) {
        if (name === void 0) { name = null; }
        this._lastRead = 0;
        this._name = null;
        this._timeout = 60000;
        this._config = null;
        this._name = name;
    }
    Object.defineProperty(CachedConfigReader.prototype, "name", {
        get: function () {
            return this._name;
        },
        set: function (name) {
            this._name = name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CachedConfigReader.prototype, "timeout", {
        get: function () {
            return this._timeout;
        },
        set: function (timeout) {
            this._timeout = timeout;
        },
        enumerable: true,
        configurable: true
    });
    CachedConfigReader.prototype.configure = function (config) {
        this._name = NameResolver_1.NameResolver.resolve(config, this._name);
        this._timeout = config.getAsLongWithDefault("timeout", this._timeout);
    };
    CachedConfigReader.prototype.readConfig = function (correlationId) {
        var timestamp = new Date().getTime();
        if (this._config != null && timestamp < this._lastRead + this._timeout) {
            return this._config;
        }
        this._config = this.performReadConfig(correlationId);
        this._lastRead = timestamp;
        return this._config;
    };
    CachedConfigReader.prototype.readConfigSection = function (correlationId, section) {
        var config = this.readConfig(correlationId);
        return config != null ? config.getSection(section) : null;
    };
    return CachedConfigReader;
}());
exports.CachedConfigReader = CachedConfigReader;
//# sourceMappingURL=CachedConfigReader.js.map
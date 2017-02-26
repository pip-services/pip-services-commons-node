"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Todo: Deprecate name
var CachedConfigReader = (function () {
    function CachedConfigReader() {
        this._lastRead = 0;
        this._timeout = 60000;
        this._config = null;
    }
    CachedConfigReader.prototype.getTimeout = function () {
        return this._timeout;
    };
    CachedConfigReader.prototype.setTimeout = function (timeout) {
        this._timeout = timeout;
    };
    CachedConfigReader.prototype.configure = function (config) {
        this._timeout = config.getAsLongWithDefault("timeout", this._timeout);
    };
    CachedConfigReader.prototype.readConfig = function (correlationId) {
        var timestamp = new Date().getTime();
        if (this._config != null && timestamp < this._lastRead + this._timeout)
            return this._config;
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
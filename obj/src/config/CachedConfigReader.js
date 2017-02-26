"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
    CachedConfigReader.prototype.readConfig = function (correlationId, callback) {
        var _this = this;
        var timestamp = new Date().getTime();
        if (this._config != null && timestamp < this._lastRead + this._timeout) {
            callback(null, this._config);
            return;
        }
        this.performReadConfig(correlationId, function (err, config) {
            if (err)
                callback(err, null);
            else {
                _this._config = config;
                _this._lastRead = timestamp;
                callback(null, config);
            }
        });
    };
    CachedConfigReader.prototype.readConfigSection = function (correlationId, section, callback) {
        this.readConfig(correlationId, function (err, config) {
            if (err)
                callback(err, null);
            else {
                config = config != null ? config.getSection(section) : null;
                callback(null, config);
            }
        });
    };
    return CachedConfigReader;
}());
exports.CachedConfigReader = CachedConfigReader;
//# sourceMappingURL=CachedConfigReader.js.map
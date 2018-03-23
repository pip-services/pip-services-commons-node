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
var ErrorDescriptionFactory_1 = require("../errors/ErrorDescriptionFactory");
var Logger_1 = require("./Logger");
var LogLevelConverter_1 = require("./LogLevelConverter");
var CachedLogger = /** @class */ (function (_super) {
    __extends(CachedLogger, _super);
    function CachedLogger() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._cache = [];
        _this._updated = false;
        _this._lastDumpTime = new Date().getTime();
        _this._maxCacheSize = 100;
        _this._interval = 10000;
        return _this;
    }
    CachedLogger.prototype.write = function (level, correlationId, ex, message) {
        var error = ex != null ? ErrorDescriptionFactory_1.ErrorDescriptionFactory.create(ex) : null;
        var logMessage = {
            time: new Date(),
            level: LogLevelConverter_1.LogLevelConverter.toString(level),
            source: this._source,
            correlation_id: correlationId,
            error: error,
            message: message
        };
        this._cache.push(logMessage);
        this.update();
    };
    CachedLogger.prototype.configure = function (config) {
        _super.prototype.configure.call(this, config);
        this._interval = config.getAsLongWithDefault("options.interval", this._interval);
        this._maxCacheSize = config.getAsIntegerWithDefault("options.max_cache_size", this._maxCacheSize);
    };
    CachedLogger.prototype.clear = function () {
        this._cache = [];
        this._updated = false;
    };
    CachedLogger.prototype.dump = function () {
        var _this = this;
        if (this._updated) {
            if (!this._updated)
                return;
            var messages_1 = this._cache;
            this._cache = [];
            this.save(messages_1, function (err) {
                if (err) {
                    // Adds messages back to the cache
                    messages_1.push.apply(messages_1, _this._cache);
                    _this._cache = messages_1;
                    // Truncate cache
                    var deleteCount = _this._cache.length - _this._maxCacheSize;
                    if (deleteCount > 0)
                        _this._cache.splice(0, deleteCount);
                }
            });
            this._updated = false;
            this._lastDumpTime = new Date().getTime();
        }
    };
    CachedLogger.prototype.update = function () {
        this._updated = true;
        var now = new Date().getTime();
        if (now > this._lastDumpTime + this._interval) {
            try {
                this.dump();
            }
            catch (ex) {
                // Todo: decide what to do
            }
        }
    };
    return CachedLogger;
}(Logger_1.Logger));
exports.CachedLogger = CachedLogger;
//# sourceMappingURL=CachedLogger.js.map
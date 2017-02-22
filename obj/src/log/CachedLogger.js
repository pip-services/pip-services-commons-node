"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var os = require('os');
var ErrorDescriptionFactory_1 = require("../errors/ErrorDescriptionFactory");
var Logger_1 = require("./Logger");
var LogMessage_1 = require("./LogMessage");
var CachedLogger = (function (_super) {
    __extends(CachedLogger, _super);
    function CachedLogger() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._cache = [];
        _this._updated = false;
        _this._lastDumpTime = new Date().getTime();
        _this._interval = CachedLogger._defaultInterval;
        return _this;
    }
    CachedLogger.prototype.write = function (level, correlationId, ex, message) {
        var error = ex != null ? ErrorDescriptionFactory_1.ErrorDescriptionFactory.create(ex) : null;
        var source = os.hostname(); // Todo: add current module name name
        var logMessage = new LogMessage_1.LogMessage(level, source, correlationId, error, message);
        this._cache.push(logMessage);
        this.update();
    };
    CachedLogger.prototype.configure = function (config) {
        this._interval = config.getAsLongWithDefault("interval", this._interval);
    };
    CachedLogger.prototype.clear = function () {
        this._cache = [];
        this._updated = false;
    };
    CachedLogger.prototype.dump = function () {
        if (this._updated) {
            if (!this._updated)
                return;
            var messages = this._cache;
            this._cache = [];
            this.save(messages);
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
            }
        }
    };
    return CachedLogger;
}(Logger_1.Logger));
CachedLogger._defaultInterval = 60000;
exports.CachedLogger = CachedLogger;
//# sourceMappingURL=CachedLogger.js.map
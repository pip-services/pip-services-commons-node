"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Logger_1 = require("./Logger");
var Descriptor_1 = require("../refer/Descriptor");
var CompositeLogger = (function (_super) {
    __extends(CompositeLogger, _super);
    function CompositeLogger(references) {
        if (references === void 0) { references = null; }
        var _this = _super.call(this) || this;
        _this._descriptor = new Descriptor_1.Descriptor("pip-services-commons", "logger", "composite", "default", "1.0");
        _this._loggers = [];
        _this.setReferences(references);
        return _this;
    }
    CompositeLogger.prototype.getDescriptor = function () {
        return this._descriptor;
    };
    CompositeLogger.prototype.setReferences = function (references) {
        var loggers = references.getOptional(new Descriptor_1.Descriptor(null, "logger", null, null, null));
        // there is no interface type checking in ts, so add all loggers without checking if they implement ILogger
        (_a = this._loggers).push.apply(_a, loggers);
        var _a;
    };
    CompositeLogger.prototype.write = function (level, correlationId, error, message) {
        for (var index = 0; index < this._loggers.length; index++) {
            this._loggers[index].log(level, correlationId, error, message);
        }
    };
    return CompositeLogger;
}(Logger_1.Logger));
exports.CompositeLogger = CompositeLogger;
//# sourceMappingURL=CompositeLogger.js.map
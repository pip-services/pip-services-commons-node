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
var Logger_1 = require("./Logger");
var Descriptor_1 = require("../refer/Descriptor");
var CompositeLogger = /** @class */ (function (_super) {
    __extends(CompositeLogger, _super);
    function CompositeLogger(references) {
        if (references === void 0) { references = null; }
        var _this = _super.call(this) || this;
        _this._loggers = [];
        if (references)
            _this.setReferences(references);
        return _this;
    }
    CompositeLogger.prototype.setReferences = function (references) {
        _super.prototype.setReferences.call(this, references);
        var loggers = references.getOptional(new Descriptor_1.Descriptor(null, "logger", null, null, null));
        for (var i = 0; i < loggers.length; i++) {
            var logger = loggers[i];
            // Todo: This doesn't work in TS. Redo...
            if (logger != this)
                this._loggers.push(logger);
        }
    };
    CompositeLogger.prototype.write = function (level, correlationId, error, message) {
        for (var index = 0; index < this._loggers.length; index++)
            this._loggers[index].log(level, correlationId, error, message);
    };
    CompositeLogger.descriptor = new Descriptor_1.Descriptor("pip-services-commons", "logger", "composite", "default", "1.0");
    return CompositeLogger;
}(Logger_1.Logger));
exports.CompositeLogger = CompositeLogger;
//# sourceMappingURL=CompositeLogger.js.map
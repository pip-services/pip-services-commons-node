"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Descriptor_1 = require("../refer/Descriptor");
var StringConverter_1 = require("../convert/StringConverter");
var LogLevel_1 = require("./LogLevel");
var Logger_1 = require("./Logger");
var ConsoleLogger = (function (_super) {
    __extends(ConsoleLogger, _super);
    function ConsoleLogger() {
        return _super.call(this) || this;
    }
    ConsoleLogger.prototype.getDescriptor = function () {
        return ConsoleLogger.descriptor;
    };
    ConsoleLogger.prototype.write = function (level, correlationId, ex, message) {
        if (this.getLevel() < level)
            return;
        var result = '[';
        result += correlationId != null ? correlationId : "---";
        result += ':';
        result += level.toString();
        result += ':';
        result += StringConverter_1.StringConverter.toString(new Date());
        result += "] ";
        result += message;
        if (ex != null) {
            if (message.length == 0)
                result += "Error: ";
            else
                result += ": ";
            result += this.composeError(ex);
        }
        if (level == LogLevel_1.LogLevel.Fatal || level == LogLevel_1.LogLevel.Error || level == LogLevel_1.LogLevel.Warn)
            console.error(result);
        else
            console.log(result);
    };
    return ConsoleLogger;
}(Logger_1.Logger));
ConsoleLogger.descriptor = new Descriptor_1.Descriptor("pip-services-commons", "logger", "console", "default", "1.0");
exports.ConsoleLogger = ConsoleLogger;
//# sourceMappingURL=ConsoleLogger.js.map
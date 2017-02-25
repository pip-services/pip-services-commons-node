"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LogMessage = (function () {
    function LogMessage(level, source, correlationId, error, message) {
        this.time = new Date();
        this.level = level;
        this.source = source;
        this.correlationId = correlationId;
        this.error = error;
        this.message = message;
    }
    return LogMessage;
}());
exports.LogMessage = LogMessage;
//# sourceMappingURL=LogMessage.js.map
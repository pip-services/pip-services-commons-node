"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var InterceptedCommand = /** @class */ (function () {
    function InterceptedCommand(intercepter, next) {
        this._intercepter = intercepter;
        this._next = next;
    }
    InterceptedCommand.prototype.getName = function () {
        return this._intercepter.getName(this._next);
    };
    InterceptedCommand.prototype.execute = function (correlationId, args, callback) {
        this._intercepter.execute(correlationId, this._next, args, callback);
    };
    InterceptedCommand.prototype.validate = function (args) {
        return this._intercepter.validate(this._next, args);
    };
    return InterceptedCommand;
}());
exports.InterceptedCommand = InterceptedCommand;
//# sourceMappingURL=InterceptedCommand.js.map
"use strict";
var InterceptedCommand = (function () {
    function InterceptedCommand(intercepter, next) {
        this._intercepter = intercepter;
        this._next = next;
    }
    Object.defineProperty(InterceptedCommand.prototype, "name", {
        get: function () {
            return this._intercepter.getName(this._next);
        },
        enumerable: true,
        configurable: true
    });
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
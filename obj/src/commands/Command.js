"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require('lodash');
var InvocationException_1 = require("../errors/InvocationException");
var Command = /** @class */ (function () {
    function Command(name, schema, func) {
        if (!name)
            throw new Error("Name cannot be null");
        if (!func)
            throw new Error("Function cannot be null");
        this._name = name;
        this._schema = schema;
        if (!_.isFunction(func))
            this._function = func.execute;
        else
            this._function = func;
        if (!_.isFunction(this._function))
            throw new Error("Function doesn't have function type");
    }
    Command.prototype.getName = function () {
        return this._name;
    };
    Command.prototype.execute = function (correlationId, args, callback) {
        if (this._schema) {
            try {
                this._schema.validateAndThrowException(correlationId, args);
            }
            catch (ex) {
                callback(ex, null);
                return;
            }
        }
        try {
            this._function(correlationId, args, callback);
        }
        catch (ex) {
            var err = new InvocationException_1.InvocationException(correlationId, "EXEC_FAILED", "Execution " + this.getName() + " failed: " + ex).withDetails("command", this.getName()).wrap(ex);
            callback(err, null);
        }
    };
    Command.prototype.validate = function (args) {
        if (this._schema)
            return this._schema.validate(args);
        return [];
    };
    return Command;
}());
exports.Command = Command;
//# sourceMappingURL=Command.js.map
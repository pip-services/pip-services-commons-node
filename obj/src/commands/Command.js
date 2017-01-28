"use strict";
var InvocationException_1 = require("../errors/InvocationException");
var Command = (function () {
    function Command(name, schema, func) {
        if (!name)
            throw new Error("Name cannot be null");
        if (!func)
            throw new Error("Function cannot be null");
        this._name = name;
        this._schema = schema;
        this._function = func;
    }
    Command.prototype.getName = function () {
        return this._name;
    };
    Command.prototype.execute = function (correlationId, args, callback) {
        if (this._schema)
            this._schema.validateAndThrowException(correlationId, args);
        try {
            this._function.execute(correlationId, args, callback);
        }
        catch (ex) {
            var err = new InvocationException_1.InvocationException(correlationId, "EXEC_FAILED", "Execution " + this.getName() + " failed: " + ex).withDetails("command", this.getName()).wrap(ex);
            if (callback)
                callback(err, null);
            else
                throw err;
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
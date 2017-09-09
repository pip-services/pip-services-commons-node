"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ConfigException_1 = require("../errors/ConfigException");
var TypeDescriptor = /** @class */ (function () {
    function TypeDescriptor(name, library) {
        this._name = name;
        this._library = library;
    }
    TypeDescriptor.prototype.getName = function () {
        return this._name;
    };
    TypeDescriptor.prototype.getLibrary = function () {
        return this._library;
    };
    TypeDescriptor.prototype.equals = function (obj) {
        if (obj instanceof TypeDescriptor) {
            var otherType = obj;
            if (this.getName() == null || otherType.getName() == null)
                return false;
            if (this.getName() != otherType.getName())
                return false;
            if (this.getLibrary() == null || otherType.getLibrary() == null
                || this.getLibrary() == otherType.getLibrary())
                return true;
        }
        return false;
    };
    TypeDescriptor.prototype.toString = function () {
        var builder = '' + this._name;
        if (this._library != null)
            builder += ',' + this._library;
        return builder.toString();
    };
    TypeDescriptor.fromString = function (value) {
        if (value == null || value.length == 0)
            return null;
        var tokens = value.split(",");
        if (tokens.length == 1) {
            return new TypeDescriptor(tokens[0].trim(), null);
        }
        else if (tokens.length == 2) {
            return new TypeDescriptor(tokens[0].trim(), tokens[1].trim());
        }
        else {
            throw new ConfigException_1.ConfigException(null, "BAD_DESCRIPTOR", "Type descriptor " + value + " is in wrong format").withDetails("descriptor", value);
        }
    };
    return TypeDescriptor;
}());
exports.TypeDescriptor = TypeDescriptor;
//# sourceMappingURL=TypeDescriptor.js.map
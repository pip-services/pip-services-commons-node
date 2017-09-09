"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require('lodash');
var path = require("path");
var NotFoundException_1 = require("../errors/NotFoundException");
var TypeCode_1 = require("../convert/TypeCode");
var TypeConverter_1 = require("../convert/TypeConverter");
var TypeReflector = /** @class */ (function () {
    function TypeReflector() {
    }
    TypeReflector.getType = function (name, library) {
        try {
            if (!library)
                library = name;
            var absPath = library;
            if (_.startsWith(absPath, '.'))
                absPath = path.resolve(absPath);
            // Load module
            var type = require(absPath);
            if (type == null)
                return null;
            // Get exported type by name
            if (name != null && name.length > 0)
                type = type[name];
            return type;
        }
        catch (ex) {
            return null;
        }
    };
    TypeReflector.getTypeByDescriptor = function (type) {
        if (type == null)
            throw new Error("Type descriptor cannot be null");
        return TypeReflector.getType(type.getName(), type.getLibrary());
    };
    TypeReflector.createInstanceByType = function (type) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (type == null)
            throw new Error("Type constructor cannot be null");
        if (!_.isFunction(type))
            throw new Error("Type contructor has to be a function");
        return new (type.bind.apply(type, [void 0].concat(args)))();
    };
    TypeReflector.createInstance = function (name, library) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        var type = TypeReflector.getType(name, library);
        if (type == null)
            throw new NotFoundException_1.NotFoundException(null, "TYPE_NOT_FOUND", "Type " + name + "," + library + " was not found")
                .withDetails("type", name).withDetails("library", library);
        return TypeReflector.createInstanceByType.apply(TypeReflector, [type].concat(args));
    };
    TypeReflector.createInstanceByDescriptor = function (type) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (type == null)
            throw new Error("Type descriptor cannot be null");
        return TypeReflector.createInstance.apply(TypeReflector, [type.getName(), type.getLibrary()].concat(args));
    };
    TypeReflector.isPrimitive = function (value) {
        var typeCode = TypeConverter_1.TypeConverter.toTypeCode(value);
        return typeCode == TypeCode_1.TypeCode.String || typeCode == TypeCode_1.TypeCode.Enum
            || typeCode == TypeCode_1.TypeCode.Boolean || typeCode == TypeCode_1.TypeCode.Integer
            || typeCode == TypeCode_1.TypeCode.Long || typeCode == TypeCode_1.TypeCode.Float
            || typeCode == TypeCode_1.TypeCode.Double || typeCode == TypeCode_1.TypeCode.DateTime
            || typeCode == TypeCode_1.TypeCode.Duration;
    };
    return TypeReflector;
}());
exports.TypeReflector = TypeReflector;
//# sourceMappingURL=TypeReflector.js.map
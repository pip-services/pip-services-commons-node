"use strict";
var _ = require('lodash');
var NotFoundException_1 = require("../errors/NotFoundException");
var TypeReflector = (function () {
    function TypeReflector() {
    }
    TypeReflector.getType = function (name, library) {
        try {
            // Load module
            var type = require(library);
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
        var typeConstructor = function () {
            type.apply(this, args);
        };
        return new typeConstructor();
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
        return TypeReflector.createInstanceByType(type, args);
    };
    TypeReflector.createInstanceByDescriptor = function (type) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (type == null)
            throw new Error("Type descriptor cannot be null");
        return TypeReflector.createInstance(type.getName(), type.getLibrary(), args);
    };
    return TypeReflector;
}());
exports.TypeReflector = TypeReflector;
//# sourceMappingURL=TypeReflector.js.map
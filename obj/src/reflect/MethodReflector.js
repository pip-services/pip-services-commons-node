"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require('lodash');
var MethodReflector = /** @class */ (function () {
    function MethodReflector() {
    }
    MethodReflector.matchMethod = function (methodName, methodValue, expectedName) {
        if (!_.isFunction(methodValue))
            return false;
        if (_.startsWith(methodName, '_'))
            return false;
        if (expectedName == null)
            return true;
        return methodName.toLowerCase() == expectedName;
    };
    MethodReflector.hasMethod = function (obj, name) {
        if (obj == null)
            throw new Error("Object cannot be null");
        if (name == null)
            throw new Error("Method name cannot be null");
        name = name.toLowerCase();
        for (var method in obj) {
            var methodValue = obj[method];
            if (MethodReflector.matchMethod(method, methodValue, name))
                return true;
        }
        return false;
    };
    MethodReflector.invokeMethod = function (obj, name) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        if (obj == null)
            throw new Error("Object cannot be null");
        if (name == null)
            throw new Error("Method name cannot be null");
        name = name.toLowerCase();
        for (var method in obj) {
            var methodValue = obj[method];
            try {
                if (MethodReflector.matchMethod(method, methodValue, name))
                    return methodValue.apply(obj, args);
            }
            catch (ex) {
                // Ignore exceptions
            }
        }
        return null;
    };
    MethodReflector.getMethodNames = function (obj) {
        var methods = [];
        for (var method in obj) {
            var methodValue = obj[method];
            if (MethodReflector.matchMethod(method, methodValue, null))
                methods.push(method);
        }
        return methods;
    };
    return MethodReflector;
}());
exports.MethodReflector = MethodReflector;
//# sourceMappingURL=MethodReflector.js.map
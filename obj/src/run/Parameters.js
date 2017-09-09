"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var AnyValueMap_1 = require("../data/AnyValueMap");
var JsonConverter_1 = require("../convert/JsonConverter");
var RecursiveObjectReader_1 = require("../reflect/RecursiveObjectReader");
var RecursiveObjectWriter_1 = require("../reflect/RecursiveObjectWriter");
var ObjectWriter_1 = require("../reflect/ObjectWriter");
/**
 * Parameters represent hierarchical map that uses simple keys and stores complex objects.
 * It allows hierarchical access to stored data using dot-notation.
 *
 * All keys stored in the map are case-insensitive.
 */
var Parameters = /** @class */ (function (_super) {
    __extends(Parameters, _super);
    function Parameters(map) {
        if (map === void 0) { map = null; }
        return _super.call(this, map) || this;
    }
    Parameters.prototype.get = function (key) {
        if (key == null)
            return null;
        else if (key.indexOf('.') > 0)
            return RecursiveObjectReader_1.RecursiveObjectReader.getProperty(this, key);
        else
            return _super.prototype.get.call(this, key);
    };
    Parameters.prototype.put = function (key, value) {
        if (key == null)
            return null;
        else if (key.indexOf('.') > 0)
            RecursiveObjectWriter_1.RecursiveObjectWriter.setProperty(this, key, value);
        else
            _super.prototype.put.call(this, key, value);
        return value;
    };
    Parameters.prototype.getAsNullableParameters = function (key) {
        var value = this.getAsNullableMap(key);
        return value != null ? new Parameters(value) : null;
    };
    Parameters.prototype.getAsParameters = function (key) {
        var value = this.getAsMap(key);
        return new Parameters(value);
    };
    Parameters.prototype.getAsParametersWithDefault = function (key, defaultValue) {
        var result = this.getAsNullableParameters(key);
        return result != null ? result : defaultValue;
    };
    Parameters.prototype.containsKey = function (key) {
        return RecursiveObjectReader_1.RecursiveObjectReader.hasProperty(this, key.toString());
    };
    Parameters.prototype.override = function (parameters, recursive) {
        if (recursive === void 0) { recursive = false; }
        var result = new Parameters();
        if (recursive) {
            RecursiveObjectWriter_1.RecursiveObjectWriter.copyProperties(result, this);
            RecursiveObjectWriter_1.RecursiveObjectWriter.copyProperties(result, parameters);
        }
        else {
            ObjectWriter_1.ObjectWriter.setProperties(result, this);
            ObjectWriter_1.ObjectWriter.setProperties(result, parameters);
        }
        return result;
    };
    Parameters.prototype.setDefaults = function (defaultParameters, recursive) {
        if (recursive === void 0) { recursive = false; }
        var result = new Parameters();
        if (recursive) {
            RecursiveObjectWriter_1.RecursiveObjectWriter.copyProperties(result, defaultParameters);
            RecursiveObjectWriter_1.RecursiveObjectWriter.copyProperties(result, this);
        }
        else {
            ObjectWriter_1.ObjectWriter.setProperties(result, defaultParameters);
            ObjectWriter_1.ObjectWriter.setProperties(result, this);
        }
        return result;
    };
    Parameters.prototype.assignTo = function (value) {
        if (value == null)
            return;
        RecursiveObjectWriter_1.RecursiveObjectWriter.copyProperties(value, this);
    };
    Parameters.prototype.pick = function () {
        var paths = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            paths[_i] = arguments[_i];
        }
        var result = new Parameters();
        for (var index = 0; index < paths.length; index++) {
            var path = paths[index];
            if (this.containsKey(path))
                result.put(path, this.get(path));
        }
        return result;
    };
    Parameters.prototype.omit = function () {
        var paths = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            paths[_i] = arguments[_i];
        }
        var result = new Parameters(this);
        for (var index = 0; index < paths.length; index++) {
            var path = paths[index];
            result.remove(path);
        }
        return result;
    };
    Parameters.prototype.toJson = function () {
        return JsonConverter_1.JsonConverter.toJson(this);
    };
    Parameters.fromValue = function (value) {
        return new Parameters(value);
    };
    Parameters.fromTuples = function () {
        var tuples = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            tuples[_i] = arguments[_i];
        }
        var map = AnyValueMap_1.AnyValueMap.fromTuples.apply(AnyValueMap_1.AnyValueMap, tuples);
        return new Parameters(map);
    };
    Parameters.mergeParams = function () {
        var parameters = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            parameters[_i] = arguments[_i];
        }
        var map = AnyValueMap_1.AnyValueMap.fromMaps.apply(AnyValueMap_1.AnyValueMap, parameters);
        return new Parameters(map);
    };
    Parameters.fromJson = function (json) {
        var map = JsonConverter_1.JsonConverter.toNullableMap(json);
        return new Parameters(map);
    };
    Parameters.fromConfig = function (config) {
        var result = new Parameters();
        if (config == null)
            return result;
        for (var key in config) {
            if (config.hasOwnProperty(key))
                result.put(key, config[key]);
        }
        return result;
    };
    return Parameters;
}(AnyValueMap_1.AnyValueMap));
exports.Parameters = Parameters;
//# sourceMappingURL=Parameters.js.map
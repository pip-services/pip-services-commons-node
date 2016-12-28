"use strict";
var TypeConverter_1 = require("./TypeConverter");
var MapConverter_1 = require("./MapConverter");
var JsonConverter = (function () {
    function JsonConverter() {
    }
    JsonConverter.fromJson = function (type, value) {
        if (value == null)
            return null;
        var temp = JSON.parse(value);
        return TypeConverter_1.TypeConverter.toType(type, temp);
    };
    JsonConverter.toJson = function (value) {
        if (value == null)
            return null;
        return JSON.stringify(value);
    };
    JsonConverter.toNullableMap = function (value) {
        if (value == null)
            return null;
        try {
            var map = JSON.parse(value);
            return MapConverter_1.MapConverter.toNullableMap(map);
        }
        catch (Exception) {
            return null;
        }
    };
    JsonConverter.toMap = function (value) {
        var result = JsonConverter.toNullableMap(value);
        return result != null ? result : {};
    };
    JsonConverter.toMapWithDefault = function (value, defaultValue) {
        var result = JsonConverter.toNullableMap(value);
        return result != null ? result : defaultValue;
    };
    return JsonConverter;
}());
exports.JsonConverter = JsonConverter;
//# sourceMappingURL=JsonConverter.js.map
"use strict";
var _ = require('lodash');
var MapConverter = (function () {
    function MapConverter() {
    }
    MapConverter.toNullableMap = function (value) {
        if (value == null)
            return null;
        else if (_.isArray(value)) {
            var map = {};
            for (var i = 0; i < value.length; i++)
                map[i.toString()] = value[i];
            return map;
        }
        else
            return _.isObject(value) ? value : null;
    };
    MapConverter.toMap = function (value) {
        var map = MapConverter.toNullableMap(value);
        return map != null ? map : {};
    };
    MapConverter.toMapWithDefault = function (value, defaultValue) {
        return MapConverter.toNullableMap(value) || defaultValue;
    };
    return MapConverter;
}());
exports.MapConverter = MapConverter;
//# sourceMappingURL=MapConverter.js.map
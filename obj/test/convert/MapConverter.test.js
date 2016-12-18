"use strict";
var assert = require('chai').assert;
var MapConverter_1 = require("../../src/convert/MapConverter");
suite('MapConverter', function () {
    test('To Nullable Map', function () {
        assert.isNull(MapConverter_1.MapConverter.toNullableMap(null));
        assert.isNull(MapConverter_1.MapConverter.toNullableMap(5));
        var array = [1, 2];
        var map = MapConverter_1.MapConverter.toNullableMap(array);
        assert.isDefined(map);
        assert.equal(1, map["0"]);
        assert.equal(2, map["1"]);
        var obj = { field1: "abc", field2: 123 };
        map = MapConverter_1.MapConverter.toNullableMap(obj);
        assert.isDefined(map);
        assert.equal("abc", map.field1);
        assert.equal(123, map.field2);
        assert.equal(null, MapConverter_1.MapConverter.toNullableMap(null));
        assert.equal(null, MapConverter_1.MapConverter.toNullableMap('xyz'));
    });
});
//# sourceMappingURL=MapConverter.test.js.map
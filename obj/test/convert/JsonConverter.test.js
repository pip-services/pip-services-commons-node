"use strict";
var assert = require('chai').assert;
var TypeCode_1 = require("../../src/convert/TypeCode");
var DateTimeConverter_1 = require("../../src/convert/DateTimeConverter");
var JsonConverter_1 = require("../../src/convert/JsonConverter");
suite('JsonConverter', function () {
    test('To Json', function () {
        assert.isNull(JsonConverter_1.JsonConverter.toJson(null));
        assert.equal("123", JsonConverter_1.JsonConverter.toJson(123));
        assert.equal("\"ABC\"", JsonConverter_1.JsonConverter.toJson("ABC"));
        var filter = { "Key1": 123, "Key2": "ABC" };
        var jsonFilter = JsonConverter_1.JsonConverter.toJson(filter);
        assert.equal("{\"Key1\":123,\"Key2\":\"ABC\"}", jsonFilter);
        var array = [123, "ABC"];
        var jsonArray = JsonConverter_1.JsonConverter.toJson(array);
        assert.equal("[123,\"ABC\"]", jsonArray);
        var date = DateTimeConverter_1.DateTimeConverter.toDateTime("1975-04-08T00:00:00.000Z");
        var jsonDate = JsonConverter_1.JsonConverter.toJson(date);
        assert.equal("\"1975-04-08T00:00:00.000Z\"", jsonDate);
    });
    test('From Json', function () {
        assert.isNull(JsonConverter_1.JsonConverter.toJson(null));
        assert.equal(123, JsonConverter_1.JsonConverter.fromJson(TypeCode_1.TypeCode.Integer, "123"));
        assert.equal("ABC", JsonConverter_1.JsonConverter.fromJson(TypeCode_1.TypeCode.String, "\"ABC\""));
        var filter = JsonConverter_1.JsonConverter.fromJson(null, "{\"Key2\":\"ABC\",\"Key1\":\"123\"}");
        assert.isObject(filter);
        var array = JsonConverter_1.JsonConverter.fromJson(TypeCode_1.TypeCode.Array, "[123,\"ABC\"]");
        assert.equal(2, array.length);
        var date = DateTimeConverter_1.DateTimeConverter.toDateTime("1975-04-08T00:00:00.000Z");
        var jsonDate = JsonConverter_1.JsonConverter.fromJson(TypeCode_1.TypeCode.DateTime, "\"1975-04-08T00:00Z\"");
        assert.equal(date.getTime(), jsonDate.getTime());
    });
    test('To Json Map', function () {
        // Handling simple objects
        var value = "{ \"value1\":123, \"value2\":234 }";
        var result = JsonConverter_1.JsonConverter.toNullableMap(value);
        assert.equal(123, result.value1);
        assert.equal(234, result.value2);
        // Recursive conversion
        value = "{ \"value1\":123, \"value2\": { \"value1\": 111, \"value2\": 222 } }";
        result = JsonConverter_1.JsonConverter.toNullableMap(value);
        assert.isNotNull(result);
        assert.equal(123, result.value1);
        assert.isNotNull(result.value2);
        assert.isObject(result.value2);
        // Handling arrays
        value = "{ \"value1\": [{ \"value1\": 111, \"value2\": 222 }] }";
        result = JsonConverter_1.JsonConverter.toNullableMap(value);
        assert.isNotNull(result);
        assert.isArray(result.value1);
        var resultElements = result.value1;
        var resultElement0 = resultElements[0];
        assert.isNotNull(resultElement0);
        assert.equal(111, resultElement0.value1);
        assert.equal(222, resultElement0.value2);
    });
});
//# sourceMappingURL=JsonConverter.test.js.map
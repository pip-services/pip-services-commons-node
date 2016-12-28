"use strict";
var assert = require('chai').assert;
var StringConverter_1 = require("../../src/convert/StringConverter");
suite('StringConverter', function () {
    test('To String', function () {
        assert.equal(null, StringConverter_1.StringConverter.toNullableString(null));
        assert.equal('xyz', StringConverter_1.StringConverter.toString('xyz'));
        assert.equal('123', StringConverter_1.StringConverter.toString(123));
        assert.equal('true', StringConverter_1.StringConverter.toString(true));
        assert.equal('[object Object]', StringConverter_1.StringConverter.toStringWithDefault({ prop: 'xyz' }, 'xyz'));
        assert.equal('xyz', StringConverter_1.StringConverter.toStringWithDefault(null, 'xyz'));
    });
});
//# sourceMappingURL=StringConverter.test.js.map
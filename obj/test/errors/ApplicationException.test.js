"use strict";
var assert = require('chai').assert;
var ApplicationException_1 = require("../../src/errors/ApplicationException");
suite('ApplicationException', function () {
    test('Test', function () {
        var error = new ApplicationException_1.ApplicationException(null, null, null, "Test error");
        error.withCode("TEST_ERROR");
        assert.equal("TEST_ERROR", error.code);
        assert.equal("Test error", error.message);
        // error = new ApplicationException();
        // assert.equal("UNKNOWN", error.code);
        // assert.equal("Unknown error", error.message);
    });
});
//# sourceMappingURL=ApplicationException.test.js.map
let assert = require('chai').assert;

import { ApplicationException } from '../../src/errors/ApplicationException';

suite('ApplicationException', ()=> {

    test('Test', () => {
		let error: ApplicationException = new ApplicationException(null, null, null, "Test error");
		error.withCode("TEST_ERROR");
		
		assert.equal("TEST_ERROR", error.code);
        assert.equal("Test error", error.message);
		
		// error = new ApplicationException();

        // assert.equal("UNKNOWN", error.code);
        // assert.equal("Unknown error", error.message);
    });

});
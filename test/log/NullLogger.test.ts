let assert = require('chai').assert;

import { NullLogger } from '../../src/log/NullLogger';
import { LogLevel } from '../../src/log/LogLevel';

suite('NullLogger', ()=> {
    
    var _logger: NullLogger;

    beforeEach(function() {
        _logger = new NullLogger();
    });

    test('Log Level', () => {
        assert.isTrue(_logger.getLevel() >= LogLevel.None);
        assert.isTrue(_logger.getLevel() <= LogLevel.Trace);
    });

    test('Simple Logging', () => {
        _logger.setLevel(LogLevel.Trace);

        _logger.fatal(null, null, "Fatal error message");
        _logger.error(null, null, "Error message");
        _logger.warn(null, "Warning message");
        _logger.info(null, "Information message");
        _logger.debug(null, "Debug message");
        _logger.trace(null, "Trace message");
    });

    test('Error Logging', () => {
        try {
            // Raise an exception
            throw new Error();
        } catch (ex) {
            _logger.fatal("123", ex, "Fatal error");
            _logger.error("123", ex, "Recoverable error");

            assert.isNotNull(ex);
        }
    });

});
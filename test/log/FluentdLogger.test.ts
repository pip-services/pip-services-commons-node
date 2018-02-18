let process = require('process');
let assert = require('chai').assert;

import { ConfigParams } from '../../src/config/ConfigParams';
import { FluentdLogger } from '../../src/log/FluentdLogger';
import { LogLevel } from '../../src/log/LogLevel';
import { DefaultLoggerFactory } from '../../src/log/DefaultLoggerFactory';
import { References } from '../../src/refer/References';

suite('FluentdLogger', ()=> {
    var _logger: FluentdLogger;

    setup((done) => {
        let host = process.env['FLUENTD_HOST'] || 'localhost';
        let port = process.env['FLUENTD_PORT'] || 24224;

        _logger = new FluentdLogger();

        let config = ConfigParams.fromTuples(
            'source', 'test',
            'connection.host', host,
            'connection.port', port
        );
        _logger.configure(config);

        _logger.open(null, done);
    });

    teardown((done) => {
        _logger.close(null, done);
    });

    test('Log Level', () => {
        assert.isTrue(_logger.getLevel() >= LogLevel.None);
        assert.isTrue(_logger.getLevel() <= LogLevel.Trace);
    });

    test('Simple Logging', (done) => {
        _logger.setLevel(LogLevel.Trace);

        _logger.fatal(null, null, "Fatal error message");
        _logger.error(null, null, "Error message");
        _logger.warn(null, "Warning message");
        _logger.info(null, "Information message");
        _logger.debug(null, "Debug message");
        _logger.trace(null, "Trace message");

        _logger.dump();
        setTimeout(done, 1000);
    });

    test('Error Logging', (done) => {
        try {
            // Raise an exception
            throw new Error();
        } catch (ex) {
            _logger.fatal("123", ex, "Fatal error");
            _logger.error("123", ex, "Recoverable error");

            assert.isNotNull(ex);
        }

        _logger.dump();
        setTimeout(done, 1000);
    });

});
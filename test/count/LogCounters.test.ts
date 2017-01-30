let assert = require('chai').assert;

import { LogCounters } from '../../src/count/LogCounters';
import { CounterType } from '../../src/count/CounterType';
import { NullLogger } from '../../src/log/NullLogger';
import { References } from '../../src/refer/References';
import { Timing } from '../../src/count/Timing';

suite('LogCounters', ()=> {
    var _counters: LogCounters;

    beforeEach(function() {
        let log: NullLogger = new NullLogger();
        let refs: References = References.fromList(log);
        _counters = new LogCounters();
        _counters.setReferences(refs);
    });

    test('Simple Counters', () => {
        let counters: LogCounters =_counters;

        counters.last("Test.LastValue", 123);
        counters.last("Test.LastValue", 123456);

        var counter = counters.get("Test.LastValue", CounterType.LastValue);
        assert.isNotNull(counter);
        assert.isNotNull(counter.getLast());
        assert.equal(counter.getLast(), 123456, 3);

        counters.incrementOne("Test.Increment");
        counters.increment("Test.Increment", 3);

        counter = counters.get("Test.Increment", CounterType.Increment);
        assert.isNotNull(counter);
        assert.equal(counter.getCount(), 4);

        counters.timestampNow("Test.Timestamp");
        counters.timestampNow("Test.Timestamp");

        counter = counters.get("Test.Timestamp", CounterType.Timestamp);
        assert.isNotNull(counter);
        assert.isNotNull(counter.getTime());

        counters.stats("Test.Statistics", 1);
        counters.stats("Test.Statistics", 2);
        counters.stats("Test.Statistics", 3);

        counter = counters.get("Test.Statistics", CounterType.Statistics);
        assert.isNotNull(counter);
        assert.equal(counter.getAverage(), 2, 3);

        counters.dump();
    });    

    test('Measure Elapsed Time', () => {
        let timer: Timing = _counters.beginTiming("Test.Elapsed");

        setTimeout(function() {
            timer.endTiming();

            var counter = _counters.get("Test.Elapsed", CounterType.Interval);
            assert.isNotNull(counter);
            assert.isTrue(counter.getLast() > 50);
            assert.isTrue(counter.getLast() < 5000);

            _counters.dump();
        }, 100);

    });    

});

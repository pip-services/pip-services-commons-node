let assert = require('chai').assert;

import { Descriptor } from '../../src/refer/Descriptor';
import { NullCache } from '../../src/cache/NullCache';

suite('NullCache', ()=> {
    let cache: NullCache = null;

    setup((done) => {
        cache = new NullCache();
        done();
    });

    test('Returns NullCache Descriptor', () => {
        let descriptor: Descriptor = cache.getDescriptor();

		// Check match by individual fields
        assert.isNotNull(descriptor);
		assert.equal(descriptor.type, 'cache');
		assert.equal(descriptor.kind, 'null');
    });    

    test('Retrieve Returns Null', () => {
        cache.retrieve(null, "key1", (err, val) => {
            assert.isNull(err);
            assert.isNull(val);
        });
    });    

    test('Store Returns Same Value', () => {
        var key = "key1";
        var initVal = "value1";

        cache.store(null, key, initVal, 0, (err, val) => {
            assert.isNull(err);
            assert.equal(initVal, val);
        });
    });    

});
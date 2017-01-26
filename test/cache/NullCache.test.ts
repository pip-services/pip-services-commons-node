let assert = require('chai').assert;

import { Descriptor } from '../../src/refer/Descriptor';
import { NullCache } from '../../src/cache/NullCache';

suite('NullCache', ()=> {
    let cache: NullCache = null;

    setup((done) => {
        cache = new NullCache();
        done();
    });

    test('Returns NullCache Descriptor', (done) => {
        let descriptor: Descriptor = cache.getDescriptor();

		// Check match by individual fields
        assert.isNotNull(descriptor);
        assert.equal(descriptor.getType(), 'cache');
        assert.equal(descriptor.getKind(), 'null');

        done();
    });    

    test('Retrieve Returns Null', (done) => {
        cache.retrieve(null, "key1", (err, val) => {
            assert.isNull(err);
            assert.isNull(val);

            done();
        });
    });    

    test('Store Returns Same Value', (done) => {
        var key = "key1";
        var initVal = "value1";

        cache.store(null, key, initVal, 0, (err, val) => {
            assert.isNull(err);
            assert.equal(initVal, val);

            done();
        });
    });    

});
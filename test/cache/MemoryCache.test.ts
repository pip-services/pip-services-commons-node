let assert = require('chai').assert;
let async = require('async');

import { Descriptor } from '../../src/refer/Descriptor';
import { MemoryCache } from '../../src/cache/MemoryCache';
import { ConfigParams } from '../../src/config/ConfigParams';
import { CacheFixture } from './CacheFixture';

suite('MemoryCache', ()=> {
    let _cache: MemoryCache;
    let _fixture: CacheFixture;

    setup((done) => {
        _cache = new MemoryCache();
        _fixture = new CacheFixture(_cache);

        done();
    });

    test('Store and Retrieve', (done) => {
        _fixture.testStoreAndRetrieve(done);
    });    

    test('Retrieve Expired', (done) => {
        _fixture.testRetrieveExpired(done);
    });    

    test('Remove', (done) => {
        _fixture.testRemove(done);
    });    
    
});

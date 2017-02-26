let assert = require('chai').assert;
let async = require('async');

import { Descriptor } from '../../src/refer/Descriptor';
import { MemoryCache } from '../../src/cache/MemoryCache';
import { ConfigParams } from '../../src/config/ConfigParams';

suite('MemoryCache', ()=> {
    let cache: MemoryCache = null;

    let key1: string = "key1";
    let key2: string = "key2";
    let key3: string = "key3";

    let value1: string = "value1";
    let value2: string = "value2";
    let value3: string = "value3";

    setup((done) => {
        cache = new MemoryCache();

        async.series([
            (callback) => {
                cache.store(null, key1, value1, 1000, (err, val) => {
                    callback();
                });
            },
            (callback) => {
                cache.store(null, key2, value2, 1000, (err, val) => {
                    callback();
                });
            }
        ], done);
    });

    test('Retrieve Both Value In 500 ms', (done) => {
        async.series([
            (callback) => {
                setTimeout(() => {
                    callback();
                }, 500);
            },
            (callback) => {
                cache.retrieve(null, key1, (err, val) => {
                    assert.isNotNull(val);
                    assert.equal(value1, val);

                    callback();
                });
            },
            (callback) => {
                cache.retrieve(null, key2, (err, val) => {
                    assert.isNotNull(val);
                    assert.equal(value2, val);

                    callback();
                });
            }
        ], done);
    });    

    test('Retrieve Both Value In 1500 ms Fails', (done) => {
        async.series([
            (callback) => {
                setTimeout(() => {
                    callback();
                }, 1500);
            },
            (callback) => {
                cache.retrieve(null, key1, (err, val) => {
                    assert.isNull(val);

                    callback();
                });
            },
            (callback) => {
                cache.retrieve(null, key2, (err, val) => {
                    assert.isNull(val);

                    callback();
                });
            }
        ], done);
    });    

    test('Store Returns Same Value', (done) => {
        cache.store(null, key3, value3, 0, (err, val) => {
            assert.isNull(err);
            assert.equal(value3, val);

            done();
        });
    });    

    test('Stored Value Is Stored', (done) => {
        async.series([
            (callback) => {
                cache.store(null, key3, value3, 1000, (err, val) => {
                    callback();
                });
            },
            (callback) => {
                cache.retrieve(null, key3, (err, val) => {
                    assert.isNotNull(val);
                    assert.equal(value3, val);

                    callback();
                });
            }
        ], done);
    });    

    test('Removed Value Is Removed', (done) => {
        async.series([
            (callback) => {
                cache.remove(null, key1, (err) => {
                    callback();
                });
            },
            (callback) => {
                cache.retrieve(null, key1, (err, val) => {
                    assert.isNull(val);

                    callback();
                });
            }
        ], done);
    });    

    test('Configure New Value Stays For 1500 ms But Fails For 2500 ms', (done) => {
        let config: ConfigParams = ConfigParams.fromTuples("timeout", 2000);

        cache.configure(config);

        async.series([
            (callback) => {
                cache.store(null, key3, value3, 0, (err, val) => {
                    callback();
                });
            },
            (callback) => {
                setTimeout(() => {
                    callback();
                }, 1500);
            },
            (callback) => {
                cache.retrieve(null, key3, (err, val) => {
                    assert.isNotNull(val);
                    assert.equal(value3, val);

                    callback();
                });
            },
            (callback) => {
                setTimeout(() => {
                    callback();
                }, 1000);
            },
            (callback) => {
                cache.retrieve(null, key3, (err, val) => {
                    assert.isNull(val);

                    callback();
                });
            }
        ], done);
    });    

});

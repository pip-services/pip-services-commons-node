let async = require('async');
let assert = require('chai').assert;

import { ConfigParams } from '../../src/config/ConfigParams';
import { JsonConfigReader } from '../../src/config/JsonConfigReader';

suite('JsonConfigReader', ()=> {

    test('Config Sections', () => {
        let config: ConfigParams = JsonConfigReader.readConfig(null, "./data/config.json");

        assert.equal(config.getCount(), 7);
        assert.equal(config.getAsInteger("Field1.Field11"), 123);
        assert.equal(config.get("Field1.Field12"), "ABC");
        assert.equal(config.getAsInteger("Field2.0"), 123);
        assert.equal(config.get("Field2.1"), "ABC");
        assert.equal(config.getAsInteger("Field2.2.Field21"), 543);
        assert.equal(config.get("Field2.2.Field22"), "XYZ");
        assert.equal(config.getAsBoolean("Field3"), true);
        
    });    

    test('Read After Timeout', (done) => {
        let reader: JsonConfigReader = new JsonConfigReader("./data/config.json");
        let originalConfig: ConfigParams;

        reader.setTimeout(100);

        async.series([
            (callback) => {
                reader.readConfig(null, (err, config) => {
                    assert.isNull(err);
                    assert.equal(config.getCount(), 7);
                    originalConfig = config;
                    callback(err);
                });
            },
            (callback) => {
                setTimeout(function() {
                    reader.readConfig(null, (err, config) => {
                        assert.isNull(err);
                        assert.equal(originalConfig.getCount(), config.getCount());
                        callback(err);
                    });
                }, 500);
            }
        ], done);
    });    

});

let assert = require('chai').assert;

import { ConfigParams } from '../../src/config/ConfigParams';
import { JsonConfigReader } from '../../src/config/JsonConfigReader';
import { AnyValueMap } from '../../src/data/AnyValueMap';
import { AnyValueArray } from '../../src/data/AnyValueArray';

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

    test('Read After Timeout', () => {
        let reader: JsonConfigReader = new JsonConfigReader(null, "./data/config.json");

        reader.timeout = 100;

        var config: ConfigParams = reader.readConfig(null);
        assert.equal(config.getCount(), 7);

        setTimeout(function() {
            var newConfig: ConfigParams = reader.readConfig(null);
            assert.equal(config.getCount(), newConfig.getCount());
        }, 500);

    });    

});

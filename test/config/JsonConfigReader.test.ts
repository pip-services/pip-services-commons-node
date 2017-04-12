let async = require('async');
let assert = require('chai').assert;

import { ConfigParams } from '../../src/config/ConfigParams';
import { JsonConfigReader } from '../../src/config/JsonConfigReader';

suite('JsonConfigReader', ()=> {

    test('Config Sections', () => {
        let parameters = ConfigParams.fromTuples(
            "param1", "Test Param 1",
            "param2", "Test Param 2"
        );
        let config: ConfigParams = JsonConfigReader.readConfig(null, "./data/config.json", parameters);

        assert.equal(config.length(), 9);
        assert.equal(config.getAsInteger("Field1.Field11"), 123);
        assert.equal(config.get("Field1.Field12"), "ABC");
        assert.equal(config.getAsInteger("Field2.0"), 123);
        assert.equal(config.get("Field2.1"), "ABC");
        assert.equal(config.getAsInteger("Field2.2.Field21"), 543);
        assert.equal(config.get("Field2.2.Field22"), "XYZ");
        assert.equal(config.getAsBoolean("Field3"), true);
        assert.equal(config.get("Field4"), "Test Param 1");
        assert.equal(config.get("Field5"), "Test Param 2"); 
    });      

});

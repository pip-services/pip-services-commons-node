let assert = require('chai').assert;

import { ConfigParams } from '../../src/config/ConfigParams';
import { YamlConfigReader } from '../../src/config/YamlConfigReader';

suite('YamlConfigReader', ()=> {

    test('Config Sections', () => {
        let config: ConfigParams = YamlConfigReader.readConfig(null, "./data/config.yaml");

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
        let reader: YamlConfigReader = new YamlConfigReader(null, "./data/config.yaml");

        reader.timeout = 100;

        var config: ConfigParams = reader.readConfig(null);
        assert.equal(config.getCount(), 7);

        setTimeout(function() {
            var newConfig: ConfigParams = reader.readConfig(null);
            assert.equal(config.getCount(), newConfig.getCount());
        }, 500);

    });    

});

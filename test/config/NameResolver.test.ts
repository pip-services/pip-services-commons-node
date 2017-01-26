let assert = require('chai').assert;

import { ConfigParams } from '../../src/config/ConfigParams';
import { NameResolver } from '../../src/config/NameResolver';

suite('JsonConfigReader', ()=> {

    test('Read Config', (done) => {
        var config = ConfigParams.fromTuples("id", "ABC");
        var name = NameResolver.resolve(config);
		assert.equal(name, 'ABC');

        var config = ConfigParams.fromTuples("name", "ABC");
        var name = NameResolver.resolve(config);
		assert.equal(name, 'ABC');

        done();
    });    

    test('Empty Name', (done) => {
        var config = ConfigParams.fromTuples();
        var name = NameResolver.resolve(config);
		assert.isNull(name);

        done();
    });    

});

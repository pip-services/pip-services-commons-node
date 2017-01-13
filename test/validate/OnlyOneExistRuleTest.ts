let assert = require('chai').assert;

import { TestObject } from './TestObject';
import { Schema } from '../../src/validate/Schema';
import { OnlyOneExistRule } from '../../src/validate/OnlyOneExistRule';

suite('OnlyOneExistRule', ()=> {

    test('OnlyOneExistRule', (done) => {
        var obj = new TestObject();

        var schema = new Schema().withRule(new OnlyOneExistRule("missingProperty", "stringProperty", "nullProperty"));
        var results = schema.validate(obj);
        assert.equal(results.length, 0);

        var schema = new Schema().withRule(new OnlyOneExistRule("stringProperty", "nullProperty", "intField"));
        var results = schema.validate(obj);
        assert.equal(results.length, 1);

        done();
    });    

});

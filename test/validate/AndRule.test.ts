let assert = require('chai').assert;
let async = require('async');

import { TestObject } from './TestObject';
import { TestSubObject } from './TestSubObject';
import { Schema } from '../../src/validate/Schema';
import { AndRule } from '../../src/validate/AndRule';
import { AtLeastOneExistRule } from '../../src/validate/AtLeastOneExistRule';

suite('AndRule', ()=> {

    test('Only One Exist Rule', (done) => {
        var obj = new TestObject();

        var schema = new Schema().withRule(new AndRule(new AtLeastOneExistRule("missingProperty", "stringProperty", "nullProperty"), new AtLeastOneExistRule("stringProperty", "nullProperty", "intField")));
        var results = schema.validate(obj);
        assert.equal(results.length, 0);

        var schema = new Schema().withRule(new AndRule(new AtLeastOneExistRule("missingProperty", "stringProperty", "nullProperty"), new AtLeastOneExistRule("missingProperty", "nullProperty")));
        var results = schema.validate(obj);
        assert.equal(results.length, 1);

        done();
    });    

});

let assert = require('chai').assert;
let async = require('async');

import { TestObject } from './TestObject';
import { TestSubObject } from './TestSubObject';

import { Schema } from '../../src/validate/Schema';
import { ObjectSchema } from '../../src/validate/ObjectSchema';
import { ArraySchema } from '../../src/validate/ArraySchema';
import { MapSchema } from '../../src/validate/MapSchema';
import { TypeCode } from '../../src/convert/TypeCode';

suite('SchemasTest', ()=> {

    test('Test Empty Schema', (done) => {
        var schema = new ObjectSchema();
        var results = schema.validate(null);
        assert.equal(results.length, 0);

        done();
    });    

    test('Test Required', (done) => {
        var schema = new Schema().makeRequired();
        var results = schema.validate(null);
        assert.equal(results.length, 1);

        done();
    });    

    test('Test Unexpected', (done) => {
        var schema = new ObjectSchema();
        var obj = new TestObject();
        var results = schema.validate(obj);
        assert.equal(results.length, 10);

        done();
    });    

    test('Test Optional Properties', (done) => {
        var schema = new ObjectSchema()
            .withOptionalProperty("intField")
            .withOptionalProperty("stringProperty")
            .withOptionalProperty("nullProperty")
            .withOptionalProperty("intArrayProperty")
            .withOptionalProperty("stringListProperty")
            .withOptionalProperty("mapProperty")
            .withOptionalProperty("subObjectProperty")
            .withOptionalProperty("subArrayProperty");

        var obj = new TestObject();
        var results = schema.validate(obj);
        assert.equal(results.length, 2);

        done();
    });    

    test('Test Required Properties', (done) => {
        var schema = new ObjectSchema()
            .withRequiredProperty("privateField")
            .withRequiredProperty("privateProperty")
            .withRequiredProperty("intField")
            .withRequiredProperty("stringProperty")
            .withRequiredProperty("nullProperty")
            .withRequiredProperty("intArrayProperty")
            .withRequiredProperty("stringListProperty")
            .withRequiredProperty("mapProperty")
            .withRequiredProperty("subObjectProperty")
            .withRequiredProperty("subArrayProperty");

        var obj = new TestObject();
        obj.subArrayProperty = null;

        var results = schema.validate(obj);
        assert.equal(results.length, 2);

        done();
    });    

    test('Test Types', (done) => {
        var schema = new ObjectSchema()
            .withRequiredProperty("privateField")
            .withRequiredProperty("privateProperty")
            .withRequiredProperty("intField", TypeCode.Long)
            .withRequiredProperty("stringProperty", TypeCode.String)
            .withOptionalProperty("nullProperty", TypeCode.Object)
            .withRequiredProperty("intArrayProperty", TypeCode.Array)
            .withRequiredProperty("stringListProperty", TypeCode.Array)
            .withRequiredProperty("mapProperty", TypeCode.Map)
            .withRequiredProperty("subObjectProperty", TypeCode.Map)
            .withRequiredProperty("subArrayProperty", TypeCode.Array);

        var obj = new TestObject();
        var results = schema.validate(obj);
        assert.equal(results.length, 0);

        done();
    });    

    test('Test Sub Schema', (done) => {
        var sunSchema = new ObjectSchema()
            .withRequiredProperty("id", TypeCode.String)
            .withRequiredProperty("floatField", TypeCode.Double)
            .withOptionalProperty("nullProperty", TypeCode.Map)

        var schema = new ObjectSchema()
            .withRequiredProperty("privateField")
            .withRequiredProperty("privateProperty")
            .withRequiredProperty("intField", TypeCode.Long)
            .withRequiredProperty("stringProperty", TypeCode.String)
            .withOptionalProperty("nullProperty", TypeCode.Object)
            .withRequiredProperty("intArrayProperty", TypeCode.Array)
            .withRequiredProperty("stringListProperty", TypeCode.Array)
            .withRequiredProperty("mapProperty", TypeCode.Map)
            .withRequiredProperty("subObjectProperty", sunSchema)
            .withRequiredProperty("subArrayProperty", TypeCode.Array);

        var obj = new TestObject();
        var results = schema.validate(obj);
        assert.equal(results.length, 0);

        done();
    });    

    test('Test Array and Map Schemas', (done) => {
        var sunSchema = new ObjectSchema()
            .withRequiredProperty("id", TypeCode.String)
            .withRequiredProperty("floatField", TypeCode.Double)
            .withOptionalProperty("nullProperty", TypeCode.Map)

        var schema = new ObjectSchema()
            .withRequiredProperty("privateField")
            .withRequiredProperty("privateProperty")
            .withRequiredProperty("intField", TypeCode.Long)
            .withRequiredProperty("stringProperty", TypeCode.String)
            .withOptionalProperty("nullProperty", TypeCode.Object)
            .withRequiredProperty("intArrayProperty", new ArraySchema(TypeCode.Long))
            .withRequiredProperty("stringListProperty", new ArraySchema(TypeCode.String))
            .withRequiredProperty("mapProperty", new MapSchema(null, null, TypeCode.String, TypeCode.Long))
            .withRequiredProperty("subObjectProperty", sunSchema)
            .withRequiredProperty("subArrayProperty", TypeCode.Array);

        var obj = new TestObject();
        var results = schema.validate(obj);
        assert.equal(results.length, 0);

        done();
    });    

});

let assert = require('chai').assert;

import { TypeCode } from '../../src/convert/TypeCode';
import { TypeMatcher } from '../../src/reflect/TypeMatcher';

suite('TypeMatcher', ()=> {

   test('Match Integer', () => {
		assert.isTrue(TypeMatcher.matchValueByName("int", 123));
		assert.isTrue(TypeMatcher.matchValueByName("Integer", 123));
		assert.isTrue(TypeMatcher.matchValue(TypeCode.Long, 123));
   });

   test('Match Boolean', () => {
		assert.isTrue(TypeMatcher.matchValueByName("bool", true));
		assert.isTrue(TypeMatcher.matchValueByName("Boolean", true));
		assert.isTrue(TypeMatcher.matchValue(TypeCode.Boolean, true));
   });

   test('Match Double', () => {
		assert.isTrue(TypeMatcher.matchValueByName("double", 123.456));
		assert.isTrue(TypeMatcher.matchValueByName("Double", 123.456));
		assert.isTrue(TypeMatcher.matchValue(TypeCode.Double, 123.456));
   });

   test('Match String', () => {
		assert.isTrue(TypeMatcher.matchValueByName("string", "ABC"));
		assert.isTrue(TypeMatcher.matchValue(TypeCode.String, "ABC"));
   });

   test('Match DateTime', () => {
		assert.isTrue(TypeMatcher.matchValueByName("date", new Date()));
		assert.isTrue(TypeMatcher.matchValueByName("DateTime", new Date()));
		assert.isTrue(TypeMatcher.matchValue(TypeCode.DateTime, new Date()));
   });

   test('Match Map', () => {
        let map = {};
		assert.isTrue(TypeMatcher.matchValueByName("map", map));
		assert.isTrue(TypeMatcher.matchValueByName("dict", map));
		assert.isTrue(TypeMatcher.matchValueByName("Dictionary", map));
		assert.isTrue(TypeMatcher.matchValue(TypeCode.Map, map));
   });

   test('Match Array', () => {
        let array: number[] = [];
		assert.isTrue(TypeMatcher.matchValueByName("list", array));
		assert.isTrue(TypeMatcher.matchValueByName("array", array));
		assert.isTrue(TypeMatcher.matchValueByName("object[]", array));
		assert.isTrue(TypeMatcher.matchValue(TypeCode.Array, array));
   });

});

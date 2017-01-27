let assert = require('chai').assert;

import { DecimalConverter } from '../../src/convert/DecimalConverter';

suite('DecimalConverter', ()=> {

    test('To Decimal', () => {
        assert.equal(123, DecimalConverter.toDecimal(123));
        assert.equal(123.456, DecimalConverter.toDecimal(123.456));
        assert.equal(123.456, DecimalConverter.toDecimal('123.456'));
        assert.equal(123, DecimalConverter.toDecimal(new Date(123)));
        
        assert.equal(123, DecimalConverter.toDecimalWithDefault(null, 123));
        assert.equal(0, DecimalConverter.toDecimalWithDefault(false, 123));
        assert.equal(123, DecimalConverter.toDecimalWithDefault('ABC', 123));
    });  

});

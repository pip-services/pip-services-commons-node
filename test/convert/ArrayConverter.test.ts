let assert = require('chai').assert;

import { ArrayConverter } from '../../src/convert/ArrayConverter';

suite('ArrayConverter', ()=> {

    test('To Array', () => {
        let value = ArrayConverter.listToArray(null);
        assert.isArray(value);
        assert.lengthOf(value, 0);
        
        value = ArrayConverter.listToArray(123);
        assert.isArray(value);
        assert.lengthOf(value, 1);
        assert.equal(123, value[0]); 

        value = ArrayConverter.listToArray([123]);
        assert.isArray(value);
        assert.lengthOf(value, 1);
        assert.equal(123, value[0]); 
 
        value = ArrayConverter.listToArray('123');
        assert.isArray(value);
        assert.lengthOf(value, 1);
        assert.equal('123', value[0]); 

        value = ArrayConverter.listToArray('123,456');
        assert.isArray(value);
        assert.lengthOf(value, 2);
        assert.equal('123', value[0]); 
        assert.equal('456', value[1]); 
   });

});

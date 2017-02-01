let assert = require('chai').assert;

import { Descriptor } from '../../src/refer/Descriptor';
import { ManagedReferences } from '../../src/refer/ManagedReferences';
import { ILogger } from '../../src/log/ILogger';
import { DefaultLoggerFactory } from '../../src/log/DefaultLoggerFactory';

suite('ManagedReferences', ()=> {
    
    test('Auto Create Component', () => {
        var refs = new ManagedReferences();

        var factory = new DefaultLoggerFactory();
        refs.put(factory);

        var logger = refs.getOneRequired<ILogger>(new Descriptor("*", "logger", "*", "*", "*"));
        assert.isNotNull(logger);
    });    

    test('String Locator', () => {
        var refs = new ManagedReferences();

        var factory = new DefaultLoggerFactory();
        refs.put(factory);

        var component = refs.getOneOptional("ABC");
        assert.isNull(component);
    });

    test('Null Locator', () => {
        var refs = new ManagedReferences();

        var factory = new DefaultLoggerFactory();
        refs.put(factory);

        var component = refs.getOneOptional(null);
        assert.isNull(component);
    });    

});
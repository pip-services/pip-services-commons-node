let _ = require('lodash');

import { IReferences } from './IReferences';
import { ReferenceQuery } from './ReferenceQuery';
import { ReferenceException } from './ReferenceException';
import { ReferencesDecorator } from './ReferencesDecorator';
import { IFactory } from '../build/IFactory';

export class BuildReferencesDecorator extends ReferencesDecorator {
    public constructor(baseReferences: IReferences, parentReferences: IReferences) {
    	super(baseReferences, parentReferences);
    }
	
	public buildEnabled: boolean = true;

    private  findFactory(locator: any): IFactory {
        let components = this.getAll();
        for (let index = 0; index < components.length; index++) {
            let component = components[index];
            if (_.isFunction(component.canCreate) && _.isFunction(component.create)) {
                if (component.canCreate(locator))
                    return component;
            }
        }

        return null;
    }

    public create(locator: any): any {
        // Find factory
        let factory = this.findFactory(locator);
        if (factory == null) return null;

        try {
            // Create component
            return factory.create(locator);
        } catch (ex) {
            return null;
        }
    }

    public find<T>(query: ReferenceQuery, required: boolean): T[] {
        let components = super.find<T>(query, false);
        let locator = query.locator;

        // Try to create component
        if (components.length == 0 && this.buildEnabled) {
            let component = this.create(locator);
            if (component != null) {
                try {
                    this.parentReferences.putX(locator, component);
                    components.push(component);
                } catch (ex) {
                    // Ignore exception
                }
            }
        }

        // Throw exception is no required components found
        if (required && components.length == 0)
            throw new ReferenceException(null, locator);

        return components;
    }
}

let _ = require('lodash');

import { IFactory } from './IFactory';
import { CreateException } from './CreateException';

export class CompositeFactory implements IFactory {
    private _factories: IFactory[] = [];
	
	public constructor(...factories: IFactory[]) {
		if (factories != null)
            this._factories = this._factories.concat(factories);
	}
	
	public add(factory: IFactory): void {
		if (factory == null)
			throw new Error("Factory cannot be null");
		
		this._factories.push(factory);
	}
	
	public remove(factory: IFactory): void {
		this._factories = _.remove(this._factories, f => f == factory);
	}
	
	public canCreate(locator: any): boolean {
		if (locator == null)
			throw new Error("Locator cannot be null");
		
		// Iterate from the latest factories
		for (let index = this._factories.length - 1; index >= 0; index--) {
            if (this._factories[index].canCreate(locator))
				return true;
		}
		
		return false;
	}
	
	public create(locator: any): any {
		if (locator == null)
			throw new Error("Locator cannot be null");
		
		// Iterate from the latest factories
		for (let index = this._factories.length - 1; index >= 0; index--) {
            let factory = this._factories[index];
			if (factory.canCreate(locator))
				return factory.create(locator);
		}
		
		throw new CreateException(null, locator);
	}
	
}

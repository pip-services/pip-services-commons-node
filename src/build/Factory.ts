import { IFactory } from './IFactory';
import { CreateException } from './CreateException';

class Registration {
    public locator: any;
    public factory: (locator: any) => any;
}

export class Factory implements IFactory {	
	private _registrations: Registration[] = [];
	
	public register(locator: any, factory: (locator: any) => any): void {
		if (locator == null)
			throw new Error("Locator cannot be null");
		if (factory == null)
			throw new Error("Factory cannot be null");
		
		this._registrations.push({
            locator: locator,
            factory: factory
        });
	}

	public registerAsType(locator: any, objectFactory: any): void {
		if (locator == null)
			throw new Error("Locator cannot be null");
		if (objectFactory == null)
			throw new Error("Factory cannot be null");
		
		this._registrations.push({
            locator: locator,
            factory: (locator) => { return new objectFactory(); }
        });
	}
	
	public canCreate(locator: any): any {
        for (let index = 0; index < this._registrations.length; index++) {
            let registration = this._registrations[index];
			let thisLocator = registration.locator;
			if (thisLocator == locator || (thisLocator.equals && thisLocator.equals(locator)))
                return thisLocator;
		}
		return null;
	}

	public create(locator: any): any {
        for (let index = 0; index < this._registrations.length; index++) {
            let registration = this._registrations[index];
			let thisLocator = registration.locator;

			if (thisLocator == locator || (thisLocator.equals && thisLocator.equals(locator)))
				try {
					return registration.factory(locator);
				} catch (ex) {
					if (ex instanceof CreateException)
						throw ex;
					
					throw new CreateException(
						null, 
						"Failed to create object for " + locator
					).withCause(ex);
				}
		}
		return null;
	}
	
}

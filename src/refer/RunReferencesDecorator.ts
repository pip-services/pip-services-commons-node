import { IReferences } from './IReferences';
import { ReferencesDecorator } from './ReferencesDecorator';
import { ReferenceQuery } from './ReferenceQuery'
import { Opener } from '../run/Opener';
import { Closer } from '../run/Closer';

export class RunReferencesDecorator extends ReferencesDecorator {
    public constructor(baseReferences: IReferences, parentReferences: IReferences) {
    	super(baseReferences, parentReferences);
    }

	public openEnabled: boolean = true;
	public closeEnabled: boolean = true;

    public putX(locator: any, component: any): void {
        super.putX(locator, component);

        if (this.openEnabled)
            Opener.openOne(null, component, null);
    }

    public remove(locator: any): any {
        let component = super.remove(locator);

        if (this.closeEnabled)
            Closer.closeOne(null, component, null);

        return component;
    }

    public removeAll(locator: any): any[] {
        let components = super.removeAll(locator);

        if (this.closeEnabled)
            Closer.close(null, components, null);

        return components;
    }

}
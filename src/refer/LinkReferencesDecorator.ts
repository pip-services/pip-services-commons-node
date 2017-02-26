import { IReferences } from './IReferences';
import { ReferencesDecorator } from './ReferencesDecorator'
import { Referencer } from './Referencer';

export class LinkReferencesDecorator extends ReferencesDecorator {
    public constructor(baseReferences: IReferences, parentReferences: IReferences) {
    	super(baseReferences, parentReferences);
    }

	public linkEnabled: boolean = true;

    public putX(locator: any, component: any): any {
        super.putX(locator, component);

        if (this.linkEnabled)
            Referencer.setReferencesForOne(this.parentReferences, component);
    }

    public remove(locator: any): any {
        let component = super.remove(locator);

        if (this.linkEnabled)
            Referencer.unsetReferencesForOne(component);

        return component;
    }

    public removeAll(locator: any): any[] {
        let components = super.removeAll(locator);

        if (this.linkEnabled)
            Referencer.unsetReferences(components);

        return components;
    }
}

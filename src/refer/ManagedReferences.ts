import { IOpenable } from '../run/IOpenable';
import { Opener } from '../run/Opener';
import { Closer } from '../run/Closer';

import { References } from './References';
import { Referencer } from './Referencer';
import { ReferencesDecorator } from './ReferencesDecorator';
import { BuildReferencesDecorator } from './BuildReferencesDecorator';
import { LinkReferencesDecorator } from './LinkReferencesDecorator';
import { RunReferencesDecorator } from './RunReferencesDecorator';

export class ManagedReferences extends ReferencesDecorator implements IOpenable {
    protected _references: References;
    protected _builder: BuildReferencesDecorator;
    protected _linker: LinkReferencesDecorator;
    protected _runner: RunReferencesDecorator;

    public constructor(components: any[] = null) {
        super(null, null);

        this._references = new References(components);
        this._builder = new BuildReferencesDecorator(this._references, this);
        this._linker = new LinkReferencesDecorator(this._builder, this);
        this._runner = new RunReferencesDecorator(this._linker, this);

        this.baseReferences = this._runner;
    }

    public isOpened(): boolean {
        let components = this._references.getAll();
        return Opener.isOpened(components);
    }
    
    public open(correlationId: string, callback?: (err: any) => void): void {
        let components = this._references.getAll();
        Referencer.setReferences(this, components);
        Opener.open(correlationId, components);
    }

    public close(correlationId: string, callback?: (err: any) => void): void {
        let components = this._references.getAll();
        Closer.close(correlationId, components);
        Referencer.unsetReferences(components);
    }
}

export class ProjectionParams extends Array<string> {

    public constructor(values: string[] = null) {
        super();

        // Set the prototype explicitly.
        // https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work
        (<any>this).__proto__ = ProjectionParams.prototype;

        this.push(...values);
    }

    public static fromValues(...values: string[]) {
        return new ProjectionParams(values);
    }
    
}
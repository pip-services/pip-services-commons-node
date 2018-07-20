/**
 * Class that includes standard design patterns for data projection. Projection parameters 
 * contain information about what data to retrieve from a data source. 
 */
export class ProjectionParams extends Array<string> {

    /**
     * @param values    the projection parameters to initialize this ProjectionParams object with.
     */
    public constructor(values: string[] = null) {
        super();

        // Set the prototype explicitly.
        // https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work
        (<any>this).__proto__ = ProjectionParams.prototype;

        this.push(...values);
    }

    /**
     * Static method for creating new ProjectionParams objects using the values
     * passed as projection parameters.
     * 
     * @param values    the projection parameters to initialize the new ProjectionParams object with.
     * @returns         the ProjectionParams created.
     */
    public static fromValues(...values: string[]) {
        return new ProjectionParams(values);
    }
    
}
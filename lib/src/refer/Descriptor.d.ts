/**
 * Component descriptor used to find a component by its descriptive elements:
 * <ul>
 * <li> logical group: package or other logical group of components like 'pip-services-storage-blocks'
 * <li> component type: identifies component interface like 'controller', 'services' or 'cache'
 * <li> component id: identifies component internal content or implementation like 'memory', 'file' or 'mongodb', ...
 * <li> implementation version: '1.0', '1.5' or '10.4'
 * </ul>
 */
export declare class Descriptor {
    private _group;
    private _type;
    private _id;
    private _version;
    /**
     * Creates instance of a component locator
     * @param group - logical group: 'pip-services-runtime', 'pip-services-logging'
     * @param type - external type: 'cache', 'services' or 'controllers'
     * @param id - internal content/implementation: 'memory', 'file' or 'memcached'
     * @param version - implementation version: '1.0'. '1.5' or '10.4'
     */
    constructor(group: string, type: string, id: string, version: string);
    /**
     * Gets a component group
     * @return a component group
     */
    getGroup(): string;
    /**
     * Gets a component type
     * @return a component type
     */
    getType(): string;
    /**
     * Gets a component id
     * @return a component id
     */
    getId(): string;
    /**
     * Gets an implementation version
     * @return an implementation version
     */
    getVersion(): string;
    private matchField(field1, field2);
    /**
     * Matches this descriptor to another descriptor
     * All '*' or null descriptor elements match to any other value.
     * Specific values must match exactly.
     *
     * @param descriptor - another descriptor to match this one.
     * @return <b>true</b> if descriptors match or <b>false</b> otherwise.
     */
    match(descriptor: Descriptor): boolean;
    private exactMatchField(field1, field2);
    exactMatch(descriptor: Descriptor): boolean;
    isComplete(): boolean;
    equals(value: any): boolean;
    toString(): string;
    static fromString(value: string): Descriptor;
}

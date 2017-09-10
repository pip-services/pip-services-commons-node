export declare class TypeDescriptor {
    private _name;
    private _library;
    constructor(name: string, library: string);
    getName(): string;
    getLibrary(): string;
    equals(obj: any): boolean;
    toString(): string;
    static fromString(value: string): TypeDescriptor;
}

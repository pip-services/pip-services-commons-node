export declare class PropertyReflector {
    private static matchField(fieldName, fieldValue, expectedName);
    static hasProperty(obj: any, name: string): boolean;
    static getProperty(obj: any, name: string): any;
    static getPropertyNames(obj: any): string[];
    static getProperties(obj: any): any;
    static setProperty(obj: any, name: string, value: any): void;
    static setProperties(obj: any, values: any): void;
}

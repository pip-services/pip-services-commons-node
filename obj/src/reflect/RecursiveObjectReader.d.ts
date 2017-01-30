export declare class RecursiveObjectReader {
    private static performHasProperty(obj, names, nameIndex);
    static hasProperty(obj: any, name: string): boolean;
    private static performGetProperty(obj, names, nameIndex);
    static getProperty(obj: any, name: string): any;
    private static isSimpleValue(value);
    private static performGetPropertyNames(obj, path, result, cycleDetect);
    static getPropertyNames(obj: any): string[];
    private static performGetProperties(obj, path, result, cycleDetect);
    static getProperties(obj: any): any;
}

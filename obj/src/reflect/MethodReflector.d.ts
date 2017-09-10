export declare class MethodReflector {
    private static matchMethod(methodName, methodValue, expectedName);
    static hasMethod(obj: any, name: string): boolean;
    static invokeMethod(obj: any, name: string, ...args: any[]): any;
    static getMethodNames(obj: any): string[];
}

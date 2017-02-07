import { TypeDescriptor } from './TypeDescriptor';
export declare class TypeReflector {
    static getType(name: string, library: string): any;
    static getTypeByDescriptor(type: TypeDescriptor): any;
    static createInstanceByType(type: any, ...args: any[]): any;
    static createInstance(name: string, library: string, ...args: any[]): any;
    static createInstanceByDescriptor(type: TypeDescriptor, ...args: any[]): any;
    static isPrimitive(value: any): boolean;
}

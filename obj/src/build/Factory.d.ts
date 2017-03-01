import { IFactory } from './IFactory';
export declare class Factory implements IFactory {
    private _registrations;
    register(locator: any, factory: (locator: any) => any): void;
    registerAsType(locator: any, objectFactory: any): void;
    canCreate(locator: any): any;
    create(locator: any): any;
}

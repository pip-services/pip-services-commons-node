import { IFactory } from './IFactory';
export declare class CompositeFactory implements IFactory {
    private _factories;
    constructor(...factories: IFactory[]);
    add(factory: IFactory): void;
    remove(factory: IFactory): void;
    canCreate(locator: any): boolean;
    create(locator: any): any;
}

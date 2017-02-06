export interface IFactory {
    canCreate(locator: any): boolean;
    create(locator: any): any;
}

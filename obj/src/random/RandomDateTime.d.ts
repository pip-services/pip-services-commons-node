export declare class RandomDateTime {
    static nextDate(minYear?: number, maxYear?: number): Date;
    static nextDateTime(minYear?: number, maxYear?: number): Date;
    static updateDateTime(value: Date, range?: number): Date;
}

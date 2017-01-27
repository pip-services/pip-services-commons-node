export declare class RandomString {
    private static readonly _digits;
    private static readonly _symbols;
    private static readonly _alphaLower;
    private static readonly _alphaUpper;
    private static readonly _alpha;
    private static readonly _chars;
    static pickChar(values: string): string;
    static pick(values: string[]): string;
    static distort(value: string): string;
    static nextAlphaChar(): string;
    static nextString(minLength: number, maxLength: number): string;
}

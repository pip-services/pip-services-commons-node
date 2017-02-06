export declare class RandomText {
    private static readonly _namePrefixes;
    private static readonly _nameSuffixes;
    private static readonly _firstNames;
    private static readonly _lastNames;
    private static readonly _colors;
    private static readonly _stuffs;
    private static readonly _adjectives;
    private static readonly _verbs;
    private static readonly _allWords;
    static color(): string;
    static stuff(): string;
    static adjective(): string;
    static verb(): string;
    static phrase(minSize: number, maxSize?: number): string;
    static fullName(): string;
    static word(): string;
    static words(min: number, max?: number): string;
    static phone(): string;
    static email(): string;
    static text(minSize: number, maxSize?: number): string;
}

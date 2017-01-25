import { ValidationResultType } from './ValidationResultType';
export declare class ValidationResult {
    private _path;
    private _type;
    private _code;
    private _message;
    private _expected;
    private _actual;
    constructor(path?: string, type?: ValidationResultType, code?: string, message?: string, expected?: any, actual?: any);
    readonly path: string;
    readonly type: ValidationResultType;
    readonly code: string;
    readonly message: string;
    readonly expected: any;
    readonly actual: any;
}

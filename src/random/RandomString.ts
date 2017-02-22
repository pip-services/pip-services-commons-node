import { RandomInteger } from './RandomInteger';
import { RandomBoolean } from './RandomBoolean';

export class RandomString {
    private static readonly _digits = "01234956789";
    private static readonly _symbols = "_,.:-/.[].{},#-!,$=%.+^.&*-() ";
    private static readonly _alphaLower = "abcdefghijklmnopqrstuvwxyz";
    private static readonly _alphaUpper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    private static readonly _alpha = RandomString._alphaUpper + RandomString._alphaLower;
    private static readonly _chars = RandomString._alpha + RandomString._digits + RandomString._symbols;

    public static pickChar(values: string): string {
        if (values == null || values.length == 0)
            return '';

        let index = RandomInteger.nextInteger(values.length);
        return values.charAt(index);
    }

    public static pick(values: string[]): string {
        if (values == null || values.length == 0)
            return '';

        let index = RandomInteger.nextInteger(values.length);
        return values[index];
    }

    public static distort(value: string): string {
        value = value.toLowerCase();

        if (RandomBoolean.chance(1, 5))
            value = value.substring(0, 1).toUpperCase() + value.substring(1);

        if (RandomBoolean.chance(1, 3))
            value = value + RandomString.pickChar(RandomString._symbols);

        return value;
    }

    public static nextAlphaChar(): string {
        let index = RandomInteger.nextInteger(RandomString._alpha.length);
        return RandomString._alpha.charAt(index);
    }

    public static nextString(minLength: number, maxLength: number): string {
        let result = '';

        let length = RandomInteger.nextInteger(minLength, maxLength);
        for (let i = 0; i < length; i++) {
            let index = RandomInteger.nextInteger(RandomString._chars.length);
            result += RandomString._chars.charAt(index);
        }

        return result;
    }
}

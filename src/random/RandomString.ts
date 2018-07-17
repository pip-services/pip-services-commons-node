import { RandomInteger } from './RandomInteger';
import { RandomBoolean } from './RandomBoolean';

/**
 * Provides methods that can be used for generating random strings and chars, as well as picking at random strings/chars from a given set of strings/chars.
 */
export class RandomString {
    private static readonly _digits = "01234956789";
    private static readonly _symbols = "_,.:-/.[].{},#-!,$=%.+^.&*-() ";
    private static readonly _alphaLower = "abcdefghijklmnopqrstuvwxyz";
    private static readonly _alphaUpper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    private static readonly _alpha = RandomString._alphaUpper + RandomString._alphaLower;
    private static readonly _chars = RandomString._alpha + RandomString._digits + RandomString._symbols;

    /**
     * Picks a char at random from the string passed as 'values'
     * 
     * @param values    chars to pick from.
     * @returns         randomly picked char.
     */
    public static pickChar(values: string): string {
        if (values == null || values.length == 0)
            return '';

        let index = RandomInteger.nextInteger(values.length);
        return values.charAt(index);
    }

    /**
     * Picks a string at random from the string array passed as 'values'
     * 
     * @param values    strings to pick from.
     * @returns         randomly picked string.
     */
    public static pick(values: string[]): string {
        if (values == null || values.length == 0)
            return '';

        let index = RandomInteger.nextInteger(values.length);
        return values[index];
    }

    /**
     * Distorts the string passed as 'value' by making it lower case and by
     * either adding a symbol ("_,.:-/.[].{},#-!,$=%.+^.&*-() ") to the end of the string, 
     * or capitalizing the first letter of the string.
     * 
     * @param value    string to distort.
     * @returns        initial string with only the first letter capitalized or with a symbol added to the end.
     */
    public static distort(value: string): string {
        value = value.toLowerCase();

        //Capitalize the first letter of the string 'value'.
        if (RandomBoolean.chance(1, 5))
            value = value.substring(0, 1).toUpperCase() + value.substring(1);

        //Add a symbol to the end of the string 'value' 
        if (RandomBoolean.chance(1, 3))
            value = value + RandomString.pickChar(RandomString._symbols);

        return value;
    }

    /**
     * Randomly generates a letter of the English alphabet.
     * 
     * @returns a random letter of the English alphabet. Returned letter can be upper or lower case).
     */
    public static nextAlphaChar(): string {
        let index = RandomInteger.nextInteger(RandomString._alpha.length);
        return RandomString._alpha.charAt(index);
    }

    /**
     * Randomly generates a string, consisting of upper and lower case letters (of the English alphabet), 
     * digits (0-9), and symbols ("_,.:-/.[].{},#-!,$=%.+^.&*-() ").
     * 
     * @param minLength     minimum length of the string to be returned.
     * @param maxLength     maximum length of the string to be returned.
     * @returns             randomly generated string.
     */
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

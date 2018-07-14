import { RandomInteger } from './RandomInteger';

/**
 * Allows for picking items at random from an array of type T.
 */
export class RandomArray {
    
    /**
     * Picks an item at random from the array 'values'.
     * 
     * @param values    array of items to pick from.
     * @returns         picked item.
     */
    public static pick<T>(values: T[]): T {
        if (values == null || values.length == 0)
            return null;

        return values[RandomInteger.nextInteger(values.length)];
    }
}

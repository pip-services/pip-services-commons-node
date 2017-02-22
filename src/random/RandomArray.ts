import { RandomInteger } from './RandomInteger';

export class RandomArray {
    public static pick<T>(values: T[]): T {
        if (values == null || values.length == 0)
            return null;

        return values[RandomInteger.nextInteger(values.length)];
    }
}

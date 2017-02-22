export class RandomFloat {
    public static nextFloat(min: number, max: number = null): number {
        if (max == null) {
            max = min;
            min = 0;
        }

        if (max - min <= 0)
            return min;

        return min + Math.random() * (max - min);
    }

    public static updateFloat(value: number, range: number = null): number {
        if (range == null) range = 0;
        range = range == 0 ? 0.1 * value : range;
        let minValue = value - range;
        let maxValue = value + range;
        return RandomFloat.nextFloat(minValue, maxValue);
    }
}

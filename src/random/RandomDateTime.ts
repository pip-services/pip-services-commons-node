import { RandomInteger } from './RandomInteger';

export class RandomDateTime {

    public static nextDate(minYear: number = null, maxYear: number = null): Date {
        let currentYear = new Date().getFullYear();
        minYear = minYear == 0 || minYear == null ? currentYear - RandomInteger.nextInteger(10) : minYear;
        maxYear = maxYear == 0 || maxYear == null ? currentYear : maxYear;

        let year = RandomInteger.nextInteger(minYear, maxYear);
        let month = RandomInteger.nextInteger(1, 13);
        let day = RandomInteger.nextInteger(1, 32);

        if (month == 2)
            day = Math.min(28, day);
        else if (month == 4 || month == 6 || month == 9 || month == 11)
            day = Math.min(30, day);
        return new Date(year, month, day, 0, 0, 0, 0);
    }

    //    public static nextTime(): number {
    //        let hour = RandomInteger.nextInteger(0, 24);
    //        let min = RandomInteger.nextInteger(0, 60);
    //        let sec = RandomInteger.nextInteger(0, 60);
    //        let millis = RandomInteger.nextInteger(0, 1000);

    //        return ((hour * 60 + min) * 60 + sec) * 1000 + millis;
    //    }

    public static nextDateTime(minYear: number = null, maxYear: number = null): Date {
        let time = RandomDateTime.nextDate(minYear, maxYear).valueOf()
            + RandomInteger.nextInteger(3600 * 24 * 365);
        return new Date(time);
    }

    public static updateDateTime(value: Date, range: number = null): Date {
        range = range != 0 && range != null ? range : 10;
        if (range < 0)
            return value;

        // Days to milliseconds
        range = range * 24 * 3600000;
        let time = value.valueOf() + RandomInteger.nextInteger(-range, range);
        return new Date(time);
    }

}

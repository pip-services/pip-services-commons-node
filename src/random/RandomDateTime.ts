import { RandomInteger } from './RandomInteger';

/**
 * Provides methods that can be used for generating random Dates/DateTimes, as well as updating existing DateTimes 
 * by generating values in the range of 'original DateTime' ±'delta/range'
 */
export class RandomDateTime {

    /**
     * Generates a Date in the range ['minYear', 'maxYear'].
     * 
     * @param minYear   (optional) minimum Date that will be generated. Defaults to 0-10 years ago (from the current year) if omitted.
     * @param maxYear   (optional) maximum Date that will be generated. Defaults to the current year if omitted.
     * @returns         generated random Date.
     */
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

    /**
     * Generates a DateTime in the range ['minYear', 'maxYear'].
     * 
     * @param minYear   (optional) minimum DateTime that will be generated. Defaults to 0-10 years ago (from the current year) if omitted.
     * @param maxYear   (optional) maximum DateTime that will be generated. Defaults to the current year if omitted.
     * @returns         generated random DateTime.
     */
    public static nextDateTime(minYear: number = null, maxYear: number = null): Date {
        let time = RandomDateTime.nextDate(minYear, maxYear).valueOf()
            + RandomInteger.nextInteger(3600 * 24 * 365);
        return new Date(time);
    }

    /**
     * Generates a new DateTime that will differ from 'value' by a maximum of ±'range'. 
     * If 'range' is omitted (or 0), then the generated DateTime will differ from 'value' by ±10 days. 
     * 
     * @param value     DateTime to update.
     * @param range     (optional) defines the maximum amount of days by which the new DateTime can differ from 'value'. If range is a negative number,
     *                  'value' will be returned. Defaults to 10 days if omitted or zero.
     * @returns         updated DateTime.
     */
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

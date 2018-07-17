/**
 * Provides methods that can be used for generating random booleans using 'chance' and 'nextBoolean' methods.
 */
export class RandomBoolean {

    /**
     * Generates a random boolean that has a 'chance'/'maxChances' chance of being true.
     * 
     * The parameter 'maxChances' defines the length of the 'number line' to be used in the algorithm, 
     * and 'chances' defines the length of the 'true' section, which is centered on the 'number line'. 
     * A hit (a point on the 'number line') is chosen at random, and if the hit is in the 'true' 
     * section - true is returned. Otherwise, the hit is considered to be a 'miss', and false is returned.
     * 
     * @param chances       the chance of the hit being in the 'true' section.
     * @param maxChances    the overall length of the 'number line'.
     */
    public static chance(chances: number, maxChances: number): boolean {
    	chances = chances >= 0 ? chances : 0;
    	maxChances = maxChances >= 0 ? maxChances : 0;
    	if (chances == 0 && maxChances == 0)
        	return false;
    	
        maxChances = Math.max(maxChances, chances);
        let start = (maxChances - chances) / 2;
        let end = start + chances;
        let hit = Math.random() * maxChances;
        return hit >= start && hit <= end;
    }

    /**
     * Generates a boolean that has a 50/50 chance of being true.
     * 
     * @returns a random boolean.
     */
    public static nextBoolean(): boolean {
        return Math.random() * 100 < 50;
    }
}

export class RandomBoolean {	
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

    public static nextBoolean(): boolean {
        return Math.random() * 100 < 50;
    }
}

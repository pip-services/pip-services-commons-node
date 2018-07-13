import { RandomInteger } from './RandomInteger';
import { RandomString } from './RandomString';
import { RandomBoolean } from './RandomBoolean';

/**
 * Class 'RandomText' is used for generating random strings, which can contain: colors, names (first + last, with/without prefixes/suffixes), 
 * objects, adjectives, verbs, phrases (words separated by spaces), phone numbers, email addresses, sequences of words (CamelCase), or texts.
 */
export class RandomText {
    private static readonly _namePrefixes = ["Dr.", "Mr.", "Mrs"];
    private static readonly _nameSuffixes = ["Jr.", "Sr.", "II", "III"];
    private static readonly _firstNames = [
        "John", "Bill", "Andrew", "Nick", "Pamela", "Bela", "Sergio", "George", "Hurry", "Cecilia", "Vesta", "Terry", "Patrick"
    ];
    private static readonly _lastNames = [
        "Doe", "Smith", "Johns", "Gates", "Carmack", "Zontak", "Clinton", "Adams", "First", "Lopez", "Due", "White", "Black"
    ];
    private static readonly _colors = [
        "Black", "White", "Red", "Blue", "Green", "Yellow", "Purple", "Grey", "Magenta", "Cian"
    ];
    private static readonly _stuffs = [
        "Game", "Ball", "Home", "Board", "Car", "Plane", "Hotel", "Wine", "Pants", "Boots", "Table", "Chair"
    ];
    private static readonly _adjectives = [
        "Large", "Small", "High", "Low", "Certain", "Fuzzy", "Modern", "Faster", "Slower"
    ];
    private static readonly _verbs = [
        "Run", "Stay", "Breeze", "Fly", "Lay", "Write", "Draw", "Scream"
    ];
    // private static readonly _streetTypes = [
    //     "Lane", "Court", "Circle", "Drive", "Way", "Loop", "Blvd", "Street"
    // ];
    // private static readonly _streetPrefix = [
    //     "North", "South", "East", "West", "Old", "New", "N.", "S.", "E.", "W."
    // ];
    // private static readonly _streetNames = [
    //     "1st", "2nd", "3rd", "4th", "53rd", "6th", "8th", "Acacia", "Academy", "Adams", "Addison", "Airport", "Albany", "Alderwood", "Alton", "Amerige", "Amherst", "Anderson",
    //     "Ann", "Annadale", "Applegate", "Arcadia", "Arch", "Argyle", "Arlington", "Armstrong", "Arnold", "Arrowhead", "Aspen", "Augusta", "Baker", "Bald Hill", "Bank", "Bay Meadows",
    //     "Bay", "Bayberry", "Bayport", "Beach", "Beaver Ridge", "Bedford", "Beech", "Beechwood", "Belmont", "Berkshire", "Big Rock Cove", "Birch Hill", "Birchpond", "Birchwood",
    //     "Bishop", "Blackburn", "Blue Spring", "Bohemia", "Border", "Boston", "Bow Ridge", "Bowman", "Bradford", "Brandywine", "Brewery", "Briarwood", "Brickell", "Brickyard",
    //     "Bridge", "Bridgeton", "Bridle", "Broad", "Brookside", "Brown", "Buckingham", "Buttonwood", "Cambridge", "Campfire", "Canal", "Canterbury", "Cardinal", "Carpenter",
    //     "Carriage", "Carson", "Catherine", "Cedar Swamp", "Cedar", "Cedarwood", "Cemetery", "Center", "Central", "Chapel", "Charles", "Cherry Hill", "Chestnut", "Church", "Circle",
    //     "Clark", "Clay", "Cleveland", "Clinton", "Cobblestone", "Coffee", "College", "Colonial", "Columbia", "Cooper", "Corona", "Cottage", "Country Club", "Country", "County", "Court",
    //     "Courtland", "Creek", "Creekside", "Crescent", "Cross", "Cypress", "Deerfield", "Del Monte", "Delaware", "Depot", "Devon", "Devonshire", "Division", "Dogwood", "Dunbar",
    //     "Durham", "Eagle", "East", "Edgefield", "Edgemont", "Edgewater", "Edgewood", "El Dorado", "Elizabeth", "Elm", "Essex", "Euclid", "Evergreen", "Fairfield", "Fairground", "Fairview",
    //     "Fairway", "Fawn", "Fifth", "Fordham", "Forest", "Foster", "Foxrun", "Franklin", "Fremont", "Front", "Fulton", "Galvin", "Garden", "Gartner", "Gates", "George", "Glen Creek",
    //     "Glen Eagles", "Glen Ridge", "Glendale", "Glenlake", "Glenridge", "Glenwood", "Golden Star", "Goldfield", "Golf", "Gonzales", "Grand", "Grandrose", "Grant", "Green Hill",
    //     "Green Lake", "Green", "Greenrose", "Greenview", "Gregory", "Griffin", "Grove", "Halifax", "Hamilton", "Hanover", "Harrison", "Hartford", "Harvard", "Harvey", "Hawthorne",
    //     "Heather", "Henry Smith", "Heritage", "High Noon", "High Point", "High", "Highland", "Hill Field", "Hillcrest", "Hilldale", "Hillside", "Hilltop", "Holly", "Homestead",
    //     "Homewood", "Honey Creek", "Howard", "Indian Spring", "Indian Summer", "Iroquois", "Jackson", "James", "Jefferson", "Jennings", "Jockey Hollow", "John", "Johnson", "Jones",
    //     "Joy Ridge", "King", "Kingston", "Kirkland", "La Sierra", "Lafayette", "Lake Forest", "Lake", "Lakeshore", "Lakeview", "Lancaster", "Lane", "Laurel", "Leatherwood", "Lees Creek",
    //     "Leeton Ridge", "Lexington", "Liberty", "Lilac", "Lincoln", "Linda", "Littleton", "Livingston", "Locust", "Longbranch", "Lookout", "Lower River", "Lyme", "Madison", "Maiden",
    //     "Main", "Mammoth", "Manchester", "Manhattan", "Manor Station", "Maple", "Marconi", "Market", "Marsh", "Marshall", "Marvon", "Mayfair", "Mayfield", "Mayflower", "Meadow",
    //     "Meadowbrook", "Mechanic", "Middle River", "Miles", "Mill Pond", "Miller", "Monroe", "Morris", "Mountainview", "Mulberry", "Myrtle", "Newbridge", "Newcastle", "Newport",
    //     "Nichols", "Nicolls", "North", "Nut Swamp", "Oak Meadow", "Oak Valley", "Oak", "Oakland", "Oakwood", "Ocean", "Ohio", "Oklahoma", "Olive", "Orange", "Orchard", "Overlook",
    //     "Pacific", "Paris Hill", "Park", "Parker", "Pawnee", "Peachtree", "Pearl", "Peg Shop", "Pendergast", "Peninsula", "Penn", "Pennington", "Pennsylvania", "Pheasant", "Philmont",
    //     "Pierce", "Pin Oak", "Pine", "Pineknoll", "Piper", "Plumb Branch", "Poor House", "Prairie", "Primrose", "Prince", "Princess", "Princeton", "Proctor", "Prospect", "Pulaski",
    //     "Pumpkin Hill", "Purple Finch", "Queen", "Race", "Ramblewood", "Redwood", "Ridge", "Ridgewood", "River", "Riverside", "Riverview", "Roberts", "Rock Creek", "Rock Maple",
    //     "Rockaway", "Rockcrest", "Rockland", "Rockledge", "Rockville", "Rockwell", "Rocky River", "Roosevelt", "Rose", "Rosewood", "Ryan", "Saddle", "Sage", "San Carlos", "San Juan",
    //     "San Pablo", "Santa Clara", "Saxon", "School", "Schoolhouse", "Second", "Shadow Brook", "Shady", "Sheffield", "Sherman", "Sherwood", "Shipley", "Shub Farm", "Sierra",
    //     "Silver Spear", "Sleepy Hollow", "Smith Store", "Smoky Hollow", "Snake Hill", "Southampton", "Spring", "Spruce", "Squaw Creek", "St Louis", "St Margarets", "St Paul", "State",
    //     "Stillwater", "Strawberry", "Studebaker", "Sugar", "Sulphur Springs", "Summerhouse", "Summit", "Sunbeam", "Sunnyslope", "Sunset", "Surrey", "Sutor", "Swanson", "Sycamore",
    //     "Tailwater", "Talbot", "Tallwood", "Tanglewood", "Tarkiln Hill", "Taylor", "Thatcher", "Third", "Thomas", "Thompson", "Thorne", "Tower", "Trenton", "Trusel", "Tunnel",
    //     "University", "Vale", "Valley Farms", "Valley View", "Valley", "Van Dyke", "Vermont", "Vernon", "Victoria", "Vine", "Virginia", "Wagon", "Wall", "Walnutwood", "Warren",
    //     "Washington", "Water", "Wayne", "Westminster", "Westport", "White", "Whitemarsh", "Wild Rose", "William", "Williams", "Wilson", "Winchester", "Windfall", "Winding Way",
    //     "Winding", "Windsor", "Wintergreen", "Wood", "Woodland", "Woodside", "Woodsman", "Wrangler", "York",
    // ];

    private static readonly _allWords = RandomText._firstNames.concat(RandomText._lastNames).concat(RandomText._colors)
        .concat(RandomText._stuffs).concat(RandomText._adjectives).concat(RandomText._verbs);

    /**
     * @returns the name of a random color. Returned name is capitalized.
     */
    public static color(): string {
        return RandomString.pick(RandomText._colors);
    }

    /**
     * @returns the name of a random object. Returned name is capitalized.
     */
    public static stuff(): string {
        return RandomString.pick(RandomText._stuffs);
    }

    /**
     * @returns a random adjective. Returned adjective is capitalized.
     */
    public static adjective(): string {
        return RandomString.pick(RandomText._adjectives);
    }

    /**
     * @returns a random verb. Returned verb is capitalized.
     */
    public static verb(): string {
        return RandomString.pick(RandomText._verbs);
    }

    /**
     * @returns a random phrase, consisting of random words. Words will be separated by spaces, 
     *          and only the first word will be capitalized.
     */
    public static phrase(minSize: number, maxSize: number = null): string {
        maxSize = Math.max(minSize, maxSize || minSize);
        let size = RandomInteger.nextInteger(minSize, maxSize);
        if (size <= 0) return "";

        let result = '';
        result += RandomString.pick(RandomText._allWords);
        while (result.length < size) {
            result += " " + RandomString.pick(RandomText._allWords).toLowerCase();
        }

        return result;
    }

    /**
     * @returns a random name in the format of "(Prefix )First Last( Suffix)", 
     *          where (Prefix/Suffix) are added at random.
     */
    public static fullName(): string {
        let result = '';

        if (RandomBoolean.chance(3, 5))
            result += RandomString.pick(RandomText._namePrefixes) + " ";

        result += RandomString.pick(RandomText._firstNames)
            + " " + RandomString.pick(RandomText._lastNames);

        if (RandomBoolean.chance(5, 10))
            result += " " + RandomString.pick(RandomText._nameSuffixes);

        return result;
    }

    /**
     * @returns a random word from available first names, last names, colors, stuffs, adjectives, or verbs. 
     *          Returned word is capitalized.
     */
    public static word(): string {
        return RandomString.pick(RandomText._allWords);
    }

    /**
     * @param min   minimum number of words in the sequence. If 'max' is not given, sequence will contain 'min' random words.
     * @param max   (optional) maximum number of words in the sequence.
     * @returns     a string sequence of random words from available first names, last names, colors, stuffs, adjectives, or verbs.  
     *              All words in the sequence will be capitalized and NOT separated by spaces (CamelCase). Use 'phrase' for generating 
     *              sequences of words that are separated by spaces.
     */
    public static words(min: number, max: number = null): string {
        let result = '';

        let count = RandomInteger.nextInteger(min, max || min);
        for (let i = 0; i < count; i++)
            result += RandomString.pick(RandomText._allWords);

        return result;
    }

    /**
     * @returns a random phone number in the format of "(XXX) XXX-YYYY" where XXX = [111,999] and YYYY = [0, 9999].
     */
    public static phone(): string {
        let result = '';

        result += "("
            + RandomInteger.nextInteger(111, 999)
            + ") "
            + RandomInteger.nextInteger(111, 999)
            + "-"
            + RandomInteger.nextInteger(0, 9999);

        return result;
    }

    /**
     * @returns a random email address in the format of "WORDS26&#064;WORDS13.com" where x and y in WORDSxy represent the minimum 
     *          and maximum number of words, making up WORDS.
     */
    public static email(): string {
        return RandomText.words(2, 6) + "@" + RandomText.words(1, 3) + ".com";
    }

    /**
     * Generates a random text, consisting of first names, last names, colors, stuffs, adjectives, verbs, and punctuation marks.
     * 
     * @param minSize   minimum amount of words to generate. If 'maxSize' is not given,
     *                  text will contain 'minSize' words.
     * @param maxSize   (optional) maximum amount of words to generate.
     * @returns         generated text.
     */
    public static text(minSize: number, maxSize: number = null): string {
        maxSize = Math.max(minSize, maxSize || minSize);
        let size = RandomInteger.nextInteger(minSize, maxSize);

        let result = '';
        result += RandomString.pick(RandomText._allWords);

        while (result.length < size) {
            let next = RandomString.pick(RandomText._allWords);
            if (RandomBoolean.chance(4, 6))
                next = " " + next.toLowerCase();
            else if (RandomBoolean.chance(2, 5))
                next = RandomString.pickChar(":,-") + next.toLowerCase();
            else if (RandomBoolean.chance(3, 5))
                next = RandomString.pickChar(":,-") + " " + next.toLowerCase();
            else
                next = RandomString.pickChar(".!?") + " " + next;

            result += next;
        }

        return result;
    }

}

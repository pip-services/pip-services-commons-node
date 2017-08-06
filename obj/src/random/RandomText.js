"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RandomInteger_1 = require("./RandomInteger");
var RandomString_1 = require("./RandomString");
var RandomBoolean_1 = require("./RandomBoolean");
var RandomText = (function () {
    function RandomText() {
    }
    RandomText.color = function () {
        return RandomString_1.RandomString.pick(RandomText._colors);
    };
    RandomText.stuff = function () {
        return RandomString_1.RandomString.pick(RandomText._stuffs);
    };
    RandomText.adjective = function () {
        return RandomString_1.RandomString.pick(RandomText._adjectives);
    };
    RandomText.verb = function () {
        return RandomString_1.RandomString.pick(RandomText._verbs);
    };
    RandomText.phrase = function (minSize, maxSize) {
        if (maxSize === void 0) { maxSize = null; }
        maxSize = Math.max(minSize, maxSize || minSize);
        var size = RandomInteger_1.RandomInteger.nextInteger(minSize, maxSize);
        if (size <= 0)
            return "";
        var result = '';
        result += RandomString_1.RandomString.pick(RandomText._allWords);
        while (result.length < size) {
            result += " " + RandomString_1.RandomString.pick(RandomText._allWords).toLowerCase();
        }
        return result;
    };
    RandomText.fullName = function () {
        var result = '';
        if (RandomBoolean_1.RandomBoolean.chance(3, 5))
            result += RandomString_1.RandomString.pick(RandomText._namePrefixes) + " ";
        result += RandomString_1.RandomString.pick(RandomText._firstNames)
            + " " + RandomString_1.RandomString.pick(RandomText._lastNames);
        if (RandomBoolean_1.RandomBoolean.chance(5, 10))
            result += " " + RandomString_1.RandomString.pick(RandomText._nameSuffixes);
        return result;
    };
    RandomText.word = function () {
        return RandomString_1.RandomString.pick(RandomText._allWords);
    };
    RandomText.words = function (min, max) {
        if (max === void 0) { max = null; }
        var result = '';
        var count = RandomInteger_1.RandomInteger.nextInteger(min, max || min);
        for (var i = 0; i < count; i++)
            result += RandomString_1.RandomString.pick(RandomText._allWords);
        return result;
    };
    RandomText.phone = function () {
        var result = '';
        result += "("
            + RandomInteger_1.RandomInteger.nextInteger(111, 999)
            + ") "
            + RandomInteger_1.RandomInteger.nextInteger(111, 999)
            + "-"
            + RandomInteger_1.RandomInteger.nextInteger(0, 9999);
        return result;
    };
    RandomText.email = function () {
        return RandomText.words(2, 6) + "@" + RandomText.words(1, 3) + ".com";
    };
    RandomText.text = function (minSize, maxSize) {
        if (maxSize === void 0) { maxSize = null; }
        maxSize = Math.max(minSize, maxSize || minSize);
        var size = RandomInteger_1.RandomInteger.nextInteger(minSize, maxSize);
        var result = '';
        result += RandomString_1.RandomString.pick(RandomText._allWords);
        while (result.length < size) {
            var next = RandomString_1.RandomString.pick(RandomText._allWords);
            if (RandomBoolean_1.RandomBoolean.chance(4, 6))
                next = " " + next.toLowerCase();
            else if (RandomBoolean_1.RandomBoolean.chance(2, 5))
                next = RandomString_1.RandomString.pickChar(":,-") + next.toLowerCase();
            else if (RandomBoolean_1.RandomBoolean.chance(3, 5))
                next = RandomString_1.RandomString.pickChar(":,-") + " " + next.toLowerCase();
            else
                next = RandomString_1.RandomString.pickChar(".!?") + " " + next;
            result += next;
        }
        return result;
    };
    RandomText._namePrefixes = ["Dr.", "Mr.", "Mrs"];
    RandomText._nameSuffixes = ["Jr.", "Sr.", "II", "III"];
    RandomText._firstNames = [
        "John", "Bill", "Andrew", "Nick", "Pamela", "Bela", "Sergio", "George", "Hurry", "Cecilia", "Vesta", "Terry", "Patrick"
    ];
    RandomText._lastNames = [
        "Doe", "Smith", "Johns", "Gates", "Carmack", "Zontak", "Clinton", "Adams", "First", "Lopez", "Due", "White", "Black"
    ];
    RandomText._colors = [
        "Black", "White", "Red", "Blue", "Green", "Yellow", "Purple", "Grey", "Magenta", "Cian"
    ];
    RandomText._stuffs = [
        "Game", "Ball", "Home", "Board", "Car", "Plane", "Hotel", "Wine", "Pants", "Boots", "Table", "Chair"
    ];
    RandomText._adjectives = [
        "Large", "Small", "High", "Low", "Certain", "Fuzzy", "Modern", "Faster", "Slower"
    ];
    RandomText._verbs = [
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
    RandomText._allWords = RandomText._firstNames.concat(RandomText._lastNames).concat(RandomText._colors)
        .concat(RandomText._stuffs).concat(RandomText._adjectives).concat(RandomText._verbs);
    return RandomText;
}());
exports.RandomText = RandomText;
//# sourceMappingURL=RandomText.js.map
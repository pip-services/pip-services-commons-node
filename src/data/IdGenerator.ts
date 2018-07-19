let uuid = require('uuid');

// Maps for number <-> hex string conversion
let byteToHex = [];
for (let i = 0; i < 256; i++) {
    byteToHex[i] = (i + 0x100).toString(16).substr(1);
}

/**
 * Contains standard design patterns for generating GUIDs.
 */
export class IdGenerator {
    
    /**
     * Generates a new short (9-digit number) id using Math.random().
     */
    public static nextShort(): string {
        return Math.ceil(100000000 + Math.random() * 899999999).toString();
    }

    private static uuidToHex(buffer) {
        return   byteToHex[buffer[0]]  + byteToHex[buffer[1]]
               + byteToHex[buffer[2]]  + byteToHex[buffer[3]] 
               + byteToHex[buffer[4]]  + byteToHex[buffer[5]] 
               + byteToHex[buffer[6]]  + byteToHex[buffer[7]] 
               + byteToHex[buffer[8]]  + byteToHex[buffer[9]] 
               + byteToHex[buffer[10]] + byteToHex[buffer[11]]
               + byteToHex[buffer[12]] + byteToHex[buffer[13]]
               + byteToHex[buffer[14]] + byteToHex[buffer[15]];
    }

    /**
     * Generates a new long (16-digit hex) id using UUID.
     */
    public static nextLong(): string {
        var buffer = new Array(16);
        return IdGenerator.uuidToHex(uuid.v4(null, buffer));
    }
        
}

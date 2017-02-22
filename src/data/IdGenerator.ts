let shortid = require('shortid');
let uuid = require('node-uuid');

// Maps for number <-> hex string conversion
let byteToHex = [];
for (let i = 0; i < 256; i++) {
    byteToHex[i] = (i + 0x100).toString(16).substr(1);
}

export class IdGenerator {
    
    public static nextShort(): string {
        return shortid.generate();
    }

    public static nextShort2(): string {
        return Math.random().toString(36).substr(2, 10); // remove `0.`
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

    public static nextLong(): string {
        var buffer = new Array(16);
        return IdGenerator.uuidToHex(uuid.v4(null, buffer));
    }
        
}

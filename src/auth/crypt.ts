import { Injectable } from '@nestjs/common';
import { ConfigService, ConfigModule } from '@nestjs/config';
import * as crypto from "crypto";

@Injectable()
export class Crypt {
    private readonly iv: Buffer;
    private readonly key: Buffer;
    private readonly algo: string;
    constructor() {
        this.iv = Buffer.from("a2xhcgAAAAAAAAAA");
        this.key = Buffer.from(process.env.CRYPT_KEY);
        this.algo = process.env.ALGORITHM;
    }
    encrypt(text: string) {
        let cipher = crypto.createCipheriv(this.algo, this.key, this.iv);
        let encrypted: Buffer = Buffer.concat([cipher.update(text), cipher.final()]);
        return encrypted.toString('hex');
    }
    decrypt(text: string, Iv: string) {
        let iv = Buffer.from(Iv, 'hex');
        let encryptedText = Buffer.from(text, 'hex');
        let decipher = crypto.createDecipheriv(process.env.ALGORITHM, Buffer.from(process.env.CRYPT_KEY), iv);
        let decrypted = decipher.update(encryptedText);
        decrypted = Buffer.concat([decrypted, decipher.final()]);
        return decrypted.toString();
    }
}



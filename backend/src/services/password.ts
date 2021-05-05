import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';

const scryptAsync = promisify(scrypt);

export class Password {
  // 直接使用 Class 的 static method toHash 做 hashing
  static async toHash(password: string) {
    const salt = randomBytes(8).toString('hex');
    const buf = (await scryptAsync(password, salt, 64)) as Buffer;
    //  =  (...) as Buffer 讓 TypeScript 知道這是 Buffer Object
    
    return `${buf.toString('hex')}.${salt}`;
  }

  // 直接使用 Class 的 static method compare做 驗證密碼

  static async compare(storedPassword: string, suppliedPassword: string) {
    const [hashedPassword, salt] = storedPassword.split('.');
    const buf = (await scryptAsync(suppliedPassword, salt, 64)) as Buffer;

    return buf.toString('hex') === hashedPassword;
  }
}

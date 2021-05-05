import bcrypt from 'bcryptjs';

// https://www.udemy.com/course/microservices-with-node-js-and-react/learn/lecture/19119682#questions/12912026
export class PasswordManager {
  static async toHash(password: string) {
    return bcrypt.hash(password, 8);
  }

  static async compare(
    passwordHashedFromDB: string,
    passwordFromLogin: string
  ) {
    return bcrypt.compare(passwordFromLogin, passwordHashedFromDB);
  }
}

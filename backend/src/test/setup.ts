import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../app';

// 在全域環境中定義一個 signin 的 helper function 簡化登入流程的程式碼
declare global {
  namespace NodeJS {
    interface Global {
      signin(): Promise<string[]>;
    }
  }
}

// global helper function for signing in and get cookie automatically
// 在別的test function裡面使用: await global.signin();
global.signin = async () => {
  const email = 'test@test.com';
  const password = 'password';

  const response = await request(app)
    .post('/api/users/signup')
    .send({
      email,
      password,
    })
    .expect(201);

  // const responseFromSignin = await request(app)
  // .post('/api/users/signin')
  // .send({
  //   email,
  //   password,
  // })
  //   .expect(201);

  // const cookie = responseFromSignin.get('Set-Cookie');

  const cookie = response.get('Set-Cookie');

  return cookie;
};

let mongo: any;

//beforeAll: 在測試開始之前建立測試環境
beforeAll(async () => {
  process.env.JWT_SECRET = 'aSecretJWTToken';
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

  mongo = new MongoMemoryServer();
  const mongoUri = await mongo.getUri();

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

// 刪除 mongodb 中的資料
beforeEach(async () => {
  //https://www.udemy.com/course/microservices-with-node-js-and-react/learn/lecture/19120460#questions/12138894
  jest.clearAllMocks();
  jest.setTimeout(30000);

  // 找出所有 collection
  const collections = await mongoose.connection.db.collections();
  // 刪除每個 collection中所有資料
  // for (let collection of collections) {
  //   await collection.deleteMany({});
  // }
  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany({});
  }
});

//
afterAll(async () => {
  await mongo.stop(); // stop mongodb
  await mongoose.connection.close(); // disconnect from db
});

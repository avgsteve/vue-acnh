import mongoose, { Schema } from 'mongoose';
import { Password } from '../services/password';
import bcrypt from 'bcryptjs';

// An interface that describes the properties
// that are required to create a new User
interface IUserAttributes {
  email: string;
  password: string;
}

// An interface that describes the properties
// that a User Document has
interface IUserDocProperties extends mongoose.Document {
  email: string;
  password: string;
}


export interface IUserPassword extends mongoose.Document {
  hashed_password: string;
  passwordLastUpdated: Date;
}




// An interface that describes the properties
// that a User Model has
// #1: 這個IUserModel interface 繼承了 mongoose 內建的 Model Interface，
//    是為了在原本的Model Interface的基礎上再加一個 buildNewUser method
// #2: 透過 interface 讓 TypeScript 允許 在 userSchema 物件中加入 static method: buildNewUser

interface IUserModel extends mongoose.Model<IUserDocProperties> {
  buildNewUser(attrs: IUserAttributes): IUserDocProperties;
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String, // String constructor
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    // passwordHashed: {
    //   type: String,
    // },
  },
  {
    // timestamps: true,
    toJSON: {
      transform(doc, ret) {
        // ret 表示要被傳出的文件(document)
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      }
    }
  }
);

// 使用 bcrypt
//  https://www.udemy.com/course/microservices-with-node-js-and-react/learn/lecture/19119676#questions/12756123
userSchema.virtual('passwordToHash').set(function (
  this: { passwordHashed: string }, // arg#1
  value: string // arg#2
) {
  this.passwordHashed = bcrypt.hashSync(value, 12);
});

// MANAGE PASSWORD ENCRYPTION
userSchema.methods.verifyPassword = function (password: string) {
  return bcrypt.compareSync(password, this.passwordHash);
};

userSchema.virtual('password')
  .set(async function (this: IUserPassword, password: any,) {
    const saltRound = 10;
    this.hashed_password = await bcrypt.hash(password, saltRound);
    this.passwordLastUpdated = new Date();
    await this.save();
  })
  .get(function (this: IUserPassword) {
    return this.hashed_password;
  });


// 自動將使用者註冊的密碼 hash
userSchema.pre('save', async function (done) {
  // this 指向透過 UserModel 建立的文件 (Mongoose model instance)
  if (this.isModified('password')) {
    const hashed = await Password.toHash(this.get('password'));
    this.set('password', hashed);
  }
  done();
});

// // IUserAttributes 的使用方法
// const buildNewUser = (attr: IUserAttributes) => {
//   return new UserModel(attr);
// };
// buildNewUser({
//   email: 'test@gmail.com',
//   password: 'd123123',
//   // abc : 1231 // 使用 interface 規定以外的屬性abc會讓 TypeScript 提示以下錯誤
//   // Argument of type '{ email: string; password: string; abc: number; }' is not assignable to parameter of type 'IUserAttributes'.
//   // Object literal may only specify known properties, and 'abc' does not exist in type 'IUserAttributes'.ts(2345)
// });

// 在 schema 新增 static method: buildNewUser
// 讓 build function 變成 userSchema 內建的 build method
userSchema.statics.buildNewUser = (
  attrs: IUserAttributes
  // 透過 interface IUserAttributes，
  // 規範傳進 buildNewUser method 的 attrs 物件需要包含的屬性和型別
) => {
  return new UserModel(attrs);
};


// User model
const UserModel = mongoose.model<
  // generic type arguments
  IUserDocProperties, // 規範且定義新建立的 user document 要有的屬性(例如物件的property)
  IUserModel // 規範且定義回傳的物件類別(Type)是甚麼?
>(
  'User', // arg#1: 在資料庫中的 Collection Name (也就是SQL的table)
  userSchema // arg#2 在collection中建立新文件的的樣板 (schema)
);

export {
  UserModel,
  // buildNewUser
};

/*
// 其他人的解釋
https://www.udemy.com/course/microservices-with-node-js-and-react/learn/lecture/19119652#questions/11574316

The UserDoc represents the type that is returned when using the model to create a single document or instance (e.g. when calling User.build).

UserModel represents the type of the entire collection, or Model, that is returned when calling mongoose.model('User', userSchema).

Here, we passed UserModel because we modified the Mongoose library's model when we added the "build" function. Otherwise, it would not have been needed. For example, I used the solution that was suggested in the previous video's comments.

With that solution we didn't need to use the build function, so there was no need to modify the Mongoose Model, and thus no need to create and pass in UserModel.



 */

// 參考另一個比較簡單的方式:
// https://www.udemy.com/course/microservices-with-node-js-and-react/learn/lecture/19119652#questions/11022788

// const UserModel = mongoose.model('User', userSchema);

// class User extends UserModel {
//   constructor(attrs: UserAttrs) {
//     super(attrs);
//   }
// }

// (...)

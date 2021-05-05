import mongoose, { Schema } from 'mongoose';

// An interface that describes the properties
// that are required to create a new User
interface IListAttributes {
  email: string;
  password: string;
}

// An interface that describes the properties
// that a User Document has
interface IListDocProperties extends mongoose.Document {
  email: string;
  password: string;
}

// An interface that describes the properties
// that a User Model has
// #1: 這個IUserModel interface 繼承了 mongoose 內建的 Model Interface，
//    是為了在原本的Model Interface的基礎上再加一個 buildNewList method
// #2: 透過 interface 讓 TypeScript 允許 在 listSchema 物件中加入 static method: buildNewList

interface IListModel extends mongoose.Model<IListDocProperties> {
  buildNewList(attrs: IListAttributes): IListDocProperties;
}

const listSchema = new mongoose.Schema(
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

      }
    }
  }
);

listSchema.statics.buildNewList = (
  attrs: IListAttributes
  // 透過 interface IUserAttributes，
  // 規範傳進 buildNewList method 的 attrs 物件需要包含的屬性和型別
) => {
  return new ListModel(attrs);
};


// User model
const ListModel = mongoose.model<
  // generic type arguments
  IListDocProperties, // 規範且定義新建立的 user document 要有的屬性(例如物件的property)
  IListModel // 規範且定義回傳的物件類別(Type)是甚麼?
>(
  'List', // arg#1: 在資料庫中的 Collection Name (也就是SQL的table)
  listSchema // arg#2 在collection中建立新文件的的樣板 (schema)
);

export {
  ListModel,
  // buildNewList
};

/*
// 其他人的解釋
https://www.udemy.com/course/microservices-with-node-js-and-react/learn/lecture/19119652#questions/11574316

The UserDoc represents the type that is returned when using the model to create a single document or instance (e.g. when calling User.build).

ListModel represents the type of the entire collection, or Model, that is returned when calling mongoose.model('User', listSchema).

Here, we passed ListModel because we modified the Mongoose library's model when we added the "build" function. Otherwise, it would not have been needed. For example, I used the solution that was suggested in the previous video's comments.

With that solution we didn't need to use the build function, so there was no need to modify the Mongoose Model, and thus no need to create and pass in ListModel.



 */

// 參考另一個比較簡單的方式:
// https://www.udemy.com/course/microservices-with-node-js-and-react/learn/lecture/19119652#questions/11022788

// const ListModel = mongoose.model('User', listSchema);

// class User extends ListModel {
//   constructor(attrs: UserAttrs) {
//     super(attrs);
//   }
// }

// (...)

import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ListDataSchema = new Schema(
  {
    listData: { type: Object },
    owner: {
      type: Schema.Types.ObjectId, ref: 'User'
    },
    ownerName: {
      type: String
    }
  },
  {
    strict: false,
    timestamps: true
  }
);


let ListData = mongoose.model<any, any>('List_Data', ListDataSchema);


export default ListData;
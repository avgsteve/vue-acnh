import Mongoose from 'mongoose';

const modelName = "items_all";

//Employee Model without any fixed schema
const ItemSchema = new Mongoose.Schema({},
  { strict: false, collection: "items_all" }
);


const Item = Mongoose.model(modelName, ItemSchema);

export default Item;
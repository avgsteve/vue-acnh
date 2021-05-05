import Mongoose from 'mongoose';

const modelName = "translation-creatures";

//Employee Model without any fixed schema
const CreaturesSchema = new Mongoose.Schema({},
  { strict: false, collection: "translation-creatures" }
);


const Creatures = Mongoose.model(modelName, CreaturesSchema);

export default Creatures;
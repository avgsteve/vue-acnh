
require('dotenv').config()
import mongoose from 'mongoose';
//@ts-ignore
const mongoDbConnectUri: string = process.env.MONGODB_URI;



const connectToDB = async (cb: Function) => {

    console.log('mongoDbConnectUri: ', mongoDbConnectUri);

    try {

        if (!mongoDbConnectUri) throw Error('Need valid mongoDbConnectUri string for database connection')

        const connection = await mongoose.connect(mongoDbConnectUri,
            {
                // config for Mongoose
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true,
                useFindAndModify: false,
            }
        );
        console.log(`MongoDB Connected`);
        cb(); // cb is server start function
        // console.log(connection);
    } catch (error) {
        console.log(`Error while connecting to DB: \n`, error);
    }

};

export default connectToDB;
import mongoose from 'mongoose';
import dotenv from "dotenv-defaults";

dotenv.config();
const url = process.env.MONGO_URL;

export default {
    connect: () => {
        mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }).then(() => console.log(`MongoDB connection created. URL = ${url}`));
    }
};
import mongoose from "mongoose";
import dotenv from "dotenv-defaults";

export default {
    connect: () => {
        dotenv.config();
        if (!process.env.MONGO_URL) {
            console.error("Missing MONGO_URL!!!");
            process.exit(1);
        }
        mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName: "hw8"
        }).then((res) => console.log("MongoDB connection created"));
        mongoose.connection.on(
            "error",
            console.error.bind(console, "Connection error:")
        );
    }
};
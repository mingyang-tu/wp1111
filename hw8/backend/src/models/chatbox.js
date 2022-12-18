import mongoose from "mongoose";
const Schema = mongoose.Schema;

/******* ChatBox Schema *******/
const ChatBoxSchema = new Schema({
    chatName: { type: String, required: [true, "Name field is required."] },
    messages: [{
        id: { type: String },
        sender: { type: String },
        body: { type: String }
    }],
}, {
    collection: "ChatBox"
});
const ChatBoxModel = mongoose.model("ChatBox", ChatBoxSchema);

/******* Login Schema *******/
const LoginSchema = new Schema({
    username: { type: String, required: [true, "Username field is required."] },
    password: { type: String, required: [true, "Password field is required."] },
}, {
    collection: "Login"
});
const LoginModel = mongoose.model("Login", LoginSchema);

export { ChatBoxModel, LoginModel };
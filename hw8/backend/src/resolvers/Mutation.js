import { v4 as uuidv4 } from "uuid";
import { checkOutChatBox, makeChatName } from "./utils";

const Mutation = {
    createChatBox: async (parent, { name1, name2 }, { ChatBoxModel }) => {
        try {
            await checkOutChatBox({ name1, name2, ChatBoxModel });
            return { type: "success", msg: "Chatbox created." };
        } catch (error) {
            return { type: "error", msg: "Internal Server Error (createChatBox)" };
        }
    },
    createMessage: async (parent, { from, to, body }, { ChatBoxModel, pubsub }) => {
        try {
            const chatBox = await checkOutChatBox({
                name1: from,
                name2: to,
                ChatBoxModel
            });
            const newMsg = {
                id: uuidv4(),
                sender: from,
                body
            };
            chatBox.messages.push(newMsg);
            await chatBox.save();

            const chatName = makeChatName([from, to])
            pubsub.publish(
                `chatBox ${chatName}`,
                { message: newMsg }
            );
            return { type: "success", msg: "Message sent." };
        } catch (error) {
            return { type: "error", msg: "Internal Server Error (createMessage)" };
        }
    },
    startLogin: async (parent, { username, password }, { LoginModel }) => {
        try {
            let user = await LoginModel.findOne({ username });
            let valid = await LoginModel.findOne({ username, password });
            if (!user) {
                return { type: "error", msg: "This account doesn't exist." };
            }
            if (!valid) {
                return { type: "error", msg: "Wrong password." };
            }
            return { type: "success", msg: "Login successfully." };
        } catch (error) {
            return { type: "error", msg: "Internal Server Error (startLogin)" };
        }
    },
    startSignup: async (parent, { username, password }, { LoginModel }) => {
        try {
            let user = await LoginModel.findOne({ username });
            if (user) {
                return { type: "error", msg: "This account already exists." };
            }
            const newUser = new LoginModel({ username, password });
            await newUser.save();
            return { type: "success", msg: "Sign up successfully." };
        } catch (error) {
            return { type: "error", msg: "Internal Server Error (startSignup)" };
        }
    },
    deleteCache: () => {
        try {
            return { type: "success", msg: "Success" };
        } catch (error) {
            return { type: "error", msg: "Internal Server Error (deleteCache)" };
        }
    },
};

export default Mutation;
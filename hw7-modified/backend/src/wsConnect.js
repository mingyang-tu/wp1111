import { MessageModel, ChatBoxModel, LoginModel } from "./models/chatbox";
import { printChatBox } from "./utils/printInfo"

const validateChatBox = async (name, participants) => {
    let box = await ChatBoxModel.findOne({ name });
    if (!box) {
        box = await new ChatBoxModel({ name, users: participants }).save();
    }
    return box.populate("messages");
    /*
    return chatbox 
            ├── name
            ├── users
            └── messages
                ├── sender
                └── body
    */
};

const sendData = (data, ws) => {
    ws.send(JSON.stringify(data));
}
const sendStatus = (payload, ws) => {
    sendData(["status", payload], ws);
}

export default {
    onMessage: (ws, chatBoxes) => (
        async (byteString) => {
            const { data } = byteString;
            const [task, payload] = JSON.parse(data);
            switch (task) {
                case "CHAT": {
                    const { chatName, participants } = payload;

                    if (!chatBoxes[chatName])
                        chatBoxes[chatName] = {
                            active: new Set(), 
                            inactive: new Set() 
                        };
                    if (ws.box["active"] !== "") {
                        chatBoxes[ws.box["active"]]["active"].delete(ws);
                        chatBoxes[ws.box["active"]]["inactive"].add(ws);
                        ws.box["inactive"].add(ws.box["active"]);
                    }
                    chatBoxes[chatName]["active"].add(ws);
                    chatBoxes[chatName]["inactive"].delete(ws);
                    ws.box["active"] = chatName;

                    printChatBox(chatBoxes);

                    const currBox = validateChatBox(chatName, participants);
                    const msgs = (await currBox).messages;
                    const sent = msgs.map((item) => (
                        { chatName, sender: item.sender, body: item.body }
                    ))
                    sendData(["init", sent], ws);
                    break;
                }

                case "MESSAGE": {
                    const { chatName, sender, body } = payload;
                    // Save payload to DB
                    const message = new MessageModel({ sender, body });
                    await message.save();
                    // Update chatBox
                    await ChatBoxModel.updateOne(
                        { name: chatName },
                        { $push: { messages: message._id } }
                    );
                    // Respond to client
                    chatBoxes[chatName]["active"].forEach((client) => {
                        sendData(["sendActive", [payload]], client);
                    })
                    chatBoxes[chatName]["inactive"].forEach((client) => {
                        sendData(["sendInactive", [payload]], client);
                    })
                    sendStatus({ type: "success", msg: "Message sent." }, ws);
                    break;
                }

                case "CLOSE": {
                    const { chatName } = payload;
                    if (chatBoxes[chatName]) {
                        chatBoxes[chatName]["active"].delete(ws);
                        chatBoxes[chatName]["inactive"].delete(ws);
                    }
                    if (ws.box["active"] === chatName) ws.box["active"] = "";
                    ws.box["inactive"].delete(chatName);

                    printChatBox(chatBoxes);
                    break;
                }

                case "LOGIN": {
                    const { username, password } = payload;
                    let user = await LoginModel.findOne({ username });
                    let valid = await LoginModel.findOne({ username, password });
                    if (!user) {
                        sendData(["login", false], ws);
                        sendStatus({ type: "error", msg: "This account doesn't exist." }, ws);
                    }
                    else if (!valid) {
                        sendData(["login", false], ws);
                        sendStatus({ type: "error", msg: "Wrong password." }, ws);
                    }
                    else {
                        sendData(["login", true], ws);
                        sendStatus({ type: "success", msg: "Login success." }, ws);
                    }
                    break;
                }

                case "SIGNUP": {
                    const { username, password } = payload;
                    let user = await LoginModel.findOne({ username });
                    if (user) {
                        sendStatus({ type: "error", msg: "This account already exists." }, ws);
                    }
                    else {
                        const newUser = new LoginModel({ username, password });
                        await newUser.save();
                        sendStatus({ type: "success", msg: "Sign up success." }, ws);
                    }
                    break;
                }

                default:
                    break;
            }
        }
    )
}
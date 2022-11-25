import { MessageModel, ChatBoxModel, LoginModel } from "./models/chatbox";

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

const broadcastMessage = (data, wss) => {
    wss.clients.forEach((client) => {
        sendData(data, client);
    });
};

const sendData = (data, ws) => {
    ws.send(JSON.stringify(data));
}
const sendStatus = (payload, ws) => {
    sendData(["status", payload], ws);
}

export default {
    onMessage: (ws, wss) => (
        async (byteString) => {
            const { data } = byteString;
            const [task, payload] = JSON.parse(data);
            switch (task) {
                case "CHAT": {
                    const { chatName, participants } = payload;
                    const currBox = validateChatBox(chatName, participants);
                    const msgs = (await currBox).messages;
                    let pld = [];
                    for (const m of msgs) {
                        const sender = m.sender;
                        const body = m.body;
                        pld.push({ chatName, sender, body });
                    }
                    broadcastMessage(["init", pld], wss)
                    break;
                }

                case "MESSAGE": {
                    const { chatName, sender, body } = payload;
                    // Save payload to DB
                    const message = new MessageModel({ sender, body });
                    try {
                        await message.save();
                    }
                    catch (e) {
                        throw new Error("Message DB save error: " + e);
                    }
                    // Update chatBoxes
                    try {
                        await ChatBoxModel.updateOne(
                            { name: chatName },
                            { $push: { messages: message._id } }
                        );
                    }
                    catch (e) {
                        throw new Error("ChatBox DB save error: " + e);
                    }
                    // Respond to client
                    broadcastMessage(["output", [payload]], wss)
                    sendStatus({ type: "success", msg: "Message sent." }, ws)
                    break;
                }
                case "LOGIN": {
                    const { username, password } = payload;
                    let user = await LoginModel.findOne({ username });
                    let valid = await LoginModel.findOne({ username, password });
                    if (!user) {
                        sendData(["login", false], ws)
                        sendStatus({ type: "error", msg: "This account doesn't exist." }, ws)
                    }
                    else if (!valid) {
                        sendData(["login", false], ws)
                        sendStatus({ type: "error", msg: "Wrong password." }, ws)
                    }
                    else {
                        sendData(["login", true], ws)
                        sendStatus({ type: "success", msg: "Login success." }, ws)
                    }
                    break;
                }
                case "SIGNUP": {
                    const { username, password } = payload;
                    let user = await LoginModel.findOne({ username });
                    if (user) {
                        sendStatus({ type: "error", msg: "This account already exists." }, ws)
                    }
                    else {
                        const newUser = new LoginModel({ username, password });
                        try {
                            await newUser.save();
                        }
                        catch (e) {
                            throw new Error("Login DB save error: " + e);
                        }
                        sendStatus({ type: "success", msg: "Sign up success." }, ws)
                    }
                    break;
                }

                default:
                    break;
            }
        }
    )
}
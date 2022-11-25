import { MessageModel, ChatBoxModel } from "./models/chatbox";

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

                default:
                    break;
            }
        }
    )
}
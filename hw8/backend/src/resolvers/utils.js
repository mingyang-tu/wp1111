const makeChatName = (p) => (p.sort().join("_"));

const checkOutChatBox = async ({ name1, name2, ChatBoxModel }) => {
    const chatName = makeChatName([name1, name2])
    let box = await ChatBoxModel.findOne({ chatName });
    if (!box)
        box = await new ChatBoxModel({ chatName }).save();
    return box;
}

export {checkOutChatBox, makeChatName}
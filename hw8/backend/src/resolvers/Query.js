import { checkOutChatBox } from "./utils";

const Query = {
    chatBox: (parent, { name1, name2 }, { ChatBoxModel }) => {
        return checkOutChatBox({ name1, name2, ChatBoxModel });
    }
};

export default Query;
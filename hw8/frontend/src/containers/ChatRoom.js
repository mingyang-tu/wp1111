import { useState } from "react";
import styled from "styled-components";
import { Input, Tabs } from "antd";
import Title from "../components/Title";
import ChatModal from "../components/ChatModal";
import ChatBox from "./ChatBox";
import { useChat } from "./hooks/useChat";

const ChatBoxesWrapper = styled(Tabs)`
    width: 100%;
    height: 300px;
    background: #eeeeee52;
    border-radius: 10px;
    margin: 20px;
    padding: 20px;
    .ant-tabs-content-holder {
        overflow: auto;
    }
`;

const ChatRoom = () => {
    const { setStatus, me, startChat, sendMessage, deleteCache } = useChat();
    const [body, setBody] = useState("");
    const [activeKey, setActiveKey] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [chatBoxes, setChatBoxes] = useState([]);

    const createChatBox = async (friend) => {
        if (chatBoxes.some(({ key }) => key === friend)) {
            throw new Error(friend + "'s chat box has already opened.");
        }

        await startChat({ name1: me, name2: friend });

        setChatBoxes([
            ...chatBoxes,
            {
                label: friend,
                children: <ChatBox me={me} friend={friend} />,
                key: friend
            }
        ]);

        return friend;
    };

    const removeChatBox = (targetKey, activeKey) => {
        const index = chatBoxes.findIndex(({ key }) => key === activeKey);
        const newChatBoxes = chatBoxes.filter(({ key }) => key !== targetKey);
        setChatBoxes(newChatBoxes);

        deleteCache({ name1: me, name2: targetKey })

        return (
            activeKey ? (
                (activeKey === targetKey) ? (
                    (newChatBoxes.length === 0) ? "" : (
                        (index === 0) ? chatBoxes[index + 1].key : chatBoxes[index - 1].key
                    )
                ) : activeKey
            ) : ""
        );
    };

    return (
        <>
            <Title name={me} />
            <>
                <ChatBoxesWrapper
                    type="editable-card"
                    tabBarStyle={{ height: 40 }}
                    activeKey={activeKey}
                    onChange={(key) => {
                        setActiveKey(key);
                    }}
                    onEdit={(targetKey, action) => {
                        if (action === "add") {
                            setModalOpen(true);
                        }
                        else if (action === "remove") {
                            setActiveKey(removeChatBox(targetKey, activeKey));
                        }
                    }}
                    items={chatBoxes}
                />
                <ChatModal
                    open={modalOpen}
                    onCreate={async ({ name }) => {
                        const key = await createChatBox(name);
                        setActiveKey(key);
                        setModalOpen(false);
                    }}
                    onCancel={() => { setModalOpen(false); }}
                />
            </>
            <Input.Search
                value={body}
                onChange={(e) => setBody(e.target.value)}
                enterButton="Send"
                placeholder="Type a message here..."
                onSearch={(msg) => {
                    if (!msg) {
                        setStatus({
                            type: "error",
                            msg: "Please enter a message."
                        });
                        return;
                    }
                    if (!activeKey) {
                        setStatus({
                            type: "error",
                            msg: "Please open a chatroom."
                        });
                        return;
                    }
                    sendMessage({
                        from: me,
                        to: activeKey,
                        body: msg
                    });
                    setBody("");
                }}
            />
        </>
    )
}

export default ChatRoom;
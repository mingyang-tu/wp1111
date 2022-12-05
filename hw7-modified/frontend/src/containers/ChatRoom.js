import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Input, Tabs } from "antd";
import Title from "../components/Title";
import Message from "../components/Message";
import ChatTabBar from "../components/ChatTabBar";
import ChatModal from "../components/ChatModal";
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
const FootRef = styled.div`
    height: 20px;
`;

const ChatRoom = () => {
    const { setStatus, me, messages, notices, startChat, closeChat, sendMessage } = useChat();
    const [body, setBody] = useState("");
    const [activeKey, setActiveKey] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [chatBoxes, setChatBoxes] = useState([]);
    const [scroll, setScroll] = useState(false);

    // 訊息出現就拉到最底部
    const msgFooter = useRef()
    const scrollToBottom = () => {
        msgFooter.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    useEffect(() => {
        scrollToBottom();
        setScroll(false);
    }, [scroll]);

    // 顯示 messages 的 DOM
    const renderChat = (chat) => {
        return (
            <>
                {(chat.length === 0) ? (
                    <p style={{ color: "#ccc" }}>No messages...</p>
                ) : (
                    chat.map(({ sender, body }, i) => {
                        return <Message isMe={sender === me} sender={sender} message={body} key={i} />
                    })
                )}
                <FootRef ref={msgFooter} />
            </>
        )
    }

    // 重新 render chatBoxes
    useEffect(() => {
        setChatBoxes((prev) => prev.map(({ label, key }) => {
            return {
                label,
                children: renderChat(messages),
                key
            }
        }));
        setScroll(true);
    }, [messages])

    useEffect(() => {
        setChatBoxes((prev) => prev.map(({ children, key }) => {
            const p = [me, key].sort().join("_");
            const notice = notices.filter(({ chatName }) => (chatName === p));
            return {
                label: ChatTabBar({ label: key, notice: notice.length }),
                children,
                key
            }
        }));
    }, [notices])

    const createChatBox = (friend) => {
        if (chatBoxes.some(({ key }) => key === friend)) {
            throw new Error(friend + "'s chat box has already opened.");
        }

        setChatBoxes([
            ...chatBoxes,
            {
                label: ChatTabBar({ label: friend, notice: 0 }),
                children: renderChat(messages),
                key: friend
            }
        ]);

        return friend;
    };

    const removeChatBox = (targetKey, activeKey) => {
        const index = chatBoxes.findIndex(({ key }) => key === activeKey);
        const newChatBoxes = chatBoxes.filter(({ key }) => key !== targetKey);
        setChatBoxes(newChatBoxes);
        closeChat([me, targetKey]);
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
                        startChat([me, key]);
                    }}
                    onEdit={(targetKey, action) => {
                        if (action === "add") {
                            setModalOpen(true);
                        }
                        else if (action === "remove") {
                            const key = removeChatBox(targetKey, activeKey);
                            setActiveKey(key);
                            if (key) startChat([me, key]);
                        }
                    }}
                    items={chatBoxes}
                />
                <ChatModal
                    open={modalOpen}
                    onCreate={({ name }) => {
                        setActiveKey(createChatBox(name));
                        startChat([me, name]);
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
                    sendMessage([me, activeKey], me, msg);
                    setBody("");
                }}
            />
        </>
    )
}

export default ChatRoom;
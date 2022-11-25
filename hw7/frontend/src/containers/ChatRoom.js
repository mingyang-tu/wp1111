import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Input, Tabs } from "antd";
import Title from "../components/Title";
import Message from "../components/Message";
import ChatModal from "../components/ChatModal";
import { useChat } from "./hooks/useChat";

const ChatBoxesWrapper = styled(Tabs)`
    width: 100%;
    height: 300px;
    background: #eeeeee52;
    border-radius: 10px;
    margin: 20px;
    padding: 20px;
    overflow: auto;
`;
const FootRef = styled.div`
    height: 20px;
`;

const ChatRoom = () => {
    const { me, messages, setMessages, startChat, sendMessage, displayStatus } = useChat();
    const [body, setBody] = useState("");
    const [activeKey, setActiveKey] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [chatBoxes, setChatBoxes] = useState([]);
    const [fac, setFAC] = useState([]);

    // 訊息出現就拉到最底部
    const msgFooter = useRef()
    const scrollToBottom = () => {
        msgFooter.current?.scrollIntoView({ behavior: 'smooth', block: "start" });
    };

    // 顯示 messages 的 DOM
    const renderChat = (chat) => {
        return (
            <>
                {(chat.length === 0) ? (
                    <p style={{ color: '#ccc' }}>No messages...</p>
                ) : (
                    chat.map(({ sender, body }, i) => {
                        return <Message isMe={sender === me} sender={sender} message={body} key={i} />
                    })
                )}
                <FootRef ref={msgFooter} />
            </>
        )
    }
    const extractChat = (name) => {
        return renderChat(messages.filter(({ chatName }) => (chatName === name)))
    }

    // 重新 render chatBoxes
    useEffect(() => {
        setChatBoxes(fac.map(({ friend, chatName }) => {
            return {
                label: friend,
                children: extractChat(chatName),
                key: chatName
            }
        }));
    }, [messages, fac])

    // render 完後拉到最底部
    useEffect(() => {
        scrollToBottom();
    }, [chatBoxes])

    const createChatBox = (friend) => {
        const participants = [me, friend].sort();
        const chatName = participants.join('_');

        if (chatBoxes.some(({ key }) => key === chatName)) {
            throw new Error(friend + "'s chat box has already opened.");
        }

        // 從資料庫拿 Chat 到前端
        startChat({ chatName, participants });

        setFAC([...fac, { friend, chatName }])

        return chatName;
    };

    const removeChatBox = (targetKey, activeKey) => {
        const index = fac.findIndex(({ chatName }) => chatName === activeKey);
        const newFAC = fac.filter(({ chatName }) => (chatName !== targetKey));
        setFAC(newFAC);
        const newMessages = messages.filter(({ chatName }) => (chatName !== targetKey));
        setMessages(newMessages);
        return (
            activeKey ? (
                (activeKey === targetKey) ? (
                    (index === 0) ? '' : fac[index - 1].chatName
                ) : activeKey
            ) : ''
        );
    };

    return (
        <>
            <Title name={me} />
            <>
                <ChatBoxesWrapper
                    type="editable-card"
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
                    onCreate={({ name }) => {
                        setActiveKey(createChatBox(name));
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
                        displayStatus({
                            type: "error",
                            msg: "Please enter a message."
                        });
                        return;
                    }
                    if (!activeKey) {
                        displayStatus({
                            type: "error",
                            msg: "Please open a chatroom."
                        });
                        return;
                    }
                    sendMessage({ chatName: activeKey, sender: me, body: msg });
                    setBody('');
                }}
            />
        </>
    )
}

export default ChatRoom;
import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Spin } from 'antd';
import Message from "../components/Message";
import { useChat } from "./hooks/useChat";
import { useQuery } from "@apollo/client";
import { CHATBOX_QUERY, MESSAGE_SUBSCRIPTION } from "../graphql";

const FootRef = styled.div`
    height: 20px;
`;

const ChatBox = ({ me, friend }) => {
    const { setStatus } = useChat();
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

    const { data, loading, subscribeToMore } = useQuery(CHATBOX_QUERY, {
        variables: {
            name1: me,
            name2: friend,
        },
    });

    useEffect(() => {
        try {
            subscribeToMore({
                document: MESSAGE_SUBSCRIPTION,
                variables: { name1: me, name2: friend },
                updateQuery: (prev, { subscriptionData }) => {
                    if (!subscriptionData.data) return prev;
                    const newMessage = subscriptionData.data.message;
                    return {
                        chatBox: {
                            chatName: prev.chatBox.chatName,
                            messages: [...prev.chatBox.messages, newMessage]
                        }
                    };
                }
            });
        } catch (e) {
            setStatus({
                type: "error",
                msg: "Subscription Error"
            });
        }
    }, [subscribeToMore]);

    const [chat, setChat] = useState([]);
    useEffect(() => {
        if (data) {
            setChat(data.chatBox.messages);
            setScroll(true);
        }
    }, [data])

    return (
        <Spin spinning={loading} tip="Loading">
            {(chat.length === 0) ? (
                <p style={{ color: "#ccc" }}>No messages...</p>
            ) : (
                chat.map(({ sender, body }, i) => {
                    return <Message isMe={sender === me} sender={sender} message={body} key={i} />
                })
            )}
            <FootRef ref={msgFooter} />
        </Spin>
    )
}


export default ChatBox;
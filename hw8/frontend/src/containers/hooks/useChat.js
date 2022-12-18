import { createContext, useContext, useState } from "react";
import { message } from "antd";
import CryptoJS from "crypto-js";
import { useMutation } from "@apollo/client";
import { LOCALSTORAGE_KEY } from "../../global/constants";
import {
    CREATE_CHATBOX_MUTATION,
    CREATE_MESSAGE_MUTATION,
    DELETE_CACHE,
    START_LOGIN_MUTATION,
    START_SIGNUP_MUTATION
} from "../../graphql";

const ChatContext = createContext();

const ChatProvider = (props) => {
    const savedMe = localStorage.getItem(LOCALSTORAGE_KEY);

    const [status, setStatus] = useState({});
    const [me, setMe] = useState(savedMe || "");
    const [signedIn, setSignedIn] = useState(false);

    const [startChatMutation] = useMutation(CREATE_CHATBOX_MUTATION);
    const startChat = async ({ name1, name2 }) => {
        const newStatus = await startChatMutation({
            variables: { name1, name2 }
        });
        setStatus(newStatus.data.createChatBox);
    }
    const [sendMessageMutation] = useMutation(CREATE_MESSAGE_MUTATION);
    const sendMessage = async ({ from, to, body }) => {
        const newStatus = await sendMessageMutation({
            variables: { from, to, body }
        });
        setStatus(newStatus.data.createMessage);
    }

    const [deleteCacheMutation] = useMutation(DELETE_CACHE);
    const deleteCache = ({ name1, name2 }) => {
        deleteCacheMutation({
            variables: { name1, name2 },
            update(cache) {
                const normalizedId = cache.identify({
                    chatName: [name1, name2].sort().join("_"),
                    __typename: "ChatBox"
                });
                cache.evict({ id: normalizedId });
                cache.gc();
            }
        });
    }

    const [startLoginMutation] = useMutation(START_LOGIN_MUTATION);
    const startLogin = async ({ username, password }) => {
        const newStatus = await startLoginMutation({
            variables: {
                username,
                password: CryptoJS.SHA256(password).toString()
            }
        });
        setStatus(newStatus.data.startLogin);
        if (newStatus.data.startLogin.type === "success") {
            setSignedIn(true);
        }
    }

    const [startSignupMutation] = useMutation(START_SIGNUP_MUTATION);
    const startSignup = async ({ username, password }) => {
        const newStatus = await startSignupMutation({
            variables: {
                username,
                password: CryptoJS.SHA256(password).toString()
            }
        });
        setStatus(newStatus.data.startSignup);
    }

    const displayStatus = (s) => {
        if (s.msg) {
            const { type, msg } = s;
            const content = { content: msg, duration: 1 };
            switch (type) {
                case "success":
                    message.success(content);
                    break;
                case "error":
                default:
                    message.error(content);
                    break;
            }
        }
    }

    return (
        <ChatContext.Provider
            value={{
                status, setStatus,
                me, setMe,
                signedIn, setSignedIn,
                startChat, sendMessage,
                deleteCache,
                startLogin, startSignup,
                displayStatus
            }}
            {...props}
        />
    );
}

const useChat = () => useContext(ChatContext);
export { ChatProvider, useChat };
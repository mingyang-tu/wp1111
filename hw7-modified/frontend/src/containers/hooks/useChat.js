import { createContext, useContext, useState } from "react";
import { message } from "antd";
import { LOCALSTORAGE_KEY } from "../../global/constants"

const ChatContext = createContext();

const client = new WebSocket('ws://localhost:4000');

const ChatProvider = (props) => {
    const savedMe = localStorage.getItem(LOCALSTORAGE_KEY);

    const [status, setStatus] = useState({});
    const [me, setMe] = useState(savedMe || "");
    const [password, setPassword] = useState("");
    const [signedIn, setSignedIn] = useState(false);
    const [messages, setMessages] = useState([]);
    const [notices, setNotices] = useState([]);

    const isOpen = (ws) => (ws.readyState === ws.OPEN);

    client.onmessage = (byteString) => {
        const { data } = byteString;
        const [task, payload] = JSON.parse(data);
        switch (task) {
            case "init":
                setMessages(payload);
                if (payload.length > 0) {
                    setNotices((prev) => prev.filter(
                        ({ chatName }) => chatName !== payload[0]["chatName"]
                    ));
                }
                break;
            case "sendActive":
                setMessages((prev) => [...prev, ...payload]);
                break;
            case "sendInactive":
                setNotices((prev) => [...prev, ...payload]);
                break;
            case "status":
                setStatus(payload);
                break;
            case "login":
                if (payload) setSignedIn(true);
                break;
            default:
                break;
        }
    }

    const sendData = async (data) => {
        if (!isOpen(client)) {
            setStatus({
                type: "error",
                msg: "WebSocket is already in CLOSING or CLOSED state."
            })
        }
        else {
            client.send(JSON.stringify(data));
        }
    }

    const makeChatName = (p) => (p.sort().join("_"));

    const startChat = (p) => {
        const payload = {
            chatName: makeChatName(p),
            participants: p.sort()
        };
        sendData(["CHAT", payload]);
    }
    const closeChat = (p) => {
        const payload = {
            chatName: makeChatName(p)
        };
        sendData(["CLOSE", payload]);
    }
    const sendMessage = (p, sender, body) => {
        const payload = {
            chatName: makeChatName(p),
            sender,
            body
        };
        sendData(["MESSAGE", payload]);
    }
    const startLogin = (payload) => {
        sendData(["LOGIN", payload]);
    }
    const startSignup = (payload) => {
        sendData(["SIGNUP", payload]);
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
                password, setPassword,
                signedIn, setSignedIn,
                messages, notices,
                startChat, closeChat, sendMessage, startLogin, startSignup,
                displayStatus
            }}
            {...props}
        />
    );
}

const useChat = () => useContext(ChatContext);
export { ChatProvider, useChat };
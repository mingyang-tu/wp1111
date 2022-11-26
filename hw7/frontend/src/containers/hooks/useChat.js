import { createContext, useContext, useState } from "react";
import { message } from "antd";
import { LOCALSTORAGE_KEY } from "../../global/constants"

const ChatContext = createContext();

const ChatProvider = (props) => {
    const savedMe = localStorage.getItem(LOCALSTORAGE_KEY);

    const [status, setStatus] = useState({});
    const [me, setMe] = useState(savedMe || "");
    const [password, setPassword] = useState("");
    const [signedIn, setSignedIn] = useState(false);
    const [messages, setMessages] = useState([]);

    const client = new WebSocket('ws://localhost:4000');

    const isOpen = (ws) => (ws.readyState === ws.OPEN);

    client.onmessage = (byteString) => {
        const { data } = byteString;
        const [task, payload] = JSON.parse(data);
        switch (task) {
            case "init": {
                let filt = "";
                if (payload.length > 0) filt = payload[0].chatName;
                setMessages([
                    ...messages.filter(({ chatName }) => (chatName !== filt)),
                    ...payload
                ]);
                break;
            }
            case "output":
                setMessages(() => [...messages, ...payload]);
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
    const startChat = (payload) => {
        sendData(["CHAT", payload]);
    }
    const sendMessage = (payload) => {
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
                messages, setMessages,
                startChat, sendMessage, startLogin, startSignup,
                displayStatus
            }}
            {...props}
        />
    );
}

const useChat = () => useContext(ChatContext);
export { ChatProvider, useChat };
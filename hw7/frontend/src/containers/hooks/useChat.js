import { createContext, useContext, useState } from "react";
import { message } from "antd";
import { LOCALSTORAGE_KEY } from "../../global/constants"

const ChatContext = createContext();

const ChatProvider = (props) => {
    const savedMe = localStorage.getItem(LOCALSTORAGE_KEY);

    const [status, setStatus] = useState({});
    const [me, setMe] = useState(savedMe || "");
    const [signedIn, setSignedIn] = useState(false);
    const [messages, setMessages] = useState([]);

    const client = new WebSocket('ws://localhost:4000');

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
            default:
                break;
        }
    }

    const sendData = async (data) => {
        client.send(JSON.stringify(data));
    }
    const startChat = (payload) => {
        sendData(["CHAT", payload]);
    }
    const sendMessage = (payload) => {
        sendData(["MESSAGE", payload]);
    }
    const clearMessages = () => {
        sendData(["clear"]);
    };

    const displayStatus = (s) => {
        if (s.msg) {
            const { type, msg } = s;
            const content = { content: msg, duration: 0.5 };
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
                status, me, signedIn, messages,
                setMe, setSignedIn, setMessages,
                startChat, sendMessage, clearMessages, displayStatus
            }}
            {...props}
        />
    );
}

const useChat = () => useContext(ChatContext);
export { ChatProvider, useChat };
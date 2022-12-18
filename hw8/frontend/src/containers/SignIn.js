import { useState } from "react";
import Title from "../components/Title";
import Login from "../components/Login";
import SignUpModal from "../components/SignUpModal";
import { useChat } from "./hooks/useChat";
import { LOCALSTORAGE_KEY } from "../global/constants"

const SignIn = () => {
    const { setStatus, me, setMe, startLogin, startSignup } = useChat();

    const [password, setPassword] = useState("");
    const [modalOpen, setModalOpen] = useState(false);

    const handleLogin = () => {
        if (!me) {
            setStatus({
                type: "error",
                msg: "Missing username."
            });
        }
        else if (!password) {
            setStatus({
                type: "error",
                msg: "Missing password."
            });
        }
        else {
            startLogin({ username: me, password });
            localStorage.setItem(LOCALSTORAGE_KEY, me);
        }
    }
    const onSignup = () => {
        setModalOpen(true);
    }

    return (
        <>
            <Title />
            <Login
                me={me}
                setName={setMe}
                password={password}
                setPassword={setPassword}
                onLogin={handleLogin}
                onSignup={onSignup}
            />
            <SignUpModal
                open={modalOpen}
                onCreate={({ username, password }) => {
                    startSignup({ username, password });
                    setModalOpen(false);
                }}
                onCancel={() => { setModalOpen(false); }}
            />
        </>
    )
}

export default SignIn;
import { useState } from "react";
import CryptoJS from "crypto-js";
import Title from "../components/Title";
import Login from "../components/Login";
import SignUpModal from "../components/SignUpModal";
import { useChat } from "./hooks/useChat";
import { LOCALSTORAGE_KEY } from "../global/constants"

const SignIn = () => {
    const { setStatus, me, setMe, password, setPassword, startLogin, startSignup } = useChat();

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
            startLogin({
                username: me,
                password: CryptoJS.MD5(password).toString()
            });
            localStorage.setItem(LOCALSTORAGE_KEY, me);
        }
    }
    const onSignup = () => {
        setModalOpen(true);
    }

    return (
        <>
            <Title name={me} />
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
                    startSignup({
                        username: username,
                        password: CryptoJS.MD5(password).toString()
                    });
                    setModalOpen(false);
                }}
                onCancel={() => { setModalOpen(false); }}
            />
        </>
    )
}

export default SignIn;
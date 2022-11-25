import Title from "../components/Title";
import Login from "../components/Login";
import { useChat } from "./hooks/useChat";
import { LOCALSTORAGE_KEY } from "../global/constants"

const SignIn = () => {
    const { me, setMe, setSignedIn, displayStatus } = useChat();

    const handleLogin = (name) => {
        if (!name) {
            displayStatus({
                type: "error",
                msg: "Missing user name"
            });
        }
        else {
            setSignedIn(true);
            localStorage.setItem(LOCALSTORAGE_KEY, me);
        }
    }

    return (
        <>
            <Title name={me} />
            <Login me={me} setName={setMe} onLogin={handleLogin} />
        </>
    )
}

export default SignIn;
import { useState } from "react"
import "../styles.css"
import Header from "./components/Header"
import Main from "./components/Main"
import Footer from "./components/Footer"

const Home = () => {

    const [data, setData] = useState([])
    const [done, setDone] = useState([])
    const [show, setShow] = useState(0)

    return <div id="root" className="todo-app__root">
        <Header />
        <Main
            listData={data}
            addData={setData}
            doneId={done}
            setDone={setDone}
            deleteData={setData}
            show={show}
        />
        <Footer
            listData={data}
            doneId={done}
            setShow={setShow}
            clearCompleted={setData}
            clearDone={setDone}
        />
    </div>
}

export default Home
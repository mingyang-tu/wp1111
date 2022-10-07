import { useState } from "react"
import Item from "./Item"

const Main = ({ listData, addData, doneId, setDone, deleteData, show }) => {

    const [note, setNote] = useState("")
    function noteChange(e) {
        setNote(e.target.value)
    }
    function enterData(e) {
        if (e.key === "Enter") {
            setNote("")
            addData(function (prev) {
                return [
                    ...prev, 
                    { id: new Date().getTime().toString(), note }
                ]
            })
        }
    }

    return <section className="todo-app__main">
        <input
            id="todo-input"
            className="todo-app__input"
            placeholder="What needs to be done?"
            value={note}
            onKeyDown={enterData}
            onChange={noteChange}
        />
        <ul id="todo-list" className="todo-app__list">
            {listData.map(item => {
                const { id, note } = item
                return (
                    <Item
                        key={id}
                        id={id}
                        note={note}
                        doneId={doneId}
                        setDone={setDone}
                        deleteData={deleteData}
                        show={show}
                    />
                )
            })}
        </ul>
    </section>
}

export default Main
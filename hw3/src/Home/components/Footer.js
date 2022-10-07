import { useEffect, useRef } from "react"

const Footer = ({ listData, doneId, setShow, clearCompleted, clearDone }) => {

    const showFooter = useRef()
    useEffect(() => {
        if (listData.length === 0) {
            showFooter.current.style.visibility = "hidden"
        }
        else {
            showFooter.current.style.visibility = "visible"
        }
    }, [listData])

    const showAllItem = () => setShow(0)
    const showActiveItem = () => setShow(1)
    const showCompletedItem = () => setShow(-1)

    const showClear = useRef()
    useEffect(() => {
        if (doneId.length === 0) {
            showClear.current.style.visibility = "hidden"
        }
        else {
            showClear.current.style.visibility = "visible"
        }
    })

    function clickCC() {
        clearCompleted(function (prev) {
            return prev.filter(item => !(doneId.includes(item.id)))
        })
        clearDone([])
    }

    return <footer className="todo-app__footer" id="todo-footer" ref={showFooter}>
        <div className="todo-app__total">{listData.length - doneId.length} left</div>
        <ul className="todo-app__view-buttons">
            <button onClick={showAllItem}>All</button>
            <button onClick={showActiveItem}>Active</button>
            <button onClick={showCompletedItem}>Completed</button>
        </ul>
        <div className="todo-app__clean">
            <button ref={showClear} onClick={clickCC}>Clear Completed</button>
        </div>
    </footer>
}

export default Footer
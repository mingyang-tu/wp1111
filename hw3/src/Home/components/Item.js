import { useEffect, useRef } from "react"
import imgX from '../../images/x.png'

const Item = ({ id, note, doneId, setDone, deleteData, show }) => {

    const lineCross = useRef()
    function crossWord(e) {
        if (e.target.checked) {
            lineCross.current.style = "text-decoration: line-through; opacity: 0.5;"
            setDone((prev) => [id, ...prev])
        }
        else {
            lineCross.current.style = ""
            setDone(function (prev) {
                return prev.filter(item => item !== id)
            })
        }
    }

    function deleteItem() {
        deleteData(function (prev) {
            return prev.filter(item => item.id !== id)
        })
        setDone(function (prev) {
            return prev.filter(item => item !== id)
        })
    }

    const itemShow = useRef()
    useEffect(() => {
        let numId = itemShow.current.id.slice(5)
        if (show === 0) {
            itemShow.current.style.display = "flex"
        }
        else if (show === 1) {
            if (doneId.includes(numId)) {
                itemShow.current.style.display = "None"
            }
            else {
                itemShow.current.style.display = "flex"
            }
        }
        else if (show === -1) {
            if (doneId.includes(numId)) {
                itemShow.current.style.display = "flex"
            }
            else {
                itemShow.current.style.display = "None"
            }
        }
        else {
            window.alert("ERROR")
        }
    }, [show])

    return <li className="todo-app__item" ref={itemShow} id={"item-" + id}>
        <div className="todo-app__checkbox">
            <input id={"check-" + id} type="checkbox" onClick={crossWord} />
            <label htmlFor={"check-" + id} />
        </div>
        <h1 className="todo-app__item-detail" ref={lineCross}>{note}</h1>
        <img className="todo-app__item-x" src={imgX} onClick={deleteItem} />
    </li>
}

export default Item
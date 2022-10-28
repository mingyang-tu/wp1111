import './css/Item.css';

const Item = ({ id, number, response }) => {
    return (
        <li className="history_item">
            <p className="item-id">{id + 1}</p>
            <p className="item-number">{number}</p>
            <p className="item-response">{response}</p>
        </li>
    )
}

export default Item;
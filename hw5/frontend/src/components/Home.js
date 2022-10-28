import './css/Home.css';

const StartMenu = ({ startOnClick }) => {
    return (
        <div className="HomeWrapper">
            <p className="title">1A1B</p>
            <button onClick={startOnClick} className="btn">
                Start Game
            </button>
        </div>
    )
}

export default StartMenu;
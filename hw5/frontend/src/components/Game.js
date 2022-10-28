import './css/Game.css';
import './css/Home.css';
import { useState } from 'react';
import { guess, restart } from "../axios";
import Item from './Item'

const Game = ({ backToHomeOnClick }) => {
    const [hasWon, setHasWon] = useState(false);
    const [number, setNumber] = useState('');
    const [status, setStatus] = useState('');
    const [history, setHistory] = useState([]);
    const [hasLose, setHasLose] = useState(false);

    const handleGuess = async () => {
        const response = await guess(number, history.length);
        let responseSplit = response.split(",");

        if (responseSplit[0] === 'Lose') {
            setHasLose(true);
            setNumber(responseSplit[1]);
        }
        else if (response === '4A0B') {
            setHasWon(true);
        }
        else {
            if (response.length === 4) {
                setHistory([{ id: history.length, number, response }, ...history])
            }
            setStatus(response);
            setNumber('');
        }
    }

    const numberChange = (e) => {
        setNumber(e.target.value)
    }
    const enterData = (e) => {
        if (e.key === "Enter" && number) {
            handleGuess()
        }
    }

    const restartOnClick = async () => {
        await restart();
        setHasWon(false);
        setHasLose(false);
        setNumber('');
        setStatus('');
        setHistory([]);
    }

    const gameMode =
        <>
            <p className="gameTitle">1A1B</p>
            <div>
                <input
                    className="number_input"
                    placeholder="Guess a 4-digit number."
                    value={number}
                    onKeyDown={enterData}
                    onChange={numberChange}
                />
                <button
                    onClick={handleGuess}
                    disabled={!number}
                    className={!number ? "gameBtn disabled" : "gameBtn"}
                >
                    GUESS
                </button>
            </div>
            <p className="status">{status}</p>
            <ul className="history_list">
                {history.map(item => {
                    const { id, number, response } = item;
                    return (
                        <Item
                            key={id}
                            id={id}
                            number={number}
                            response={response}
                        />
                    )
                })}
            </ul>
        </>

    const winningMode =
        <>
            <p className="winMSG">
                {hasLose ?
                    `You lose. The answer is ${number}.` :
                    `You win! The answer is ${number}.`
                }
            </p>
            <div>
                <button onClick={restartOnClick} className="btn">
                    Restart
                </button>
                <button onClick={backToHomeOnClick} className="btn">
                    Back To Home
                </button>
            </div>
        </>

    return (
        <div className="GameWrapper">
            {(hasWon || hasLose) ? winningMode : gameMode}
        </div>
    )
}

export default Game;
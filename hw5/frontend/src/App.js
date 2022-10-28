import './App.css';
import { useState } from 'react';
import { startGame } from "./axios";
import StartMenu from './components/Home'
import Game from './components/Game'

function App() {
    const [hasStarted, setHasStarted] = useState(false);

    const startOnClick = async () => {
        await startGame();
        setHasStarted(true);
    }

    const backToHomeOnClick = () => {
        setHasStarted(false);
    }

    return (
        <div className="App">
            {hasStarted ?
                <Game
                    backToHomeOnClick={backToHomeOnClick}
                /> :
                <StartMenu
                    startOnClick={startOnClick}
                />
            }
        </div>
    );
}

export default App;

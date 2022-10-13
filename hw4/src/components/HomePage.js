/****************************************************************************
  FileName      [ HomePage.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file generates the Home page.  ]
  Copyright     [ 2022 10 ]
****************************************************************************/

import './css/HomePage.css';
import React, { useState, useEffect } from 'react';

const HomePage = ({ startGameOnClick, mineNumOnChange, boardSizeOnChange, mineNum, boardSize /* -- something more... -- */ }) => {
    const [showPanel, setShowPanel] = useState(false);      // A boolean variable. If true, the controlPanel will show.
    const [error, setError] = useState(false);              // A boolean variable. If true, means that the numbers of mines and the board size are invalid to build a game.

    {/* Advanced TODO: Implementation of Difficult Adjustment */ }
    const showPanelOnClick = () => {
        setShowPanel(!showPanel);
    }

    useEffect(() => {
        if (!error) {
            if (mineNum > boardSize * boardSize - 1) {
                setError(true);
            }
        }
        else {
            if (mineNum <= boardSize * boardSize - 1) {
                setError(false);
            }
        }
    }, [mineNum, boardSize])

    return (
        <div className="HomeWrapper">
            <p className="title">MineSweeper</p>
            {/* Basic TODO: Implement start button */}
            <button
                className={(error) ? "btn disabled" : "btn"}
                onClick={(error) ? () => { return } : startGameOnClick}
            >
                Start Game
            </button>
            {/* Advanced TODO: Implementation of Difficult Adjustment */}
            <div className="controlContainer">
                <button className="btn" onClick={showPanelOnClick}>Difficulty Adjustment</button>
                <div className="controlWrapper" style={(showPanel) ? { visibility: "visible" } : { visibility: "hidden" }}>
                    <div className="error" style={(error && showPanel) ? { visibility: "visible" } : { visibility: "hidden" }}>
                        ERROR: Mines number and board size are invalid.
                    </div>
                    <div className="controlPanel">
                        <div className="controlCol">
                            <p className="controlTitle">Mines Number</p>
                            <input type="range" step="1" min="1" max="255" defaultValue={mineNum} onChange={mineNumOnChange} />
                            <p className="controlNum" style={(error) ? { color: "#880000" } : { color: "#0f0f4b" }}>{mineNum}</p>
                        </div>
                        <div className="controlCol">
                            <p className="controlTitle">Board Size (n×n)</p>
                            <input type="range" step="1" min="3" max="16" defaultValue={boardSize} onChange={boardSizeOnChange} />
                            <p className="controlNum" style={(error) ? { color: "#880000" } : { color: "#0f0f4b" }}>{boardSize}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}
export default HomePage;   
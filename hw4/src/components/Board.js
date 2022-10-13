/****************************************************************************
  FileName      [ Board.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file generates the Board. ]
  Copyright     [ 2022 10 ]
****************************************************************************/

import './css/Board.css'
import Cell from './Cell';
import Modal from './Modal';
import Dashboard from './Dashboard';
import { revealed } from '../util/reveal';
import createBoard from '../util/createBoard';
import React, { useEffect, useState } from 'react';


const Board = ({ boardSize, mineNum, backToHome }) => {
    const [board, setBoard] = useState([]);                     // An 2-dimentional array. It is used to store the board.
    const [nonMineCount, setNonMineCount] = useState(0);        // An integer variable to store the number of cells whose value are not '💣'.
    const [mineLocations, setMineLocations] = useState([]);     // An array to store all the coordinate of '💣'.
    const [gameOver, setGameOver] = useState(false);            // A boolean variable. If true, means you lose the game (Game over).
    const [remainFlagNum, setRemainFlagNum] = useState(0);      // An integer variable to store the number of remain flags.
    const [win, setWin] = useState(false);                      // A boolean variable. If true, means that you win the game.

    useEffect(() => {
        // Calling the function
        freshBoard();
    }, []);

    // Creating a board
    const freshBoard = () => {
        // Basic TODO: Use `newBoard` created above to set the `Board`.
        const newBoard = createBoard(boardSize, mineNum);
        setBoard(newBoard.board);
        setMineLocations(newBoard.mineLocations);
        setRemainFlagNum(mineNum);
        setNonMineCount(boardSize * boardSize - mineNum);
    }

    const restartGame = () => {
        freshBoard();
        setGameOver(false);
        setWin(false);
    }

    // On Right Click / Flag Cell
    const updateFlag = (e, x, y) => {
        // Basic TODO: Right Click to add a flag on board[x][y]
        // To not have a dropdown on right click
        e.preventDefault();
        // Deep copy of a state
        let newBoard = JSON.parse(JSON.stringify(board));
        let newFlagNum = remainFlagNum;

        if (!newBoard[x][y].revealed) {
            if (newBoard[x][y].flagged) {
                newBoard[x][y].flagged = false;
                newFlagNum++;
            }
            else if (newFlagNum > 0) {
                newBoard[x][y].flagged = true;
                newFlagNum--;
            }
        }

        setBoard(newBoard)
        setRemainFlagNum(newFlagNum)
    };

    const revealCell = (x, y) => {
        // Basic TODO: Complete the conditions of revealCell (Refer to reveal.js)
        if (board[x][y].revealed || gameOver || board[x][y].flagged) return;
        let newBoard = JSON.parse(JSON.stringify(board));
        let newNonMinesCount = nonMineCount;
        let newGameOver = gameOver;

        newBoard[x][y].revealed = true;
        if (newBoard[x][y].value === '💣') {
            newGameOver = true;
            for (const xy of mineLocations) {
                if (!newBoard[xy[0]][xy[1]].flagged) {
                    newBoard[xy[0]][xy[1]].revealed = true;
                }
            }
        }
        else {
            const boardRevealed = revealed(newBoard, x, y, newNonMinesCount);
            newBoard = boardRevealed.board;
            newNonMinesCount = boardRevealed.newNonMinesCount;
        }

        setGameOver(newGameOver);
        if (newNonMinesCount === 0) {
            setWin(true);
            setGameOver(true);
        }
        setBoard(newBoard);
        setNonMineCount(newNonMinesCount);
    };

    return (
        <div className="boardPage" >
            <div className="boardWrapper" >
                {/* Advanced TODO: Implement Modal based on the state of `gameOver` */}
                <Modal restartGame={restartGame} backToHome={backToHome} win={win} gameOver={gameOver} />
                {/* Basic TODO: Implement Board */}
                <div className="boardContainer">
                    <Dashboard remainFlagNum={remainFlagNum} gameOver={gameOver} />
                    {board.map(row => {
                        return (
                            <div style={{ display: "flex" }} key={"row-" + row[0].x.toString()}>
                                {row.map(item => {
                                    return (
                                        <Cell
                                            key={item.x.toString() + '-' + item.y.toString()}
                                            rowIdx={item.x}
                                            colIdx={item.y}
                                            detail={item}
                                            updateFlag={updateFlag}
                                            revealCell={revealCell}
                                        />
                                    )
                                })}
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );



}

export default Board
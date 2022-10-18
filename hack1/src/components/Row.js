/****************************************************************************
  FileName      [ Row.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file generates the Row. ]
  Copyright     [ 2022 10 ]
****************************************************************************/

import "./css/Row.css";
import React from 'react';


const Row = ({ guess, rowIdx }) => {
    let emp = ["", "", "", "", ""];
    return (
        <div className='Row-container'>
            {/* TODO 3: Row Implementation -- Row */}

            {/* ↓ Default row, you should modify it. ↓ */}
            <div className='Row-wrapper'>
                {
                    (guess == null) ?
                        emp.map((col, colIdx) => {
                            return (
                                <div
                                    id={rowIdx + '-' + colIdx}
                                    key={rowIdx + '-' + colIdx}
                                    className={'Row-wordbox' + ' ' + col.char}
                                >
                                    {col.char}
                                </div>
                            )
                        }) :
                        guess.map((col, colIdx) => {
                            return (
                                <div
                                    id={rowIdx + '-' + colIdx}
                                    key={rowIdx + '-' + colIdx}
                                    className={'Row-wordbox' + ' ' + col.color}
                                >
                                    {col.char}
                                </div>
                            )
                        })
                }
            </div>
            {/* ↑ Default row, you should modify it. ↑ */}
        </div>
    )
}

export default Row;
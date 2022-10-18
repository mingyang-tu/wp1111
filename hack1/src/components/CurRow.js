/****************************************************************************
  FileName      [ CurRow.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file generates the CurRow. ]
  Copyright     [ 2022 10 ]
****************************************************************************/

import "./css/Row.css";
import React from 'react';


const CurRow = ({ curGuess, rowIdx }) => {
    let letters = curGuess.split('');
    while (letters.length < 5) {
        letters.push('')
    }

    return (
        <div className='Row-container'>
            {/* TODO 3: Row Implementation -- CurRow */}

            {/* ↓ Default row, you should modify it. ↓ */}
            <div className='Row-wrapper current'>
                {letters.map((col, colIdx) => {
                    return (
                        (col == '') ?
                            <div
                                id={rowIdx + '-' + colIdx}
                                key={rowIdx + '-' + colIdx}
                                className={'Row-wordbox'}
                            >
                                {col}
                            </div> :
                            <div
                                id={rowIdx + '-' + colIdx}
                                key={rowIdx + '-' + colIdx}
                                className={'Row-wordbox filled'}
                            >
                                {col}
                            </div>
                    )
                })}
            </div>
            {/* ↑ Default row, you should modify it. ↑ */}
        </div>
    )
}

export default CurRow;

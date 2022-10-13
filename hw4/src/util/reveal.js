/****************************************************************************
  FileName      [ reveal.js ]
  PackageName   [ src/util ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file states the reaction when left clicking a cell. ]
  Copyright     [ 2022 10 ]
****************************************************************************/

export const revealed = (board, x, y, newNonMinesCount) => {
    // Advanced TODO: reveal cells in a more intellectual way.

    const boardSize = board.length;
    const position = [[-1, 0], [1, 0], [0, -1], [0, 1], [-1, -1], [-1, 1], [1, -1], [1, 1]]

    const DFS = (i, j) => {
        if (!board[i][j].flagged) {
            board[i][j].revealed = true;
            newNonMinesCount--;
        }

        if (board[i][j].value === 0) {
            for (const item of position) {
                if ((i + item[0] < boardSize) && (i + item[0] >= 0) && (j + item[1] < boardSize) && (j + item[1] >= 0)) {
                    if (!board[i + item[0]][j + item[1]].revealed) {
                        DFS(i + item[0], j + item[1]);
                    }
                }
            }
        }
    }

    DFS(x, y);

    return { board, newNonMinesCount };
};

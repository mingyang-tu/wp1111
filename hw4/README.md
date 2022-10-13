# Web Programming HW#4 MineSweeper

## 基本要求
> **全部達成**

- 在 HomePage.js 實作一個 content 為 "Start Game" 的按鈕。同時，這個按鈕在按下後，會切換到遊戲頁面 (Board)，開始遊戲。
- 完成 freshBoard，並根據規定的架構建構 Board。
- 在 Board 上加上可以插旗子的功能 (updateFlag)，在遊戲中，可以透過按右鍵插旗子：
    - 若此 Cell 已經被按開 (revealed)，則不能再插上旗子。
    - 若此 Cell 沒有被插上旗子，且沒有被按開，可以插上旗子。
    - 若此 Cell 已經被插上旗子，必須拔掉旗子。
- 完成 Board.js 裡的 revealCell function。判斷兩種情況：
    - 若正要被 reveal 的這個 Cell 裡面是地雷，則遊戲結束，所有沒被插旗子的地雷會被顯示。
    - 若不是地雷，則開啟按到的 Cell。

## 進階要求
> **全部達成**

- 在 MineSweeper.js 與 HomePage.js 裡面完成難度調整的功能：
    - 在按下 "Difficulty Adjustment" 後，調整欄位才會顯示，若再按一下則會隱藏。
    - 在調整欄位中有兩個控制條，分別控制地雷數量及 Board 的大小。
    - 地雷數量不能超過 Cell 總數 - 1 (n x n - 1)，如果超過的話，會出現錯誤訊息，且下方的數字會變成紅色 (#880000)，同時 Start Button 會沒辦法按。
- 在 reveal.js 裡實作聰明的 reveal function：
    - 簡單來說跟經典的踩地雷遊戲配置是一樣的。
    - 若要 reveal 的 Cell 數值不為 0，則只會開啟點擊的 Cell。
    - 若要 reveal 的 Cell 數值為 0，則會同步開啟這個 Cell 四周未被插旗子且不是地雷的 Cell。
- 在 Modal.js 中實作 Modal，並在 Board.js 中顯示它。Modal 會在下列兩個時機出現：
    - 所有非地雷的 Cell 都被 reveal（會顯示 WIN）
    - 任一個地雷的 Cell 被 reveal（會顯示 Game Over）
- Modal 上有兩個按鈕：
    - 按下 Try again / New Game 後，會重新產生一個新的 Board，繼續遊戲。
    - 按下 Back to Home 後會回到 HomePage。
- 在 Dashboard.js 中實作計時器。每個新遊戲皆從 0 秒開始計時，當遊戲結束時，計時器會停止在遊戲結束的秒數。

## 其他
- 地雷數量在 1 ~ 255 之間，board size 在 3 ~ 16 之間。
- 游標移出 Modal 視窗後其 opacity 會變成 0，可以看看自己怎麼死的。
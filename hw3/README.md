# Web Programming HW#3

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.
You may also see any lint errors in the console.

## 基本要求
> **全部達成**

- 一開始由於沒有 TODO items，所以 `<ul class="todo-app__list" id="todo-list">` 以及 `<footer class="todo-app__footer" id="todo-footer">` 都沒有出現，只有上方的 `<input class="todo-app__input">` 會出現，等待使用者的輸入。

- 使用者在 `<input class="todo-app__input">` 輸入 TODO item 的文字，按下 **enter** 後就會被加入 `<ul class="todo-app__list" id="todo-list">` 的最後一個 item（i.e. 最下面），且 `<div class="todo-app__checkbox">` 尚未被 check，表示該 item 尚未完成。

- 點擊 `<div class="todo-app__checkbox">` 即表示該 TODO item 已完成，checkbox 應變成綠色，且 `<h1 class="todo-app__item-detail">` 應加上 `style="text-decoration: line-through; opacity: 0.5;"`。再點擊一次 checkbox，可還原該 TODO item 變回 **未完成** 狀態。

- 一但有輸入 TODO items，下方的 `<footer class="todo-app__footer" id="todo-footer">` 就會出現，顯示剩餘 **未完成** TODO items 的數量 (`<div class="todo-app__total">`)。而 `<ul class="todo-app__view- buttons">` 以及 `<div class="todo-app__clean">` 則排列如作業規定所示。

## 進階要求
> **全部達成**

- 當 mouse over `<li class="todo-app__item">` 的時候，`<img src="./img/x.png" class="todo-app__item-x">` 會出現（Note：這部分 CSS 已經寫好），且此時如果點擊此 **X** 符號，則該 `<li class="todo- app__item">` 會被刪除（也從畫面移除），而如果此 TODO item 是未完成的 TODO，則在下方 `<footer class="todo-app__footer" id="todo-footer">` 顯示的剩餘 **未完成** TODO items 的數量也會被減一。

- 如果所有的 TODO items 都被刪除光（完成 & 未完成），則 `<ul class="todo-app__list" id="todo-list">` 以及 `<footer class="todo-app__footer" id="todo-footer">` 會隱藏起來不顯示，如同回到初始狀態一樣。

- 點擊 `<footer class="todo-app__footer" id="todo-footer">` 的 **Active** 或是 **Completed** 按鈕，則 `<ul class="todo-app__list" id="todo-list">` 只會顯示 **未完成**，或是 **已完成** 的 TODO items，其他的 items 則不顯示，而點擊 **All** 按鈕則所有的 TODO items 都會顯示。（特殊情況：如果所有的 TODO items 都為已完成，則點擊 **Active** 時，`<ul class="todo-app__list" id="todo-list">` 會被清空，但 `<footer class="todo-app__footer" id="todo-footer">` 仍然存在，只是顯示 **0 left**。）

- 當已完成的 TODO items 不為 0 時，則 **Clear completed** 按鈕才會出現（此與基本要求的功能有所不同），且點擊它時，已完成的 TODO items 會被刪除（從畫面消失）。

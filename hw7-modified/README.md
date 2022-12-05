# Web Programming HW#7 MODIFIED

> 因為原版真的太多 BUG 了

## 基本要求全部達成

## 進階要求

#### 在 Sign In 頁面加上註冊與檢查密碼的功能
- 點擊 Sign Up 按鈕註冊
- 密碼會以 MD5 雜湊後傳入後端

#### 處理各種錯誤，包括
- 後端沒有正確回應或是開啟
- 註冊時：
    - 未輸入名字／密碼就按 "Sign Up"
    - 名字已存在在資料庫

- 登入時：
    - 未輸入名字／密碼就按 "Sign In"
    - 用戶名不存在
    - 密碼錯誤

- 登入後：
    - 創建 ChatBox 時沒有輸入對話者名字，或者是與對話者之 ChatBox 已開啟
    - 未開啟任何 ChatBox 就送出訊息
    - 未輸入任何訊息就送出訊息
    - 處理輸入過長時 "Line Wrapping" 的問題

#### 顯示 inactive chatbox 的未讀留言數
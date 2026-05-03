# YTranscribe

輸入 YouTube 網址，自動抓取字幕並複製到剪貼簿，方便貼給 AI 分析。

## 系統需求

- [Node.js](https://nodejs.org/) v18 以上

## 安裝

```bash
npm install -g github:neritina-ai/ytranscribe
```

## 啟動（單次執行）

```bash
ytranscribe
```

啟動後開瀏覽器前往：

```
http://localhost:3000
```

停止請按 `Ctrl+C`。

## 使用方式

1. 將 YouTube 影片網址輸入欄位
2. 按「開始處理」或按 Enter
3. 字幕已自動複製到剪貼簿，直接開啟 AI 新對話貼上即可
4. 必要時可修改前置提示詞

## 以 Service 方式執行（自動啟動）

### 1. 安裝 pm2

```bash
npm install -g pm2
```

### 2. 啟動

**Mac / Linux：**

```bash
pm2 start ytranscribe
```

**Windows（PowerShell）：**

pm2 在 Windows 上會嘗試將 `ytranscribe.cmd` 當成 Node.js 腳本執行，導致語法錯誤，需改用 `ecosystem.config.js`：

```powershell
pm2 start "$(npm root -g)\ytranscribe\ecosystem.config.js"
```

### 3. 儲存狀態

若需要自動啟動，執行以下指令讓 pm2 記住目前的 process 清單：

```bash
pm2 save
```

### 4. 設定登入時自動啟動

**Windows：**（不需要管理員權限，登入此使用者帳號時自動啟動）

```bash
npm install -g pm2-windows-startup
pm2-startup install
```

**Mac / Linux：**（需要 sudo 權限）

```bash
pm2 startup
```

pm2 會印出一段指令，複製後在指令前加 `sudo` 執行即可。

### 管理服務

```bash
pm2 status                # 查看服務狀態
pm2 stop ytranscribe      # 暫停（下次開機仍會自動啟動）
pm2 start ytranscribe     # 重新啟動
pm2 restart ytranscribe   # 重啟（已在執行中時用這個）
pm2 logs ytranscribe      # 查看 log
pm2 delete ytranscribe    # 完全移除，不再以 service 執行
```

## 注意事項

- 部分影片的作者會關閉字幕功能，這類影片無法抓取，會顯示錯誤訊息
- 需要網路連線
- 字幕來源為 YouTube 自動產生或作者上傳的字幕檔

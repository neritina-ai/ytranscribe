# YTranscribe

貼上 YouTube 網址，自動抓取字幕並複製到剪貼簿，方便貼給 AI 分析。

## 系統需求

- [Node.js](https://nodejs.org/) v18 以上

## 安裝

```bash
npm install github:neritina/ytranscribe
```

## 啟動

```bash
npm start
```

啟動後開瀏覽器前往：

```
http://localhost:3000
```

## 使用方式

1. 將 YouTube 影片網址貼到輸入框
2. 按「開始處理」或按 Enter
3. 此時字幕已自動複製到剪貼簿，直接開啟 AI 新對話，貼上即可產生報告
4. 必要時可修改前置提示詞

## 注意事項

- 部分影片的作者會關閉字幕功能，這類影片無法抓取，會顯示錯誤訊息
- 需要網路連線
- 字幕來源為 YouTube 自動產生或作者上傳的字幕檔

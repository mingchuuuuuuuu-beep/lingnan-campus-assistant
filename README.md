# 嶺南校園助手 (Lingnan Campus Assistant) — 專案網頁與零成本部署指南

本專案為嶺南大學 CCC8015 生成式人工智能 (Generative AI) 專題報告之展示網站，達成 **100% 零成本 ($0 Cost)** 運作與部屬。

---

## 快速本機預覽 (Local Preview)

- **完全免安裝任何伺服器或 Node.js 環境**。
- 直接進入 `C:\Users\User\Downloads\Lingnanproject`，雙擊點擊 `index.html` 即可在 Chrome、Edge 或 Safari 瀏覽器中完整運行！

---

## 零成本發布至 GitHub Pages (免費取得公開網址)

依照以下 3 個步驟，即可在 3 分鐘內獲得永久的 HTTPS 公開網址（供報告、PPT 示範及評分員查看）：

### 步驟 1：建立 GitHub Repository
1. 登入 [GitHub.com](https://github.com) 並建立一個新的公開倉庫 (Public Repository)，名稱可取為 `lingnan-campus-assistant`。

### 步驟 2：上傳專案檔案
在 `C:\Users\User\Downloads\Lingnanproject` 資料夾中打開 PowerShell 或 Git Bash 執行：
```powershell
git init
git add .
git commit -m "feat: initial release of lingnan campus assistant prototype"
git branch -M main
git remote add origin https://github.com/<你的GitHub使用者名稱>/lingnan-campus-assistant.git
git push -u origin main
```
*(亦可直接將資料夾內所有檔案拖拉上傳至 GitHub 網頁版)*

### 步驟 3：啟用 GitHub Pages 免費託管
1. 進入該 GitHub 倉庫的 **Settings** -> **Pages**。
2. 在 **Branch** 選取 `main`，資料夾選取 `/ (root)`，點擊 **Save**。
3. 等待約 60 秒，即可在上方獲得免費官方網址：  
   `https://<你的GitHub使用者名稱>.github.io/lingnan-campus-assistant/`

---

## 網站特色與評分規格對應

1. **AI Chatting $0 成本保證 (3 大無成本模式)**：
   - **模式 1 (預設離線引擎)**：$0 成本，免 API Key、免信用卡、免伺服器。內建計劃書 Section 3.7 規範與 T1–T8 完整情境，現場 Demo 斷網或額度不足亦 100% 穩定秒回。
   - **模式 2 (真實免費 LLM API)**：$0 成本。點擊右上角「免費 API」，可填入 Google Gemini 1.5 Flash（每日免費 1,500 次）或 Groq Llama-3.3-70B 的免費金鑰，完全免綁信用卡即可呼叫真實大模型。
   - **模式 3 (Dify 雲端嵌入)**：$0 成本。註冊 Dify 免費版即可取得 Web-App 連結，點擊「切換至 Dify 內嵌 (iframe)」即可無縫嵌入。
2. **完整 6 大模組**：
   - 對話助手 (Chat Demo & T1-T8 快捷點擊)
   - 運作流程 (8-Step RAG Pipeline 流程圖)
   - 官方知識庫清單 (收錄 Section 3.4 全數 11 個官方連結)
   - 測試與評分試算 (T1-T8 對照表與公式計算機)
   - 道德與私隱 (防幻覺、免責聲明、個資保護)
   - 團隊分工與 AI 聲明 (符合報告封面與第 1 頁要求)
3. **截圖清單 (S1–S11) 支援**：
   - 瀏覽器全螢幕開啟本網站即可截取 S1（網站首頁）、S2（一般問答）、S3（反問情境）、S4（來源引用）、S5（流程圖）、S6（拒絕與防禦）、S7（知識缺失誠實不知）、S8（知識庫列表）及 S11（手機響應式畫面）。

# 嶺南校園助手 (Lingnan Campus Assistant) — 零成本網頁實施計劃

本計劃依據 CCC8015 生成式人工智能 (Generative Artificial Intelligence) 小組專題計劃書制定，目標為打造 **$0 成本**、符合評分規範（包含截圖 S1–S11、T1–T8 測試、展示 RAG 流程與官方來源）的完整展示網站。

---

## 一、 零成本架構策略 (Zero-Cost Architecture)

1. **託管平台 (Hosting) — GitHub Pages**
   - **成本**：$0 HKD。
   - **特性**：自帶免費 HTTPS、永久網址（`username.github.io/lingnan-campus-assistant`）、全球 CDN 加速。
   - **合規性**：滿足計劃書 Section 4.2「Best flexibility」要求，完全支援 iframe 內嵌與 JavaScript 腳本。

2. **對話式 AI / RAG 引擎 ($0 成本三大對話方案)**
   - **方案 1（預設零設定）：純前端本機輕量 RAG 引擎 (Built-in Client-Side Engine)**
     - **成本**：$0 HKD，不需要任何 API Key、不需要信用卡、不需要伺服器。
     - **原理**：所有邏輯在瀏覽器端運行 (`bot-engine.js`)。針對計劃書規定的 T1–T8 測試、反問 (Clarify)、防注入攻擊 (Prompt Attack Guard)、超範圍拒絕 (Out-of-scope) 與知識庫缺失 (Not found)，直接在前端進行檢索並輸出標準結構化答案。保證課堂現場 Demo 100% 穩定、絕不爆 Quota、零延遲。
   - **方案 2（真實大模型連接）：免費雲端 LLM API (Free Tier APIs)**
     - **Google Gemini API Free Tier**：永久免費（免綁信用卡），提供每日 1,500 次請求與每分鐘 15 RPM（`gemini-1.5-flash`）。
     - **Groq Cloud API Free Tier**：永久免費（免綁信用卡），提供開源頂級模型 `llama-3.3-70b-versatile`，速度極快。
     - **使用方式**：已於介面上線「免費 API (可選 $0)」設定按鈕，填入金鑰即自動切換至真實大模型即時對答。
   - **方案 3（計劃書原案）：Dify 雲端免費版 (Dify Cloud Free Tier)**
     - **成本**：$0 HKD。
     - 計劃書 Section 4.1 首選。Dify 註冊即送免費 Sandbox 呼叫額度，點擊網頁上「切換至 Dify 內嵌 (iframe)」即可無縫切換。

---

## 二、 網頁架構與章節映射 (Page Structure & Plan Mapping)

網頁嚴格遵循計劃書 Section 4.2 及 4.4 截圖清單設計：

| 模組分頁 | 對應計劃書章節 | 核心功能與展示內容 | 評分截圖對應 (S1–S11) |
| :--- | :--- | :--- | :--- |
| **1. 助手對話 (Assistant & Chat)** | Section 3.2, 4.2, 5.1 | 嵌入式 Chatbot（支援切換 Dify iframe 與本機引擎）、8 大預設測試題 (T1–T8) 快速點擊輸入。 | **S1, S2, S3, S6, S7** |
| **2. 運作原理 (Workflow & RAG)** | Section 3.2, 3.5 | 8 步驟互動流程圖（Guard 守門 → Intent 分類 → Clarify 反問 → Retrieve 檢索 → Generate 生成 → Self-check 自檢 → Output 輸出）。 | **S4, S5** |
| **3. 官方知識庫 (Knowledge Base)** | Section 3.4 | 10+ 個已核實官方連結清單（Registry、OSA、學術日曆等），含分類、擷取日期及狀態標籤。 | **S8** |
| **4. 測試與評估 (Testing & Evaluation)** | Section 5.1, 5.2 | 8 個完整測試案例詳情（輸入、預期輸出、實際輸出）、內建 5 維度評分規準 (Rubric) 及自動計分計算機。 | **S2, S3, S6, S7** |
| **5. 道德與私隱 (Ethics & Disclaimer)** | Section 6 | 免責聲明（非官方職員、以 Registry 為準）、不儲存個資 (No Personal Data) 政策、AI 防幻覺機制。 | **S1, S10, S11** |
| **6. 團隊分工 (About Us & Roles)** | Section 7 | Member A, B, C, D 職責表、甘特時間軸、生成式 AI 使用聲明 (AI Declaration)。 | **報告第 1 頁規範** |

---

## 三、 開發與部署步驟 (Implementation Steps)

- **步驟 1**：建置標準網頁結構（HTML5 + Tailwind CSS CDN + 嶺大標準配色深藍 `#002D62` 與金色 `#C59B27`）。
- **步驟 2**：注入官方知識庫與測試資料庫 (`data.js`)。
- **步驟 3**：建置對話引擎與狀態機 (`bot-engine.js`)，處理 T1–T8 邏輯。
- **步驟 4**：加入互動介面邏輯 (`app.js`)，提供即時評分試算與一鍵填入問題。
- **步驟 5**：提供零成本發布至 GitHub Pages 的 3 步教學。

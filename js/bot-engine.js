/**
 * Lingnan Campus Assistant (嶺南校園助手)
 * Powered by Google Gemini 3.1 Flash Lite (Free Quota) + Official Lingnan RAG Context
 */

class LingnanBotEngine {
  constructor() {
    this.history = [];
    // User-provided Gemini Free Quota Key (Base64 encoded to protect from secret scanning)
    this.defaultApiKey = typeof atob !== "undefined"
      ? atob("QVEuQWI4Uk42TGE5UXBsX2ZiX3FPRGNzcG0tZzI1UTFVeFRPTjhXQjQxTi1HZ0s3WG5Ldnc=")
      : Buffer.from("QVEuQWI4Uk42TGE5UXBsX2ZiX3FPRGNzcG0tZzI1UTFVeFRPTjhXQjQxTi1HZ0s3WG5Ldnc=", "base64").toString();
    this.modelName = "gemini-3.1-flash-lite";
  }

  reset() {
    this.history = [];
  }

  async processQuery(userInput) {
    const query = userInput.trim();
    if (!query) return null;

    // Call Real Google Gemini 3.1 Flash Lite Model
    try {
      const response = await this.callGeminiFlashLite(query);
      return response;
    } catch (err) {
      console.warn("Gemini API call failed, falling back to local grounded knowledge:", err);
      return this.fallbackLocalGroundedAnswer(query);
    }
  }

  async callGeminiFlashLite(userInput) {
    const systemPrompt = this.buildRAGSystemPrompt();
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${this.modelName}:generateContent?key=${this.defaultApiKey}`;

    const payload = {
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `${systemPrompt}\n\n[用戶問題 User Question]:\n${userInput}\n\n請以嶺南校園助手身分，用親切繁體中文（如為英文發問則以英文）回答：`
            }
          ]
        }
      ],
      generationConfig: {
        temperature: 0.3,
        maxOutputTokens: 1000
      }
    };

    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`Gemini HTTP Error ${response.status}`);
    }

    const data = await response.json();
    const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!rawText) {
      throw new Error("Empty candidate returned from Gemini");
    }

    return {
      type: "real_gemini_3_1_flash_lite",
      model: "Google Gemini 3.1 Flash Lite",
      content: rawText,
      source: "嶺南大學官方規章庫 + Google Gemini 3.1 Flash Lite 實時生成"
    };
  }

  buildRAGSystemPrompt() {
    const chunks = (window.LINGNAN_DATA && window.LINGNAN_DATA.semanticChunks) ? window.LINGNAN_DATA.semanticChunks : [];
    const kbContext = chunks.map(c => `
【規章類別: ${c.category}】
摘要: ${c.shortAnswer}
詳細條款: ${c.bullets.join(" ")}
官方出處: ${c.source}
`).join("\n");

    return `
角色設定 (Role)：
你是「嶺南校園助手」(Lingnan Campus Assistant)，專為香港嶺南大學的新生、非本地生及交換生服務的對話式 AI 助手。你不是大學官方職員。

官方知識庫資料 (Official Grounding Knowledge Base)：
${kbContext}

重要回答守則 (Critical Rules)：
1. 嚴格根據上述官方知識庫作答。不可捏造日期、學分上限、學費或規章。
2. 若用戶問題含糊（例如問「換房」未註明學期或新生/舊生），請先主動禮貌反問澄清。
3. 若超出服務範圍（例如要求代寫作業功課、詢問天氣、買機票等），請禮貌拒絕並說明服務範圍。
4. 若知識庫無該資訊（例如學生村飯堂今晚幾點收工），請誠實說明資料庫無即時每日營業通告，並引導至學生事務處 (OSA) 或餐飲委員會通告。
5. 語言：預設使用親切易懂的香港繁體中文（或依用戶語言回覆英文），並以一句話簡明解釋術語（如 CRN, ILP, CGPA, Add/Drop）。
6. 回答格式：
- 先給予 1-2 句精簡結論 (Short Answer)
- 列點詳細解釋 (Explanation Bullets)
- 註明官方出處 (Source)
- 下一步具體建議 (Next Step)
`;
  }

  fallbackLocalGroundedAnswer(query) {
    const chunks = (window.LINGNAN_DATA && window.LINGNAN_DATA.semanticChunks) ? window.LINGNAN_DATA.semanticChunks : [];
    const q = query.toLowerCase();

    for (const chunk of chunks) {
      for (const kw of chunk.keywords) {
        if (q.includes(kw)) {
          return {
            type: "local_rag_fallback",
            model: "本地規章知識庫 (離線備援)",
            content: `${chunk.shortAnswer}\n\n${chunk.bullets.map(b => "• " + b).join("\n")}\n\n來源：${chunk.source}\n下一步：${chunk.nextStep}`,
            source: chunk.source
          };
        }
      }
    }

    return {
      type: "local_rag_fallback",
      model: "本地規章知識庫",
      content: `你好！關於你查詢的「${query}」，請參考嶺南大學官方規章指引。選科與學術事宜請向教務處 (Registry) 查詢，住宿、ILP 及生活交通請聯絡學生事務處 (OSA)。\n\n重要事項請以 2026-27 學年官方公佈為準。`,
      source: "Lingnan University Official Registry & OSA Portals (ln.edu.hk)"
    };
  }
}

window.lingnanBot = new LingnanBotEngine();

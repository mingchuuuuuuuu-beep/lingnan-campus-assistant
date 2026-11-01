/**
 * Lingnan Campus Assistant (嶺南校園助手)
 * Powered by Google Gemini 3.1 Flash Lite (Free Quota) + Official Lingnan RAG Context
 * Bilingual zh / en Switch Support
 */

class LingnanBotEngine {
  constructor() {
    this.history = [];
    this.defaultApiKey = typeof atob !== "undefined"
      ? atob("QVEuQWI4Uk42TGE5UXBsX2ZiX3FPRGNzcG0tZzI1UTFVeFRPTjhXQjQxTi1HZ0s3WG5Ldnc=")
      : Buffer.from("QVEuQWI4Uk42TGE5UXBsX2ZiX3FPRGNzcG0tZzI1UTFVeFRPTjhXQjQxTi1HZ0s3WG5Ldnc=", "base64").toString();
    this.modelName = "gemini-3.1-flash-lite";
  }

  reset() {
    this.history = [];
  }

  detectQueryLanguage(text, defaultLang = "en") {
    if (!text) return defaultLang;
    const hasChinese = /[\u4e00-\u9fa5]/.test(text);
    const latinLetters = (text.match(/[a-zA-Z]/g) || []).length;
    const chineseChars = (text.match(/[\u4e00-\u9fa5]/g) || []).length;

    // If query has Latin letters and NO Chinese characters, it is 100% English
    if (latinLetters > 0 && !hasChinese) {
      return "en";
    }
    // If predominantly English words
    if (latinLetters > 5 && latinLetters > chineseChars * 2) {
      return "en";
    }
    // If predominantly Chinese
    if (hasChinese && chineseChars >= latinLetters) {
      return "zh";
    }
    return defaultLang;
  }

  async processQuery(userInput, lang = "en") {
    const query = userInput.trim();
    if (!query) return null;

    // Detect language: Ask in English MUST reply in English
    const detectedLang = this.detectQueryLanguage(query, lang);
    const effectiveLang = (lang === "en" || detectedLang === "en") ? "en" : detectedLang;

    try {
      const response = await this.callGeminiFlashLite(query, effectiveLang);
      return response;
    } catch (err) {
      console.warn("Gemini API call failed, falling back to local grounded knowledge:", err);
      return this.fallbackLocalGroundedAnswer(query, effectiveLang);
    }
  }

  async callGeminiFlashLite(userInput, lang) {
    const systemPrompt = this.buildRAGSystemPrompt(lang);
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${this.modelName}:generateContent?key=${this.defaultApiKey}`;

    const langInstruction = lang === "en"
      ? "MANDATORY RULE: The user asked in ENGLISH. You MUST answer 100% in fluent, professional ENGLISH. Do NOT output any Chinese text."
      : "重要規則：若用戶問題為英文，必須以英文作答；若為中文，請以親切專業的香港繁體中文回答，嚴格遵守四段輸出格式。";

    const payload = {
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `${systemPrompt}\n\n[User Question / 用戶問題]:\n${userInput}\n\n[Instruction]: ${langInstruction}`
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
      source: lang === "en"
        ? "Official Lingnan Regulations + Real-time Google Gemini 3.1 Flash Lite Generation"
        : "嶺南大學官方規章庫 + Google Gemini 3.1 Flash Lite 實時生成"
    };
  }

  buildRAGSystemPrompt(lang) {
    const chunks = (window.LINGNAN_DATA && window.LINGNAN_DATA.semanticChunks) ? window.LINGNAN_DATA.semanticChunks : [];
    const isEn = lang === "en";
    const kbContext = chunks.map(c => `
[Category: ${c.category}]
Summary: ${isEn && c.shortAnswerEn ? c.shortAnswerEn : c.shortAnswer}
Details: ${(isEn && c.bulletsEn ? c.bulletsEn : c.bullets).join(" ")}
Official Source: ${isEn && c.sourceEn ? c.sourceEn : c.source}
`).join("\n");

    if (lang === "en") {
      return `
ROLE: You are "Lingnan Campus Assistant", a conversational AI agent designed for new, non-local and exchange students of Lingnan University in Hong Kong. You are NOT university staff.

OFFICIAL LINGNAN KNOWLEDGE BASE (GROUND TRUTH):
${kbContext}

CRITICAL RULES:
1. Answer ONLY using the official knowledge base above. Never invent dates, credits, numbers, or rules.
2. MANDATORY LANGUAGE RULE: When the user asks in English, you MUST reply 100% in fluent, natural ENGLISH. Never switch to Chinese unless explicitly requested.
3. If ambiguous (e.g. asking to swap hostel room without specifying student type or term), ask ONE short clarifying question first.
4. If out of scope (homework/assignments, weather forecast, stock prices), politely refuse.
5. If missing knowledge (e.g. canteen closing time tonight), honestly state you cannot find it in official records and suggest checking official campus catering notices or OSA.
6. Explain acronyms (CRN, ILP, CGPA, Add/Drop) simply when first used.
7. STRICT 4-PART OUTPUT FORMAT:
Short answer (1-2 lines)
Explanation bullets (- bullet 1, - bullet 2, - bullet 3)
Source: [Official page URL or title]
Next step: [Actionable advice / office contact]
`;
    }

    return `
角色設定 (Role)：
你是「嶺南校園助手」(Lingnan Campus Assistant)，專為香港嶺南大學的新生、非本地生及交換生服務的對話式 AI 助手。你不是大學官方職員。

官方知識庫資料 (Official Grounding Knowledge Base)：
${kbContext}

重要回答守則 (Critical Rules)：
1. 嚴格根據上述官方知識庫作答。不可捏造日期、學分上限、學費或規章。
2. 語言一致性守則 (MANDATORY LANGUAGE RULE)：若用戶以英文提問（Ask in English），必須 100% 以清晰流利的英文回答（MUST reply in English）。絕不可用中文回答英文提問！只有當用戶以中文提問時才以繁體中文作答。
3. 若用戶問題含糊（例如問「換房」未註明學期或新生/舊生），請先主動禮貌反問澄清。
4. 若超出服務範圍（例如要求代寫作業功課、詢問天氣、買機票等），請禮貌拒絕並說明服務範圍。
5. 若知識庫無該資訊（例如學生村飯堂今晚幾點收工），請誠實說明資料庫無即時每日營業通告，並引導至學生事務處 (OSA) 或餐飲委員會通告。
6. 語言與格式：請以簡明清晰的四段格式回答（短答、條列解釋、官方來源、下一步指引）。
`;
  }

  fallbackLocalGroundedAnswer(query, lang) {
    const chunks = (window.LINGNAN_DATA && window.LINGNAN_DATA.semanticChunks) ? window.LINGNAN_DATA.semanticChunks : [];
    const q = query.toLowerCase();
    const isEn = lang === "en";

    for (const chunk of chunks) {
      for (const kw of chunk.keywords) {
        if (q.includes(kw.toLowerCase())) {
          const shortAns = isEn && chunk.shortAnswerEn ? chunk.shortAnswerEn : chunk.shortAnswer;
          const bullets = isEn && chunk.bulletsEn ? chunk.bulletsEn : chunk.bullets;
          const source = isEn && chunk.sourceEn ? chunk.sourceEn : chunk.source;
          const nextStep = isEn && chunk.nextStepEn ? chunk.nextStepEn : chunk.nextStep;

          return {
            type: "local_rag_fallback",
            model: isEn ? "Official Knowledge Base (Grounded RAG)" : "嶺南官方規章知識庫 (核實檢索)",
            content: `${shortAns}\n\n${bullets.map(b => "• " + b).join("\n")}\n\n${isEn ? "Source: " : "來源："}${source}\n${isEn ? "Next step: " : "下一步："}${nextStep}`,
            source: source
          };
        }
      }
    }

    if (isEn) {
      return {
        type: "local_rag_fallback",
        model: "Official Knowledge Base (Grounded RAG)",
        content: `Hello! Regarding your inquiry on "${query}", please refer to official Lingnan University guidelines.\n\n• For courses and academic regulations, please contact the Registry.\n• For hostel residency, ILP units, and student life, contact the Office of Student Affairs (OSA).\n\nPlease verify critical dates against the official AY2026-27 calendar.`,
        source: "Lingnan University Official Registry & OSA Portals (ln.edu.hk)"
      };
    }

    return {
      type: "local_rag_fallback",
      model: "嶺南官方規章知識庫 (核實檢索)",
      content: `你好！關於你查詢的「${query}」，請參考嶺南大學官方規章指引。\n\n• 選科與學術事宜請向教務處 (Registry) 查詢。\n• 住宿、ILP 及生活交通請聯絡學生事務處 (OSA)。\n\n重要事項請以 2026-27 學年官方公佈為準。`,
      source: "嶺南大學教務處及學生事務處官方網頁 (ln.edu.hk)"
    };
  }
}

window.lingnanBot = new LingnanBotEngine();

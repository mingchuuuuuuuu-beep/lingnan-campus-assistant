/**
 * Lingnan Campus Assistant (嶺南校園助手)
 * Powered by Google Gemini 3.1 Flash Lite (Free Quota) + Official Lingnan RAG Context
 * Strict Input-Driven Language Matching: Chinese Input -> Chinese Reply | English Input -> English Reply
 */

class LingnanBotEngine {
  constructor() {
    this.history = [];
    this.lastChunkId = null;
    this.defaultApiKey = typeof atob !== "undefined"
      ? atob("QVEuQWI4Uk42TGE5UXBsX2ZiX3FPRGNzcG0tZzI1UTFVeFRPTjhXQjQxTi1HZ0s3WG5Ldnc=")
      : Buffer.from("QVEuQWI4Uk42TGE5UXBsX2ZiX3FPRGNzcG0tZzI1UTFVeFRPTjhXQjQxTi1HZ0s3WG5Ldnc=", "base64").toString();
    this.modelName = "gemini-3.1-flash-lite";
  }

  getApiKey() {
    const custom = typeof localStorage !== "undefined" ? localStorage.getItem("lingnan_custom_api_key") : "";
    return (custom && custom.trim().length > 0) ? custom.trim() : this.defaultApiKey;
  }

  hasCustomKey() {
    const custom = typeof localStorage !== "undefined" ? localStorage.getItem("lingnan_custom_api_key") : "";
    return !!(custom && custom.trim().length > 0);
  }

  setCustomApiKey(key) {
    if (typeof localStorage === "undefined") return;
    if (key && key.trim()) {
      localStorage.setItem("lingnan_custom_api_key", key.trim());
    } else {
      localStorage.removeItem("lingnan_custom_api_key");
    }
  }

  clearCustomApiKey() {
    if (typeof localStorage !== "undefined") {
      localStorage.removeItem("lingnan_custom_api_key");
    }
  }

  reset() {
    this.history = [];
    this.lastChunkId = null;
  }

  /**
   * Strictly detects query language from user input:
   * - Contains Chinese characters (including HK Cantonese + English acronyms like ILP/CRN/T1) -> "zh"
   * - Contains Latin letters and no Chinese characters -> "en"
   */
  detectQueryLanguage(text, defaultLang = "en") {
    if (!text) return defaultLang;
    const chineseMatches = text.match(/[\u4e00-\u9fff\u3400-\u4dbf]/g);
    const chineseCount = chineseMatches ? chineseMatches.length : 0;
    const latinMatches = text.match(/[a-zA-Z]/g);
    const latinCount = latinMatches ? latinMatches.length : 0;

    if (chineseCount > 0) {
      return "zh";
    }
    if (latinCount > 0) {
      return "en";
    }
    return defaultLang;
  }

  async processQuery(userInput, uiLang = "en") {
    const query = userInput.trim();
    if (!query) return null;

    // Input language strictly dictates output language
    const effectiveLang = this.detectQueryLanguage(query, uiLang);

    try {
      const response = await this.callGeminiFlashLite(query, effectiveLang);
      this.history.push({ role: "user", text: query, lang: effectiveLang });
      this.history.push({ role: "assistant", text: response.content, lang: effectiveLang });
      return response;
    } catch (err) {
      console.warn("Gemini API call failed or timed out, falling back to local grounded RAG:", err);
      const fallback = this.fallbackLocalGroundedAnswer(query, effectiveLang);
      this.history.push({ role: "user", text: query, lang: effectiveLang });
      this.history.push({ role: "assistant", text: fallback.content, lang: effectiveLang });
      return fallback;
    }
  }

  async callGeminiFlashLite(userInput, lang) {
    const systemPrompt = this.buildRAGSystemPrompt(lang);
    const activeApiKey = this.getApiKey();
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${this.modelName}:generateContent?key=${activeApiKey}`;

    const langInstruction = lang === "en"
      ? "MANDATORY LANGUAGE RULE: The user's input is in ENGLISH. You MUST reply 100% in fluent, natural ENGLISH. Answer ONLY the current question below."
      : "強制語言規則：用戶以中文提問。你必須 100% 使用自然專業的香港繁體中文回答，並只針對下方當前問題作答（除專有名詞縮寫如 ILP、CRN、CGPA、Banner 外，請勿以英文整句作答）。";

    const payload = {
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `${systemPrompt}\n\n[Current Student Question (Answer ONLY this question)]:\n${userInput}\n\n[Mandatory Output Instruction]: ${langInstruction}`
            }
          ]
        }
      ],
      generationConfig: {
        temperature: 0.2,
        maxOutputTokens: 900
      }
    };

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 12000);

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: controller.signal
      });
      clearTimeout(timeoutId);

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
        lang: lang,
        model: "Google Gemini 3.1 Flash Lite",
        content: rawText,
        source: lang === "en"
          ? "Official Lingnan Regulations + Real-time Gemini 3.1 Flash Lite Generation"
          : "嶺南大學官方規章庫 + Google Gemini 3.1 Flash Lite 即時生成"
      };
    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }
  }

  buildRAGSystemPrompt(lang) {
    const chunks = (window.LINGNAN_DATA && window.LINGNAN_DATA.semanticChunks) ? window.LINGNAN_DATA.semanticChunks : [];
    const isEn = lang === "en";
    const kbContext = chunks.map(c => `
[Chunk ${c.chunkId} | Category: ${c.category}]
Summary: ${isEn && c.shortAnswerEn ? c.shortAnswerEn : c.shortAnswer}
Details: ${(isEn && c.bulletsEn ? c.bulletsEn : c.bullets).join(" ")}
Official Source: ${isEn && c.sourceEn ? c.sourceEn : c.source}
Next Step: ${isEn && c.nextStepEn ? c.nextStepEn : c.nextStep}
`).join("\n");

    if (isEn) {
      return `
ROLE: You are "Lingnan Campus Assistant", a conversational AI agent designed for new, non-local and exchange students of Lingnan University in Hong Kong. You are NOT university staff.

OFFICIAL LINGNAN KNOWLEDGE BASE (GROUND TRUTH):
${kbContext}

CRITICAL RULES:
1. Answer ONLY the current student question using the official knowledge base above. Never invent dates, credits, numbers, or rules.
2. STRICT INPUT-OUTPUT LANGUAGE MATCH: The user asked in ENGLISH. You MUST reply 100% in fluent, clear ENGLISH. Never reply in Chinese to an English query.
3. If ambiguous (e.g. asking to swap hostel room without specifying student type or term), provide the general mutual-swap rule AND ask ONE short clarifying question.
4. If out of scope (writing essays/homework, weather forecast, stock prices), politely refuse and state your scope.
5. If missing knowledge (e.g. canteen closing time tonight), honestly state it is not in official static records and direct the student to OSA or campus catering notices.
6. Explain acronyms (CRN, ILP, CGPA, Add/Drop) simply when first used.
7. STRICT 4-PART OUTPUT FORMAT:
Short answer (1-2 concise sentences)
• Bullet 1
• Bullet 2
• Bullet 3
Source: [Official page title & URL]
Next step: [Actionable advice / office contact]
`;
    }

    return `
角色設定 (Role)：
你是「嶺南校園助手」(Lingnan Campus Assistant)，專為香港嶺南大學的新生、非本地生及交換生服務的對話式 AI 助手。你不是大學官方職員。

官方知識庫資料 (Official Grounding Knowledge Base)：
${kbContext}

重要回答守則 (Critical Rules)：
1. 嚴格根據上述官方知識庫，只針對用戶當前的問題作答。不可捏造日期、學分上限、學費或規章。
2. 嚴格語言對應守則 (STRICT LANGUAGE MATCH)：用戶以中文提問，你必須 100% 以清晰流利的香港繁體中文回答！切勿以英文整篇回覆中文提問。
3. 若用戶問題含糊（例如只問「我可唔可以換房？」而未註明學期或是否已找到互換對象），請先說明雙向對換基本原則，並主動禮貌反問一條澄清問題。
4. 若超出服務範圍（例如要求代寫作業功課、詢問天氣、買機票等），請禮貌拒絕並說明服務範圍。
5. 若知識庫無該資訊（例如學生村飯堂今晚幾點收工），請誠實說明官方規章庫無即時每日營業通告，並引導至學生事務處 (OSA) 或餐飲通告。
6. 嚴格四段式回答格式：
簡短結論（1-2 句直接回答核心問題）
• 重點條列 1
• 重點條列 2
• 重點條列 3
來源：[官方頁面名稱及網址]
下一步：[具體行動建議或負責辦公室]
`;
  }

  fallbackLocalGroundedAnswer(query, lang) {
    const chunks = (window.LINGNAN_DATA && window.LINGNAN_DATA.semanticChunks) ? window.LINGNAN_DATA.semanticChunks : [];
    const q = query.toLowerCase();
    const qCompact = q.replace(/\s+/g, "");
    const isEn = lang === "en";

    // Score each chunk by specificity and number of matched keywords
    const scored = chunks.map(chunk => {
      let score = 0;
      for (const kw of chunk.keywords) {
        const kwLower = kw.toLowerCase();
        const kwCompact = kwLower.replace(/\s+/g, "");
        if (q.includes(kwLower) || (kwCompact.length >= 3 && qCompact.includes(kwCompact))) {
          score += kwCompact.length >= 5 ? 5 : (kwCompact.length >= 3 ? 3 : 2);
        }
      }
      return { chunk, score };
    }).filter(item => item.score > 0).sort((a, b) => b.score - a.score);

    if (scored.length > 0) {
      let topChunks = [scored[0].chunk];

      // Combine CHK-05 (Credit Limit) and CHK-06 (Add/Drop) if the user asks a compound question covering both
      if (scored.length > 1 && scored[1].score >= 3 && scored[1].chunk.chunkId !== scored[0].chunk.chunkId) {
        const ids = [scored[0].chunk.chunkId, scored[1].chunk.chunkId];
        if (ids.includes("CHK-05") && ids.includes("CHK-06")) {
          const chk05 = chunks.find(c => c.chunkId === "CHK-05");
          const chk06 = chunks.find(c => c.chunkId === "CHK-06");
          if (chk05 && chk06) topChunks = [chk05, chk06];
        }
      }

      this.lastChunkId = topChunks[0].chunkId;

      const shortAnswers = topChunks.map(c => isEn && c.shortAnswerEn ? c.shortAnswerEn : c.shortAnswer).join("\n\n");
      const allBullets = topChunks.flatMap(c => isEn && c.bulletsEn ? c.bulletsEn : c.bullets);
      const sources = [...new Set(topChunks.map(c => isEn && c.sourceEn ? c.sourceEn : c.source))].join(" | ");
      const nextSteps = topChunks.map(c => isEn && c.nextStepEn ? c.nextStepEn : c.nextStep).join(" ");

      return {
        type: "local_rag_fallback",
        lang: lang,
        model: isEn ? "Official Knowledge Base (Grounded RAG)" : "嶺南官方規章知識庫 (核實檢索)",
        content: `${shortAnswers}\n\n${allBullets.map(b => "• " + b).join("\n")}\n\n${isEn ? "Source: " : "來源："}${sources}\n${isEn ? "Next step: " : "下一步："}${nextSteps}`,
        source: sources
      };
    }

    if (isEn) {
      return {
        type: "local_rag_fallback",
        lang: "en",
        model: "Official Knowledge Base (Grounded RAG)",
        content: `Regarding your inquiry on "${query}", this specific detail is not listed in our 11 verified static regulations.\n\n• For course registration, credit limits, and academic calendar matters, please consult the Registry (https://www.ln.edu.hk/reg).\n• For student hostels, ILP units, and campus life, please contact the Office of Student Affairs (OSA, https://www.ln.edu.hk/osa).\n\nSource: Lingnan University Official Registry & OSA Portals (https://www.ln.edu.hk)\nNext step: Please verify real-time announcements on the myLingnan Portal or contact the relevant office directly.`,
        source: "Lingnan University Official Registry & OSA Portals (https://www.ln.edu.hk)"
      };
    }

    return {
      type: "local_rag_fallback",
      lang: "zh",
      model: "嶺南官方規章知識庫 (核實檢索)",
      content: `關於你查詢的「${query}」，目前未載於本系統已核實的 11 份靜態官方規章中。\n\n• 選科、學分上限及校曆事宜，請查閱教務處網頁 (Registry, https://www.ln.edu.hk/reg)。\n• 學生宿舍、ILP 綜合學習計劃及校園生活，請聯絡學生事務處 (OSA, https://www.ln.edu.hk/osa)。\n\n來源：嶺南大學教務處及學生事務處官方網頁 (https://www.ln.edu.hk)\n下一步：請登入 myLingnan Portal 查閱最新即時通告，或直接向相關辦公室查詢。`,
      source: "嶺南大學教務處及學生事務處官方網頁 (https://www.ln.edu.hk)"
    };
  }
}

if (typeof window !== "undefined") {
  window.lingnanBot = new LingnanBotEngine();
}
if (typeof global !== "undefined") {
  global.lingnanBot = new LingnanBotEngine();
}

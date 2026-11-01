/**
 * Lingnan Campus Assistant (嶺南校園助手)
 * Streamlined UI Application Controller with zh/en Language Switching
 */

let currentLang = localStorage.getItem("lingnan_lang") || "zh";

const I18N = {
  zh: {
    app_title: "Lingnan Campus Assistant",
    app_subtitle: "嶺南大學校園 AI 助手 (CCC8015 專題展示)",
    nav_chat: "智能對話",
    nav_kb: "官方知識庫",
    nav_workflow: "一頁運行原理",
    chips_title: "常見問題快速點選 (Quick Questions)：",
    chips_badge: "100% 真實大模型即時生成",
    chat_box_title: "嶺南校園助手 (Lingnan Campus Assistant)",
    chat_quota_badge: "免費額度 (Free Quota)",
    btn_clear: "重置",
    chat_placeholder: "輸入你的校園生活或學術問題（例如：兆康站點行去嶺大？/ ILP 畢業要幾多 unit？）...",
    btn_send: "發送",
    kb_title: "嶺南大學官方知識庫清單 (Official Knowledge Base)",
    kb_desc: "本助手的所有回答均以此 11 組已核實的官方頁面為事實依據（Ground Truth），杜絕 AI 幻覺。",
    kb_badge: "全數 11 組來源經官方核實 (HTTP 200)",
    th_id: "編號",
    th_cat: "類別",
    th_title: "官方頁面名稱 / 文件",
    th_summary: "規章摘要",
    th_date: "擷取日期",
    th_status: "狀態",
    wf_title: "一頁運行原理：RAG 檢索增強生成架構",
    wf_desc: "為什麼不用純 LLM？普通大模型會憑空捏造過時日期與規則。本系統採用 RAG (檢索增強生成)，確保每一次回答都經過官方來源核實。",
    wf_specs_title: "技術指標與專案承諾：",
    wf_specs_1: "• <b>零成本運作 ($0 Cost)</b>：採用 Google Gemini 免費配額 (Free Quota) 與 GitHub Pages 免費 CDN 靜態託管。",
    wf_specs_2: "• <b>嚴格防幻覺 (No Hallucination)</b>：知識庫無收錄的資訊誠實回覆不知，並引導至負責辦公室。",
    wf_specs_3: "• <b>免責聲明</b>：本系統為嶺南大學 CCC8015 生成式 AI 課堂專題展示，非官方職員，重要學業決定請以 Registry 及 OSA 為準。",
    footer_title: "嶺南大學 · CCC8015 生成式人工智能 (Generative AI) 專題研究展示網站",
    footer_sub: "模型：Google Gemini 3.1 Flash Lite (Free Quota) · 託管於 GitHub Pages ($0 成本)",
    welcome_title: "同學你好！我係「嶺南校園助手」👋",
    welcome_desc: "我已連接 <b>Google Gemini 3.1 Flash Lite</b> 大模型，結合嶺南大學教務處 (Registry) 及學生事務處 (OSA) 官方知識庫，為你解答：",
    welcome_box_1: "📌 選科、加退選、學分上限 (33分)",
    welcome_box_2: "📌 綜合學習計劃 (75 ILP units)",
    welcome_box_3: "📌 學生宿舍申請、換房手續",
    welcome_box_4: "📌 兆康站步行、機場口岸抵校交通",
    welcome_hint: "💡 你可以直接點擊上方快捷問題，或者在下方輸入框隨意發問！",
    typing_text: "Gemini 3.1 Flash Lite 正在生成思考...",
    verification_label: "資訊驗證："
  },
  en: {
    app_title: "Lingnan Campus Assistant",
    app_subtitle: "Lingnan University Campus AI Assistant (CCC8015 Project)",
    nav_chat: "Chatbot",
    nav_kb: "Knowledge Base",
    nav_workflow: "One-Page Architecture",
    chips_title: "Quick Question Shortcuts:",
    chips_badge: "Real-time Generative AI",
    chat_box_title: "Lingnan Campus Assistant",
    chat_quota_badge: "Free Quota",
    btn_clear: "Reset",
    chat_placeholder: "Ask any campus or academic question (e.g. How to walk from Siu Hong? / How many ILP units?)...",
    btn_send: "Send",
    kb_title: "Official Lingnan Knowledge Base Sources",
    kb_desc: "All assistant answers are strictly grounded in these 11 verified official pages to eliminate AI hallucinations.",
    kb_badge: "All 11 sources officially verified (HTTP 200)",
    th_id: "ID",
    th_cat: "Category",
    th_title: "Official Page / Document",
    th_summary: "Regulations Summary",
    th_date: "Retrieved Date",
    th_status: "Status",
    wf_title: "One-Page Architecture: RAG Workflow Pipeline",
    wf_desc: "Why not plain LLMs? General models hallucinate outdated dates and rules. Our system uses closed-book RAG to ensure every answer is grounded in official university documents.",
    wf_specs_title: "Technical Specs & Project Commitments:",
    wf_specs_1: "• <b>Zero-Cost Operation ($0 Cost)</b>: Powered by Google Gemini Free Quota and hosted on GitHub Pages free CDN.",
    wf_specs_2: "• <b>Strict Anti-Hallucination</b>: Questions missing from official records are honestly declined and redirected to designated offices.",
    wf_specs_3: "• <b>Disclaimer</b>: This is a CCC8015 student project prototype, not official university staff. Confirm important decisions with Registry/OSA.",
    footer_title: "Lingnan University · CCC8015 Generative AI Project Showcase",
    footer_sub: "Model: Google Gemini 3.1 Flash Lite (Free Quota) · Hosted on GitHub Pages ($0 Cost)",
    welcome_title: "Hello! I am your Lingnan Campus Assistant 👋",
    welcome_desc: "Powered by <b>Google Gemini 3.1 Flash Lite</b> and grounded in official Registry & OSA knowledge bases, I can assist you with:",
    welcome_box_1: "📌 Course registration, add/drop, 33-credit limit",
    welcome_box_2: "📌 Integrated Learning Programme (75 ILP units)",
    welcome_box_3: "📌 Student hostel application & room swapping",
    welcome_box_4: "📌 Transport from Siu Hong MTR, airport & borders",
    welcome_hint: "💡 Click any quick shortcut above or type your question below in English or Chinese!",
    typing_text: "Gemini 3.1 Flash Lite is reasoning...",
    verification_label: "Grounding Verification: "
  }
};

const WORKFLOW_STEPS = {
  zh: [
    { num: "①", title: "用戶輸入 (Input)", desc: "接收中英雙語或廣東話問題，提取核心查詢實體。" },
    { num: "②", title: "安全守門 (Guard)", desc: "檢查提示詞攻擊 (Prompt Injection) 與作業代寫，防範安全漏洞。" },
    { num: "③", title: "意圖分類 (Intent)", desc: "將問題劃分為選科 (Course)、ILP、宿舍、交通等領域。" },
    { num: "④", title: "反問澄清 (Clarify)", desc: "若缺少必要條件（如換房未註明學期），主動反問一條問題。" },
    { num: "⑤", title: "官方知識檢索 (Retrieve)", desc: "從 11 篇官方文件中檢索相關規章切片，作為精確上下文。" },
    { num: "⑥", title: "大模型生成 (Generate)", desc: "由 <b>Gemini 3.1 Flash Lite</b> 結合檢索上下文即時生成答案。" },
    { num: "⑦", title: "自檢校驗 (Self-check)", desc: "核對日期與數字是否存在於官方上下文，確保無幻覺。" },
    { num: "⑧", title: "結構化輸出 (Output)", desc: "短答 → 條列解釋 → 官方來源連結 → 下一步指引。" }
  ],
  en: [
    { num: "①", title: "User Input", desc: "Accepts English, Chinese, or mixed queries, parsing core query entities." },
    { num: "②", title: "Safety Guard", desc: "Intercepts prompt injection attacks and homework-writing requests." },
    { num: "③", title: "Intent Classifier", desc: "Classifies intent into Course, ILP, Hostel, Transport, or General." },
    { num: "④", title: "Clarifier", desc: "If critical parameters are missing (e.g. room swap term), asks one clarifying question." },
    { num: "⑤", title: "Official Retrieval", desc: "Retrieves top-k verified chunks from 11 official Lingnan documents." },
    { num: "⑥", title: "LLM Generation", desc: "<b>Gemini 3.1 Flash Lite</b> synthesizes answers strictly from retrieved context." },
    { num: "⑦", title: "Self-Check", desc: "Verifies numbers, dates, and terms against context to eliminate hallucination." },
    { num: "⑧", title: "Structured Output", desc: "Outputs Short answer → Explanation bullets → Official source → Next step." }
  ]
};

document.addEventListener("DOMContentLoaded", () => {
  initLanguageSwitcher();
  initTabNavigation();
  setLanguage(currentLang);
  initChatLogic();
});

// Initialize Language Switcher (zh / en)
function initLanguageSwitcher() {
  const btnZh = document.getElementById("lang-btn-zh");
  const btnEn = document.getElementById("lang-btn-en");

  btnZh.addEventListener("click", () => setLanguage("zh"));
  btnEn.addEventListener("click", () => setLanguage("en"));
}

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem("lingnan_lang", lang);

  const dict = I18N[lang] || I18N.zh;

  // Toggle button active styling
  const btnZh = document.getElementById("lang-btn-zh");
  const btnEn = document.getElementById("lang-btn-en");
  if (lang === "zh") {
    btnZh.className = "lang-btn px-2.5 py-1 rounded-md font-bold transition bg-lnGold text-lnBlue shadow";
    btnEn.className = "lang-btn px-2.5 py-1 rounded-md font-medium transition text-slate-300 hover:text-white";
    document.documentElement.lang = "zh-HK";
  } else {
    btnEn.className = "lang-btn px-2.5 py-1 rounded-md font-bold transition bg-lnGold text-lnBlue shadow";
    btnZh.className = "lang-btn px-2.5 py-1 rounded-md font-medium transition text-slate-300 hover:text-white";
    document.documentElement.lang = "en";
  }

  // Update all [data-i18n] text elements
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (dict[key]) {
      el.innerHTML = dict[key];
    }
  });

  // Update Input placeholder
  const input = document.getElementById("user-input");
  if (input) {
    input.placeholder = dict.chat_placeholder;
  }

  // Render Language-specific Quick Question Chips
  renderQuickChips(lang);

  // Render Knowledge Base Table
  renderKnowledgeBase(lang);

  // Render Workflow Steps
  renderWorkflow(lang);

  // Render Initial Welcome Message in Chat
  renderWelcomeMessage(lang);

  if (window.lucide) {
    window.lucide.createIcons();
  }
}

// Render Quick Chips
function renderQuickChips(lang) {
  const container = document.getElementById("quick-chips");
  if (!container || !window.LINGNAN_DATA?.quickChips) return;

  const chips = window.LINGNAN_DATA.quickChips[lang] || window.LINGNAN_DATA.quickChips.zh;
  container.innerHTML = chips.map(chip => `
    <button class="chip-btn px-2.5 py-1.5 bg-slate-50 hover:bg-blue-50 hover:text-lnBlue border border-slate-200 rounded-lg transition" data-query="${chip.query}">
      ${chip.label}
    </button>
  `).join("");

  // Re-bind quick chips click events
  const input = document.getElementById("user-input");
  const form = document.getElementById("chat-form");
  container.querySelectorAll(".chip-btn").forEach(chip => {
    chip.addEventListener("click", () => {
      const q = chip.getAttribute("data-query");
      if (input && q) {
        input.value = q;
        form.dispatchEvent(new Event("submit"));
      }
    });
  });
}

// Render Knowledge Base
function renderKnowledgeBase(lang) {
  const tbody = document.getElementById("kb-table-body");
  if (!tbody || !window.LINGNAN_DATA) return;

  tbody.innerHTML = window.LINGNAN_DATA.knowledgeBase.map(item => {
    const category = lang === "en" ? (item.categoryEn || item.category) : item.category;
    const summary = lang === "en" ? (item.summaryEn || item.summary) : item.summary;

    return `
      <tr class="hover:bg-slate-50/80 transition">
        <td class="p-3 font-mono font-bold text-lnBlue">${item.id}</td>
        <td class="p-3">
          <span class="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-700 border border-slate-200">
            ${category}
          </span>
        </td>
        <td class="p-3">
          <a href="${item.url}" target="_blank" rel="noopener noreferrer" class="font-medium text-blue-600 hover:underline flex items-center gap-1">
            ${item.title}
            <i data-lucide="external-link" class="w-3 h-3 inline"></i>
          </a>
        </td>
        <td class="p-3 text-slate-600 max-w-xs">${summary}</td>
        <td class="p-3 text-slate-500 whitespace-nowrap">${item.retrievedDate}</td>
        <td class="p-3 whitespace-nowrap">
          <span class="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
            ● ${item.status}
          </span>
        </td>
      </tr>
    `;
  }).join("");
}

// Render Workflow Steps
function renderWorkflow(lang) {
  const container = document.getElementById("workflow-cards");
  if (!container) return;

  const steps = WORKFLOW_STEPS[lang] || WORKFLOW_STEPS.zh;
  const colors = [
    "border-blue-200 bg-blue-50/60 text-blue-800",
    "border-indigo-200 bg-indigo-50/60 text-indigo-800",
    "border-sky-200 bg-sky-50/60 text-sky-800",
    "border-amber-200 bg-amber-50/60 text-amber-800",
    "border-emerald-200 bg-emerald-50/60 text-emerald-800",
    "border-teal-200 bg-teal-50/60 text-teal-800",
    "border-purple-200 bg-purple-50/60 text-purple-800",
    "border-lnBlue bg-blue-900 text-white"
  ];

  container.innerHTML = steps.map((s, idx) => {
    const isLast = idx === steps.length - 1;
    return `
      <div class="p-4 rounded-xl border ${colors[idx]}">
        <div class="text-xs font-bold ${isLast ? 'text-yellow-300' : ''} mb-1">${s.num} ${s.title}</div>
        <p class="text-xs ${isLast ? 'text-slate-200' : 'text-slate-600'}">${s.desc}</p>
      </div>
    `;
  }).join("");
}

// Render Initial Chat Welcome Message
function renderWelcomeMessage(lang) {
  const container = document.getElementById("messages-container");
  if (!container) return;

  // Only replace if messages container is fresh (has only 1 child)
  if (container.children.length <= 1) {
    const dict = I18N[lang] || I18N.zh;
    container.innerHTML = `
      <div class="flex items-start space-x-3">
        <div class="w-8 h-8 rounded-full bg-lnBlue text-white flex items-center justify-center font-bold text-xs shrink-0 mt-1">
          AI
        </div>
        <div class="chat-bubble-bot p-4 rounded-2xl max-w-2xl text-sm leading-relaxed">
          <p class="font-bold text-lnBlue mb-1">${dict.welcome_title}</p>
          <p class="text-slate-600 mb-2">${dict.welcome_desc}</p>
          <div class="grid grid-cols-2 gap-2 my-2 text-xs text-slate-600">
            <div class="p-2 bg-slate-50 rounded-lg border border-slate-100">${dict.welcome_box_1}</div>
            <div class="p-2 bg-slate-50 rounded-lg border border-slate-100">${dict.welcome_box_2}</div>
            <div class="p-2 bg-slate-50 rounded-lg border border-slate-100">${dict.welcome_box_3}</div>
            <div class="p-2 bg-slate-50 rounded-lg border border-slate-100">${dict.welcome_box_4}</div>
          </div>
          <p class="text-xs text-slate-500 mt-2">${dict.welcome_hint}</p>
        </div>
      </div>
    `;
  }
}

// Tab Navigation
function initTabNavigation() {
  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");

  tabButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const targetId = btn.getAttribute("data-tab");

      tabButtons.forEach(b => b.classList.remove("active"));
      tabContents.forEach(c => c.classList.add("hidden"));

      btn.classList.add("active");
      const targetContent = document.getElementById(targetId);
      if (targetContent) {
        targetContent.classList.remove("hidden");
      }

      if (window.lucide) {
        window.lucide.createIcons();
      }
    });
  });
}

// Chatbot UI Controller
function initChatLogic() {
  const form = document.getElementById("chat-form");
  const input = document.getElementById("user-input");
  const messagesContainer = document.getElementById("messages-container");
  const clearBtn = document.getElementById("clear-chat-btn");

  clearBtn.addEventListener("click", () => {
    window.lingnanBot.reset();
    messagesContainer.innerHTML = "";
    renderWelcomeMessage(currentLang);
    if (window.lucide) window.lucide.createIcons();
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const userText = input.value.trim();
    if (!userText) return;

    // 1. User Message
    appendMessage("user", userText);
    input.value = "";

    // 2. Typing Indicator
    const typingId = appendTypingIndicator();
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    // 3. Process with Real Gemini 3.1 Flash Lite API passing currentLang
    try {
      const result = await window.lingnanBot.processQuery(userText, currentLang);
      removeTypingIndicator(typingId);
      appendBotMessage(result);
    } catch (err) {
      removeTypingIndicator(typingId);
      appendBotMessage({
        model: currentLang === "en" ? "System Notification" : "系統通知",
        content: currentLang === "en"
          ? `Sorry, an error occurred while connecting to the AI model: ${err.message}. Please try again.`
          : `抱歉，呼叫 AI 服務時發生錯誤：${err.message}。請稍後重試。`,
        source: currentLang === "en" ? "System Error" : "系統錯誤提示"
      });
    }

    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    if (window.lucide) window.lucide.createIcons();
  });

  function appendMessage(sender, text) {
    const div = document.createElement("div");
    div.className = "flex items-start justify-end space-x-3";
    div.innerHTML = `
      <div class="chat-bubble-user px-4 py-2.5 rounded-2xl max-w-xl text-sm shadow-sm leading-relaxed">
        ${escapeHtml(text)}
      </div>
      <div class="w-8 h-8 rounded-full bg-slate-700 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-1">
        ${currentLang === "en" ? "You" : "你"}
      </div>
    `;
    messagesContainer.appendChild(div);
  }

  function appendBotMessage(result) {
    const div = document.createElement("div");
    div.className = "flex items-start space-x-3";
    const formattedContent = formatMarkdown(result.content);
    const dict = I18N[currentLang] || I18N.zh;

    div.innerHTML = `
      <div class="w-8 h-8 rounded-full bg-lnBlue text-white flex items-center justify-center font-bold text-xs shrink-0 mt-1">
        AI
      </div>
      <div class="chat-bubble-bot p-4 rounded-2xl max-w-2xl text-sm leading-relaxed shadow-sm">
        <div class="flex items-center justify-between mb-2 pb-1.5 border-b border-slate-100 text-[11px] text-slate-400">
          <span class="flex items-center gap-1 text-emerald-700 font-medium">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            ${result.model}
          </span>
          <span class="text-slate-400">${currentLang === "en" ? "Official Lingnan RAG Grounding" : "官方 RAG 校園檢索"}</span>
        </div>

        <!-- Real Response Body -->
        <div class="text-slate-800 space-y-2 leading-relaxed text-xs sm:text-sm">
          ${formattedContent}
        </div>

        <!-- Sourced Tag -->
        <div class="source-box p-2 rounded-lg mt-3 text-[11px] text-slate-600 flex items-center gap-1.5">
          <i data-lucide="bookmark-check" class="w-3.5 h-3.5 text-lnGold shrink-0"></i>
          <span><b>${dict.verification_label}</b>${result.source}</span>
        </div>
      </div>
    `;
    messagesContainer.appendChild(div);
  }

  function appendTypingIndicator() {
    const id = "typing-" + Date.now();
    const div = document.createElement("div");
    div.id = id;
    div.className = "flex items-start space-x-3";
    const dict = I18N[currentLang] || I18N.zh;

    div.innerHTML = `
      <div class="w-8 h-8 rounded-full bg-lnBlue text-white flex items-center justify-center font-bold text-xs shrink-0 mt-1">
        AI
      </div>
      <div class="chat-bubble-bot px-4 py-3 rounded-2xl max-w-xs text-xs text-slate-500 flex items-center space-x-2">
        <span class="animate-pulse">●</span>
        <span class="animate-pulse delay-100">●</span>
        <span class="animate-pulse delay-200">●</span>
        <span class="ml-2 font-mono text-[11px] text-emerald-700">${dict.typing_text}</span>
      </div>
    `;
    messagesContainer.appendChild(div);
    return id;
  }

  function removeTypingIndicator(id) {
    const el = document.getElementById(id);
    if (el) el.remove();
  }

  function formatMarkdown(text) {
    if (!text) return "";
    return text
      .split("\n\n")
      .map(p => {
        let formatted = escapeHtml(p)
          .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>')
          .replace(/\*(.*?)\*/g, '<i>$1</i>')
          .replace(/\n/g, '<br>');
        return `<p>${formatted}</p>`;
      })
      .join("");
  }

  function escapeHtml(string) {
    const div = document.createElement("div");
    div.textContent = string;
    return div.innerHTML;
  }
}

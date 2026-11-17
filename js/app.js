/**
 * Lingnan Campus Assistant (嶺南校園助手)
 * Upgraded UI Controller with Real-time Input Language Detection & Rich Markdown/Link Rendering
 */

// Default UI language is English ("en")
let currentLang = localStorage.getItem("lingnan_lang_v3") || "en";
let currentKbFilter = "ALL";

const I18N = {
  zh: {
    app_title: "Lingnan Campus Assistant",
    app_subtitle: "嶺南大學校園 AI 助手 · 自動偵測中英雙語回答 (CCC8015 專題)",
    nav_chat: "智能對話",
    nav_kb: "官方知識庫",
    nav_workflow: "一頁運行原理",
    auto_lang_banner: "智能語系偵測：中文輸入 → 繁中回答 | 英文輸入 → 英文回答",
    chips_title: "常見問題一鍵測試：",
    chat_box_title: "嶺南校園助手 (Lingnan Campus Assistant)",
    chat_lang_rule_pill: "中/EN 自動對應語言",
    chat_quota_badge: "官方規章 RAG 核實",
    btn_clear: "新對話",
    chat_placeholder: "輸入中文或英文提問（中文輸入自動答中文 / Ask in EN for EN reply）...",
    btn_send: "發送",
    input_rule_hint: "中文提問 → 繁體中文回答 · Ask in English → Reply in English",
    kb_title: "嶺南大學官方知識庫清單 (Official Knowledge Base)",
    kb_desc: "本助手的所有回答均以此 11 組已核實的官方頁面為事實依據（Ground Truth），杜絕 AI 幻覺。",
    kb_badge: "● 全數 11 組來源經官方核實 (HTTP 200)",
    th_id: "編號",
    th_cat: "類別",
    th_title: "官方頁面名稱 / 文件連結",
    th_summary: "規章摘要",
    th_date: "核實日期",
    th_status: "狀態",
    wf_title: "一頁運行原理：RAG 檢索增強生成架構",
    wf_desc: "為什麼不用純 LLM？普通大模型會憑空捏造過時日期與規則。本系統採用閉卷 RAG (檢索增強生成)，確保每一次回答都經過官方來源核實。",
    wf_specs_title: "技術指標與專案承諾：",
    wf_specs_1: "• <b>零成本運作 ($0 Cost)</b>：採用 Google Gemini 免費配額 (Free Quota) 與 GitHub Pages 免費 CDN 靜態託管。",
    wf_specs_2: "• <b>中英輸入自動識別與嚴格防幻覺</b>：中文提問 100% 回答繁體中文，英文提問 100% 回答英文；知識庫無收錄的資訊誠實拒答。",
    wf_specs_3: "• <b>免責聲明</b>：本系統為嶺南大學 CCC8015 生成式 AI 課堂專題展示，非官方職員，重要學業決定請以 Registry 及 OSA 為準。",
    footer_sub: "模型：Google Gemini 3.1 Flash Lite · 11 份官方核實規章 ($0 成本)",
    welcome_title: "同學你好！我係「嶺南校園助手」👋",
    welcome_desc: "我已連接 <b>Google Gemini 3.1 Flash Lite</b> 及嶺南大學 11 份官方知識庫。<b>支援中英雙語自動識別</b>（輸入中文即回答繁體中文、輸入英文即回答英文），點擊下方卡片可立即測試：",
    welcome_box_1: "📚 <b>選科與學分上限</b><br><span class='text-[11px] text-slate-500'>33 學分上限、加退選日期、CRN 錯誤</span>",
    welcome_box_2: "🎓 <b>綜合學習計劃 (ILP)</b><br><span class='text-[11px] text-slate-500'>2026 入學 75 units 要求、出席率規範</span>",
    welcome_box_3: "🏠 <b>學生宿舍申請與換房</b><br><span class='text-[11px] text-slate-500'>非本地生宿位保證、雙向換房手續</span>",
    welcome_box_4: "🚇 <b>兆康站與口岸交通</b><br><span class='text-[11px] text-slate-500'>兆康 F 出口天橋、K51 巴士、機場路線</span>",
    welcome_hint: "💡 點擊上方任一主題卡片或頂部快捷問題，或在下方輸入框用中文 / 英文隨意發問！",
    typing_text: "正在檢索嶺大規章並生成回覆...",
    verification_label: "官方來源核實：",
    nav_key_btn: "API Key",
    modal_key_title: "API Key 設定與安全性管理",
    modal_key_subtitle: "Google Gemini 3.1 Flash Lite 金鑰管理",
    modal_key_status_label: "當前金鑰來源：",
    modal_key_status_default: "使用預設展示金鑰 (Free Quota)",
    modal_key_status_custom: "使用自訂個人 API Key (已安全保存在本地)",
    modal_key_input_label: "輸入個人 Gemini API Key (可選)：",
    modal_key_hint: "金鑰僅存於你的個人瀏覽器本地 (LocalStorage)，重新整理不遺失，絕不上傳後端伺服器。",
    modal_sec_title: "靜態網站安全性與防盜建議",
    modal_sec_text: "因 GitHub Pages 為純前端靜態託管，金鑰建議於 Google Cloud Console 設定「HTTP Referrer 限制」為 <code>https://mingchuuuuuuuu-beep.github.io/*</code>，防止他人盜用，並於報告後銷毀更換。",
    btn_reset_key: "清除自訂金鑰 (用回預設)",
    btn_save_key: "儲存設定",
    wf_sec_title: "安全性與架構權衡 (Security & Key Management)：",
    wf_sec_1: "• <b>純前端靜態架構限制</b>：GitHub Pages 靜態網站無法透過伺服器環境變數完全隱藏金鑰。防護策略為在 Google Cloud Console 將金鑰設定「HTTP Referrers 白名單限制」（僅允許 <code>https://mingchuuuuuuuu-beep.github.io/*</code> 呼叫）。",
    wf_sec_2: "• <b>展示期生命週期管理 (Key Rotation)</b>：課堂展示期使用免綁卡 Free Tier 金鑰，展示完畢後於 Google AI Studio 立即刪除作廢並重新發行。",
    wf_sec_3: "• <b>商用生產環境升級建議</b>：正式上線應引入輕量反向代理（如 Cloudflare Workers 或 Supabase Edge Functions）作為安全閘道，將金鑰保存在後端環境變數 (Secrets)。"
  },
  en: {
    app_title: "Lingnan Campus Assistant",
    app_subtitle: "Lingnan University Campus AI Assistant · Bilingual Auto-Match (中 / EN)",
    nav_chat: "Chatbot",
    nav_kb: "Knowledge Base",
    nav_workflow: "One-Page Architecture",
    auto_lang_banner: "Auto-Detect: 中文輸入 → 中文回答 | EN Input → EN Reply",
    chips_title: "Quick Try:",
    chat_box_title: "Lingnan Campus Assistant",
    chat_lang_rule_pill: "中/EN Auto-Match",
    chat_quota_badge: "Official RAG Grounded",
    btn_clear: "New Chat",
    chat_placeholder: "Type in English or 中文 (e.g. How to walk from Siu Hong? / 兆康站點去嶺大？)...",
    btn_send: "Send",
    input_rule_hint: "中文提問 → 中文回答 · Ask in EN → Reply in EN",
    kb_title: "Official Lingnan Knowledge Base Sources",
    kb_desc: "All assistant answers are strictly grounded in these 11 verified official pages to eliminate AI hallucinations.",
    kb_badge: "● All 11 sources verified (HTTP 200)",
    th_id: "ID",
    th_cat: "Category",
    th_title: "Official Page / Document",
    th_summary: "Regulations Summary",
    th_date: "Retrieved",
    th_status: "Status",
    wf_title: "One-Page Architecture: RAG Workflow Pipeline",
    wf_desc: "Why not plain LLMs? General models hallucinate outdated dates and rules. Our system uses closed-book RAG to ensure every answer is grounded in official university documents.",
    wf_specs_title: "Technical Specs & Project Commitments:",
    wf_specs_1: "• <b>Zero-Cost Operation ($0 Cost)</b>: Powered by Google Gemini Free Quota and hosted on GitHub Pages free CDN.",
    wf_specs_2: "• <b>Strict Anti-Hallucination & Auto-Language Matching</b>: Chinese queries are answered in Traditional Chinese; English queries are answered in English. Missing facts are honestly declined.",
    wf_specs_3: "• <b>Disclaimer</b>: This is a CCC8015 student project prototype, not official university staff. Confirm important decisions with Registry/OSA.",
    footer_sub: "Model: Google Gemini 3.1 Flash Lite · 11 Verified Official Sources ($0 Cost)",
    welcome_title: "Hello! I am your Lingnan Campus Assistant 👋",
    welcome_desc: "Powered by <b>Google Gemini 3.1 Flash Lite</b> and grounded in 11 official Registry & OSA documents. <b>Auto-detects your input language</b> (Ask in English → Reply in English; 輸入中文 → 回答繁體中文). Tap a topic below to try:",
    welcome_box_1: "📚 <b>Courses & Credit Limits</b><br><span class='text-[11px] text-slate-500'>33-credit cap, Add/Drop dates, CRN errors</span>",
    welcome_box_2: "🎓 <b>75 ILP Units (2026+)</b><br><span class='text-[11px] text-slate-500'>6 Core Domains, NSO units & attendance</span>",
    welcome_box_3: "🏠 <b>Student Hostels & Swaps</b><br><span class='text-[11px] text-slate-500'>Non-local guarantee & mutual room swap</span>",
    welcome_box_4: "🚇 <b>Siu Hong & Airport Routes</b><br><span class='text-[11px] text-slate-500'>Exit F footbridge, K51 bus & border arrivals</span>",
    welcome_hint: "💡 Click any topic card above, use the quick shortcuts, or type below in English or Chinese!",
    typing_text: "Retrieving official Lingnan regulations & generating reply...",
    verification_label: "Official Source Verification: ",
    nav_key_btn: "API Key",
    modal_key_title: "API Key Settings & Security",
    modal_key_subtitle: "Google Gemini 3.1 Flash Lite Key Management",
    modal_key_status_label: "Current Key Source:",
    modal_key_status_default: "Using Default Demo Key (Free Quota)",
    modal_key_status_custom: "Using Custom API Key (Saved in Local Storage)",
    modal_key_input_label: "Enter Custom Gemini API Key (Optional):",
    modal_key_hint: "The key is saved only in your local browser (LocalStorage) and is never transmitted to any third-party server.",
    modal_sec_title: "Static Hosting Security & Referrer Restriction",
    modal_sec_text: "Because GitHub Pages is a purely client-side static site, restrict your key in Google Cloud Console with HTTP Referrer restriction to <code>https://mingchuuuuuuuu-beep.github.io/*</code> to prevent external theft. Rotate or delete the key after presentations.",
    btn_reset_key: "Reset to Default",
    btn_save_key: "Save Key",
    wf_sec_title: "Security & Architecture Trade-off (Key Management):",
    wf_sec_1: "• <b>Client-Side Static Hosting Trade-off</b>: A zero-cost GitHub Pages app cannot hide keys behind server environment variables. The primary defense is Google Cloud <b>HTTP Referrer Restriction</b> (authorized only for <code>https://mingchuuuuuuuu-beep.github.io/*</code>).",
    wf_sec_2: "• <b>Demo Key Rotation Lifecycle</b>: The demo key uses free-tier quota (no credit card bound) and is scheduled for immediate revocation and regeneration in Google AI Studio following the presentation.",
    wf_sec_3: "• <b>Production Security Roadmap</b>: Full commercial deployment will introduce a lightweight serverless reverse proxy (e.g. Cloudflare Workers or Supabase Edge Functions) to store keys securely in server environment secrets."
  }
};

const WORKFLOW_STEPS = {
  zh: [
    { num: "①", title: "用戶輸入與語系偵測", desc: "即時偵測輸入為中文或英文，鎖定目標回答語言並提取查詢實體。" },
    { num: "②", title: "安全守門 (Safety Guard)", desc: "攔截提示詞注入攻擊 (Prompt Injection) 與代寫功課請求。" },
    { num: "③", title: "意圖分類 (Intent)", desc: "精準區分選科、ILP、宿舍、換房或抵校交通等獨立主題，不混淆上下文。" },
    { num: "④", title: "反問澄清 (Clarifier)", desc: "若缺少必要條件（如換房未註明學期或對象），主動提出澄清問題。" },
    { num: "⑤", title: "官方知識檢索 (Retrieve)", desc: "從 11 篇官方核實規章中檢索最高權重之條文切片 (Ground Truth)。" },
    { num: "⑥", title: "大模型生成 (Generate)", desc: "由 <b>Gemini 3.1 Flash Lite</b> 根據檢索內容與指定語言生成回覆。" },
    { num: "⑦", title: "防幻覺自檢 (Self-check)", desc: "核對學分、日期與規章編號，若知識庫無記載（如飯堂收工時間）誠實拒答。" },
    { num: "⑧", title: "結構化輸出 (Output)", desc: "輸出：簡短結論 → 重點條列 → 可點擊官方連結 → 下一步行動建議。" }
  ],
  en: [
    { num: "①", title: "Input & Auto-Lang Detect", desc: "Detects Chinese vs. English input automatically to lock the output language." },
    { num: "②", title: "Safety Guard", desc: "Intercepts prompt injection attacks and academic dishonesty requests." },
    { num: "③", title: "Intent Disambiguation", desc: "Classifies into Course, ILP, Hostel, or Transport without cross-turn pollution." },
    { num: "④", title: "Clarifier", desc: "Asks a clarifying question when critical parameters are missing (e.g. room swap)." },
    { num: "⑤", title: "Official Retrieval", desc: "Retrieves highest-scoring verified chunks from 11 official Lingnan documents." },
    { num: "⑥", title: "LLM Generation", desc: "<b>Gemini 3.1 Flash Lite</b> synthesizes answers strictly in the detected language." },
    { num: "⑦", title: "Anti-Hallucination Check", desc: "Verifies numbers and dates against official context; declines unverified topics." },
    { num: "⑧", title: "Structured Output", desc: "Outputs Short answer → Bullet points → Clickable official URL → Next step." }
  ]
};

document.addEventListener("DOMContentLoaded", () => {
  initLanguageSwitcher();
  initKeyModal();
  initTabNavigation();
  initKbFilter();
  setLanguage(currentLang);
  initChatLogic();
});

// Initialize API Key Modal
function initKeyModal() {
  const modal = document.getElementById("key-modal");
  const openBtn = document.getElementById("key-modal-open-btn");
  const closeBtn = document.getElementById("key-modal-close-btn");
  const saveBtn = document.getElementById("save-custom-key-btn");
  const clearBtn = document.getElementById("clear-custom-key-btn");
  const input = document.getElementById("custom-key-input");
  const statusEl = document.getElementById("key-status-text");

  if (!modal || !openBtn) return;

  function updateStatusDisplay() {
    if (!statusEl) return;
    const dict = I18N[currentLang] || I18N.zh;
    if (window.lingnanBot && window.lingnanBot.hasCustomKey()) {
      statusEl.className = "font-mono text-blue-700 font-bold flex items-center gap-1.5";
      statusEl.innerHTML = `<span class="w-2 h-2 rounded-full bg-blue-500"></span><span>${dict.modal_key_status_custom}</span>`;
      if (input) input.value = localStorage.getItem("lingnan_custom_api_key") || "";
    } else {
      statusEl.className = "font-mono text-emerald-700 font-bold flex items-center gap-1.5";
      statusEl.innerHTML = `<span class="w-2 h-2 rounded-full bg-emerald-500"></span><span>${dict.modal_key_status_default}</span>`;
      if (input) input.value = "";
    }
  }

  openBtn.addEventListener("click", () => {
    updateStatusDisplay();
    modal.classList.remove("hidden");
    if (window.lucide) window.lucide.createIcons();
  });

  if (closeBtn) {
    closeBtn.addEventListener("click", () => modal.classList.add("hidden"));
  }

  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.classList.add("hidden");
  });

  if (saveBtn) {
    saveBtn.addEventListener("click", () => {
      const val = input.value.trim();
      if (val) {
        window.lingnanBot.setCustomApiKey(val);
      } else {
        window.lingnanBot.clearCustomApiKey();
      }
      updateStatusDisplay();
      modal.classList.add("hidden");
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      window.lingnanBot.clearCustomApiKey();
      updateStatusDisplay();
      modal.classList.add("hidden");
    });
  }
}

// Initialize Language Switcher (zh / en)
function initLanguageSwitcher() {
  const btnZh = document.getElementById("lang-btn-zh");
  const btnEn = document.getElementById("lang-btn-en");

  btnZh.addEventListener("click", () => setLanguage("zh"));
  btnEn.addEventListener("click", () => setLanguage("en"));
}

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem("lingnan_lang_v3", lang);

  const dict = I18N[lang] || I18N.zh;

  // Toggle button active styling
  const btnZh = document.getElementById("lang-btn-zh");
  const btnEn = document.getElementById("lang-btn-en");
  if (lang === "en") {
    btnEn.className = "lang-btn px-2.5 py-0.5 rounded-lg font-bold text-xs bg-lnGold text-lnBlue shadow transition cursor-pointer";
    btnZh.className = "lang-btn px-2.5 py-0.5 rounded-lg font-medium text-xs text-slate-300 hover:text-white transition cursor-pointer";
    document.documentElement.lang = "en";
  } else {
    btnZh.className = "lang-btn px-2.5 py-0.5 rounded-lg font-bold text-xs bg-lnGold text-lnBlue shadow transition cursor-pointer";
    btnEn.className = "lang-btn px-2.5 py-0.5 rounded-lg font-medium text-xs text-slate-300 hover:text-white transition cursor-pointer";
    document.documentElement.lang = "zh-HK";
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

  renderQuickChips(lang);
  renderKnowledgeBase(lang, currentKbFilter);
  renderWorkflow(lang);
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
    <button class="chip-btn px-3 py-1 bg-slate-50 hover:bg-amber-50 hover:border-lnGold hover:text-lnBlue border border-slate-200 rounded-lg text-xs font-medium whitespace-nowrap shrink-0 transition shadow-2xs cursor-pointer flex items-center gap-1" data-query="${chip.query}">
      <span>${chip.label}</span>
    </button>
  `).join("");

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

// Knowledge Base Category Filter
function initKbFilter() {
  const filterBar = document.getElementById("kb-filter-bar");
  if (!filterBar) return;

  filterBar.querySelectorAll(".kb-filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      currentKbFilter = btn.getAttribute("data-filter") || "ALL";
      filterBar.querySelectorAll(".kb-filter-btn").forEach(b => {
        b.className = "kb-filter-btn px-3 py-1 rounded-lg text-xs font-medium bg-slate-100 text-slate-600 hover:bg-slate-200 transition cursor-pointer";
      });
      btn.className = "kb-filter-btn active px-3 py-1 rounded-lg text-xs font-semibold bg-lnBlue text-white transition cursor-pointer";
      renderKnowledgeBase(currentLang, currentKbFilter);
      if (window.lucide) window.lucide.createIcons();
    });
  });
}

// Render Knowledge Base
function renderKnowledgeBase(lang, filterKey = "ALL") {
  const tbody = document.getElementById("kb-table-body");
  if (!tbody || !window.LINGNAN_DATA) return;

  const items = window.LINGNAN_DATA.knowledgeBase.filter(item =>
    filterKey === "ALL" || item.filterKey === filterKey
  );

  tbody.innerHTML = items.map(item => {
    const category = lang === "en" ? (item.categoryEn || item.category) : item.category;
    const summary = lang === "en" ? (item.summaryEn || item.summary) : item.summary;

    return `
      <tr class="hover:bg-slate-50/90 transition">
        <td class="p-2.5 font-mono font-bold text-lnBlue whitespace-nowrap">${item.id}</td>
        <td class="p-2.5 whitespace-nowrap">
          <span class="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-slate-100 text-slate-700 border border-slate-200">
            ${category}
          </span>
        </td>
        <td class="p-2.5">
          <a href="${item.url}" target="_blank" rel="noopener noreferrer" class="font-semibold text-blue-600 hover:text-lnBlue hover:underline inline-flex items-center gap-1">
            <span>${item.title}</span>
            <i data-lucide="external-link" class="w-3 h-3 shrink-0"></i>
          </a>
        </td>
        <td class="p-2.5 text-slate-600 max-w-md">${summary}</td>
        <td class="p-2.5 text-slate-500 font-mono whitespace-nowrap">${item.retrievedDate}</td>
        <td class="p-2.5 whitespace-nowrap">
          <span class="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
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
    "border-blue-200 bg-blue-50/60 text-blue-900",
    "border-indigo-200 bg-indigo-50/60 text-indigo-900",
    "border-sky-200 bg-sky-50/60 text-sky-900",
    "border-amber-200 bg-amber-50/60 text-amber-900",
    "border-emerald-200 bg-emerald-50/60 text-emerald-900",
    "border-teal-200 bg-teal-50/60 text-teal-900",
    "border-purple-200 bg-purple-50/60 text-purple-900",
    "border-lnBlue bg-lnBlue text-white"
  ];

  container.innerHTML = steps.map((s, idx) => {
    const isLast = idx === steps.length - 1;
    return `
      <div class="p-3.5 rounded-xl border ${colors[idx]} shadow-2xs">
        <div class="text-xs font-bold ${isLast ? 'text-yellow-300' : ''} mb-1">${s.num} ${s.title}</div>
        <p class="text-xs ${isLast ? 'text-slate-200' : 'text-slate-600'} leading-relaxed">${s.desc}</p>
      </div>
    `;
  }).join("");
}

// Render Initial Chat Welcome Message with Interactive Cards
function renderWelcomeMessage(lang) {
  const container = document.getElementById("messages-container");
  if (!container) return;

  if (container.children.length <= 1) {
    const dict = I18N[lang] || I18N.zh;
    const sampleQueries = lang === "en"
      ? [
          "I'm a Year-2 student. Can I take 18 credits in both Term 1 and Term 2, and when is Term 2 add/drop?",
          "I entered in 2026 on a 4-year programme. How many ILP units do I need to graduate?",
          "I am a non-local student, do I need to apply for hostel myself?",
          "How do I get to Lingnan from Siu Hong MTR station?"
        ]
      : [
          "二年級想 T1、T2 都修 18 學分得唔得？T2 幾時可以改科？",
          "我 2026 入學四年制，ILP 畢業要幾多 unit？",
          "我係非本地生，宿舍要唔要自己申請？",
          "由兆康站點行去嶺南大學？"
        ];

    container.innerHTML = `
      <div class="flex items-start space-x-3 msg-animate">
        <div class="w-8 h-8 rounded-xl bg-lnBlue text-lnGold flex items-center justify-center font-extrabold text-xs shrink-0 mt-1 shadow-xs">
          AI
        </div>
        <div class="chat-bubble-bot p-4 rounded-2xl max-w-2xl text-sm leading-relaxed">
          <p class="font-bold text-lnBlue text-base mb-1">${dict.welcome_title}</p>
          <p class="text-slate-600 text-xs sm:text-sm mb-2.5">${dict.welcome_desc}</p>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 my-2 text-xs text-slate-700">
            <button type="button" class="welcome-card-btn text-left p-2.5 bg-slate-50 hover:bg-amber-50/80 hover:border-lnGold rounded-xl border border-slate-200 transition cursor-pointer" data-sample="${sampleQueries[0]}">${dict.welcome_box_1}</button>
            <button type="button" class="welcome-card-btn text-left p-2.5 bg-slate-50 hover:bg-amber-50/80 hover:border-lnGold rounded-xl border border-slate-200 transition cursor-pointer" data-sample="${sampleQueries[1]}">${dict.welcome_box_2}</button>
            <button type="button" class="welcome-card-btn text-left p-2.5 bg-slate-50 hover:bg-amber-50/80 hover:border-lnGold rounded-xl border border-slate-200 transition cursor-pointer" data-sample="${sampleQueries[2]}">${dict.welcome_box_3}</button>
            <button type="button" class="welcome-card-btn text-left p-2.5 bg-slate-50 hover:bg-amber-50/80 hover:border-lnGold rounded-xl border border-slate-200 transition cursor-pointer" data-sample="${sampleQueries[3]}">${dict.welcome_box_4}</button>
          </div>
          <p class="text-[11px] text-slate-500 mt-2">${dict.welcome_hint}</p>
        </div>
      </div>
    `;

    const input = document.getElementById("user-input");
    const form = document.getElementById("chat-form");
    container.querySelectorAll(".welcome-card-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const q = btn.getAttribute("data-sample");
        if (input && form && q) {
          input.value = q;
          form.dispatchEvent(new Event("submit"));
        }
      });
    });
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
  const langIndicator = document.getElementById("input-lang-indicator");
  const messagesContainer = document.getElementById("messages-container");
  const clearBtn = document.getElementById("clear-chat-btn");

  // Live Input Language Detection Indicator
  if (input && langIndicator) {
    input.addEventListener("input", () => {
      const val = input.value.trim();
      if (!val) {
        langIndicator.textContent = "中 / EN";
        langIndicator.className = "absolute right-2 px-2 py-0.5 rounded-md text-[10px] font-semibold bg-slate-100 text-slate-500 border border-slate-200 pointer-events-none transition";
        return;
      }
      const detected = window.lingnanBot.detectQueryLanguage(val, currentLang);
      if (detected === "zh") {
        langIndicator.textContent = "中文 → 答中文";
        langIndicator.className = "absolute right-2 px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300 pointer-events-none transition";
      } else {
        langIndicator.textContent = "EN → EN Reply";
        langIndicator.className = "absolute right-2 px-2 py-0.5 rounded-md text-[10px] font-bold bg-blue-100 text-lnBlue border border-blue-300 pointer-events-none transition";
      }
    });
  }

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

    // Detect query language strictly from userText
    const queryLang = window.lingnanBot.detectQueryLanguage(userText, currentLang);

    // 1. User Message
    appendMessage("user", userText, queryLang);
    input.value = "";
    if (langIndicator) {
      langIndicator.textContent = "中 / EN";
      langIndicator.className = "absolute right-2 px-2 py-0.5 rounded-md text-[10px] font-semibold bg-slate-100 text-slate-500 border border-slate-200 pointer-events-none transition";
    }

    // 2. Typing Indicator in matching language
    const typingId = appendTypingIndicator(queryLang);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    // 3. Process Query with Input-Matched Language
    try {
      const result = await window.lingnanBot.processQuery(userText, queryLang);
      removeTypingIndicator(typingId);
      appendBotMessage(result);
    } catch (err) {
      removeTypingIndicator(typingId);
      appendBotMessage({
        lang: queryLang,
        model: queryLang === "en" ? "System Notification" : "系統通知",
        content: queryLang === "en"
          ? `Sorry, an error occurred while connecting to the AI service: ${err.message}. Please try again.`
          : `抱歉，呼叫 AI 服務時發生錯誤：${err.message}。請稍後重試。`,
        source: queryLang === "en" ? "System Error" : "系統錯誤提示"
      });
    }

    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    if (window.lucide) window.lucide.createIcons();
  });

  function appendMessage(sender, text, msgLang) {
    const div = document.createElement("div");
    div.className = "flex items-start justify-end space-x-2.5 msg-animate";
    div.innerHTML = `
      <div class="chat-bubble-user px-4 py-2.5 rounded-2xl max-w-xl text-xs sm:text-sm leading-relaxed">
        ${escapeHtml(text)}
      </div>
      <div class="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-slate-700 text-white flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">
        ${msgLang === "en" ? "You" : "你"}
      </div>
    `;
    messagesContainer.appendChild(div);
  }

  function appendBotMessage(result) {
    const replyLang = result.lang || currentLang;
    const isEn = replyLang === "en";
    const dict = I18N[replyLang] || I18N.zh;
    const div = document.createElement("div");
    div.className = "flex items-start space-x-2.5 msg-animate";
    const formattedContent = formatMarkdown(result.content);
    const formattedSource = linkifyText(escapeHtml(result.source || ""));

    div.innerHTML = `
      <div class="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-lnBlue text-lnGold flex items-center justify-center font-extrabold text-xs shrink-0 mt-0.5 shadow-xs">
        AI
      </div>
      <div class="chat-bubble-bot p-3.5 sm:p-4 rounded-2xl max-w-2xl w-full text-xs sm:text-sm leading-relaxed">
        <div class="flex flex-wrap items-center justify-between gap-2 mb-2 pb-1.5 border-b border-slate-100 text-[11px]">
          <div class="flex items-center gap-1.5">
            <span class="flex items-center gap-1 text-emerald-700 font-semibold">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              ${escapeHtml(result.model)}
            </span>
            <span class="px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 font-medium text-[10px]">
              ${isEn ? "EN Reply" : "繁中回答"}
            </span>
          </div>
          <button type="button" class="copy-reply-btn text-slate-400 hover:text-lnBlue inline-flex items-center gap-1 text-[11px] transition cursor-pointer" title="${isEn ? 'Copy answer' : '複製回答'}">
            <i data-lucide="copy" class="w-3 h-3"></i>
            <span class="copy-label">${isEn ? "Copy" : "複製"}</span>
          </button>
        </div>

        <!-- Real Response Body -->
        <div class="bot-prose text-slate-800 space-y-1.5 leading-relaxed text-xs sm:text-sm">
          ${formattedContent}
        </div>

        <!-- Sourced Tag -->
        <div class="source-box p-2.5 rounded-xl mt-3 text-[11px] text-slate-600 flex items-start gap-1.5">
          <i data-lucide="bookmark-check" class="w-3.5 h-3.5 text-lnGold shrink-0 mt-0.5"></i>
          <div class="min-w-0 break-words"><b>${dict.verification_label}</b>${formattedSource}</div>
        </div>
      </div>
    `;

    const copyBtn = div.querySelector(".copy-reply-btn");
    if (copyBtn) {
      copyBtn.addEventListener("click", () => {
        navigator.clipboard?.writeText(result.content || "");
        const label = copyBtn.querySelector(".copy-label");
        if (label) {
          label.textContent = isEn ? "Copied ✓" : "已複製 ✓";
          setTimeout(() => {
            label.textContent = isEn ? "Copy" : "複製";
          }, 1800);
        }
      });
    }

    messagesContainer.appendChild(div);
  }

  function appendTypingIndicator(msgLang) {
    const id = "typing-" + Date.now();
    const div = document.createElement("div");
    div.id = id;
    div.className = "flex items-start space-x-2.5 msg-animate";
    const dict = I18N[msgLang] || I18N.zh;

    div.innerHTML = `
      <div class="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-lnBlue text-lnGold flex items-center justify-center font-extrabold text-xs shrink-0 mt-0.5">
        AI
      </div>
      <div class="chat-bubble-bot px-4 py-3 rounded-2xl max-w-sm text-xs text-slate-500 flex items-center space-x-1.5">
        <span class="w-1.5 h-1.5 rounded-full bg-lnGold animate-bounce"></span>
        <span class="w-1.5 h-1.5 rounded-full bg-lnGold animate-bounce" style="animation-delay: 150ms"></span>
        <span class="w-1.5 h-1.5 rounded-full bg-lnGold animate-bounce" style="animation-delay: 300ms"></span>
        <span class="ml-1.5 font-medium text-[11px] text-slate-600">${dict.typing_text}</span>
      </div>
    `;
    messagesContainer.appendChild(div);
    return id;
  }

  function removeTypingIndicator(id) {
    const el = document.getElementById(id);
    if (el) el.remove();
  }

  function linkifyText(escapedText) {
    return escapedText.replace(
      /(https?:\/\/[^\s<)"']+)/g,
      '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>'
    );
  }

  function formatMarkdown(text) {
    if (!text) return "";
    const paragraphs = text.split(/\n{2,}/);
    return paragraphs
      .map(block => {
        const lines = block.split("\n").map(l => l.trim()).filter(Boolean);
        const isBulletBlock = lines.length > 0 && lines.every(l => /^[•\-*]\s*/.test(l));

        if (isBulletBlock) {
          const items = lines.map(l => {
            const clean = l.replace(/^[•\-*]\s*/, "");
            const styled = linkifyText(escapeHtml(clean))
              .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>")
              .replace(/\*(.*?)\*/g, "<i>$1</i>");
            return `<li>${styled}</li>`;
          }).join("");
          return `<ul>${items}</ul>`;
        }

        const formatted = lines.map(l => {
          return linkifyText(escapeHtml(l))
            .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>")
            .replace(/\*(.*?)\*/g, "<i>$1</i>");
        }).join("<br>");
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

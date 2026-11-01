/**
 * Lingnan Campus Assistant (嶺南校園助手)
 * Main Application Controller
 */

document.addEventListener("DOMContentLoaded", () => {
  // Initialize Lucide icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  initTabNavigation();
  renderKnowledgeBase();
  renderTestCases();
  renderTeamRoles();
  initChatLogic();
  initDifyToggle();
  initApiModal();
});

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

      // Re-trigger icon rendering if needed
      if (window.lucide) {
        window.lucide.createIcons();
      }
    });
  });
}

// Render Section 3.4 Knowledge Base
function renderKnowledgeBase() {
  const tbody = document.getElementById("kb-table-body");
  if (!tbody || !window.LINGNAN_DATA) return;

  tbody.innerHTML = window.LINGNAN_DATA.knowledgeBase.map(item => `
    <tr class="hover:bg-slate-50/80 transition">
      <td class="p-3 font-mono font-bold text-lnBlue">${item.id}</td>
      <td class="p-3">
        <span class="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-700 border border-slate-200">
          ${item.category}
        </span>
      </td>
      <td class="p-3">
        <a href="${item.url}" target="_blank" rel="noopener noreferrer" class="font-medium text-blue-600 hover:underline flex items-center gap-1">
          ${item.title}
          <i data-lucide="external-link" class="w-3 h-3 inline"></i>
        </a>
      </td>
      <td class="p-3 text-slate-600 max-w-xs">${item.summary}</td>
      <td class="p-3 text-slate-500 whitespace-nowrap">${item.retrievedDate}</td>
      <td class="p-3 whitespace-nowrap">
        <span class="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
          ● ${item.status}
        </span>
      </td>
    </tr>
  `).join("");
}

// Render Section 5.1 & 5.2 Test Cases & Rubrics
function renderTestCases() {
  const tbody = document.getElementById("test-table-body");
  if (!tbody || !window.LINGNAN_DATA) return;

  tbody.innerHTML = window.LINGNAN_DATA.testCases.map(tc => `
    <tr class="hover:bg-slate-50/80 transition">
      <td class="p-3 font-mono font-bold text-lnBlue">${tc.id}</td>
      <td class="p-3">
        <span class="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-700 border border-slate-200">
          ${tc.type}
        </span>
      </td>
      <td class="p-3 font-medium text-slate-800 max-w-xs">${tc.input}</td>
      <td class="p-3 text-slate-600 max-w-xs">${tc.expectedResult}</td>
      <td class="p-3 text-slate-700 max-w-xs bg-slate-50/50">${tc.actualResult}</td>
      <td class="p-3 whitespace-nowrap">
        <span class="inline-flex items-center px-2 py-0.5 rounded font-bold text-xs bg-blue-50 text-blue-800 border border-blue-200">
          ${tc.score} / 25
        </span>
      </td>
    </tr>
  `).join("");
}

// Render Section 7.0 Team Roles
function renderTeamRoles() {
  const container = document.getElementById("team-grid");
  if (!container || !window.LINGNAN_DATA) return;

  container.innerHTML = window.LINGNAN_DATA.teamRoles.map(role => `
    <div class="p-4 rounded-xl border border-slate-200 bg-slate-50/60 flex flex-col justify-between">
      <div>
        <div class="flex items-center justify-between mb-2">
          <span class="text-xs font-bold px-2 py-0.5 rounded bg-lnBlue text-white">${role.role}</span>
          <span class="text-[11px] text-slate-400 font-mono">${role.studentId}</span>
        </div>
        <h4 class="text-sm font-bold text-slate-800 mb-1">${role.title}</h4>
        <p class="text-xs text-slate-600 mb-3 leading-relaxed">${role.tasks}</p>
      </div>
      <div class="pt-3 border-t border-slate-200 text-[11px] text-slate-500">
        <span class="font-medium text-slate-700">交付物：</span>${role.deliverables}
      </div>
    </div>
  `).join("");
}

// Chatbot UI and Submission Logic
function initChatLogic() {
  const form = document.getElementById("chat-form");
  const input = document.getElementById("user-input");
  const messagesContainer = document.getElementById("messages-container");
  const clearBtn = document.getElementById("clear-chat-btn");
  const quickChips = document.querySelectorAll(".chip-btn");
  const liveNodes = document.getElementById("live-nodes");

  // Handle Quick Chips
  quickChips.forEach(chip => {
    chip.addEventListener("click", () => {
      const query = chip.getAttribute("data-query");
      if (input && query) {
        input.value = query;
        form.dispatchEvent(new Event("submit"));
      }
    });
  });

  // Handle Clear
  clearBtn.addEventListener("click", () => {
    window.lingnanBot.reset();
    messagesContainer.innerHTML = `
      <div class="flex items-start space-x-3">
        <div class="w-8 h-8 rounded-full bg-lnBlue text-white flex items-center justify-center font-bold text-xs shrink-0 mt-1">
          AI
        </div>
        <div class="chat-bubble-bot p-4 rounded-2xl max-w-2xl text-sm leading-relaxed">
          <p class="font-bold text-lnBlue mb-1">對話已重置！</p>
          <p class="text-slate-600">請問今天有甚麼關於嶺南大學選科、學分、ILP、宿舍或交通的疑問我可以為你解答？</p>
        </div>
      </div>
    `;
    if (liveNodes) {
      liveNodes.innerHTML = `<span class="node-badge">待命 (Idle)</span>`;
    }
  });

  // Handle Message Submit
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const userText = input.value.trim();
    if (!userText) return;

    // 1. Append User Message
    appendMessage("user", userText);
    input.value = "";

    // 2. Show Typing Indicator
    const typingId = appendTypingIndicator();
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    // 3. Process with Local RAG or Free Real LLM API
    try {
      const result = await window.lingnanBot.processQuery(userText);
      removeTypingIndicator(typingId);
      appendBotMessage(result);
      updateLiveState(result);
    } catch (err) {
      removeTypingIndicator(typingId);
      appendBotMessage({
        shortAnswer: "系統忙碌中，請稍後再試。",
        explanation: [err.message || "處理過程發生未預期錯誤。"],
        source: "系統錯誤日誌",
        nextStep: "請重試或點選上方預設案例。"
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
        你
      </div>
    `;
    messagesContainer.appendChild(div);
  }

  function appendBotMessage(result) {
    const div = document.createElement("div");
    div.className = "flex items-start space-x-3";

    let thinkingBlock = "";
    if (result.thinkingProcess && result.thinkingProcess.length > 0) {
      thinkingBlock = `
        <details class="mb-3 border border-purple-200 bg-purple-50/60 rounded-xl overflow-hidden group" open>
          <summary class="px-3 py-1.5 text-xs font-semibold text-purple-800 cursor-pointer flex items-center justify-between hover:bg-purple-100/60 transition list-none">
            <span class="flex items-center gap-1.5">
              <i data-lucide="brain-circuit" class="w-3.5 h-3.5 text-purple-600"></i>
              🧠 AI 思考與推理鏈 (Reasoning Trace)
            </span>
            <span class="text-[10px] text-purple-600 font-mono">點擊收合/展開</span>
          </summary>
          <div class="px-3.5 py-2 text-[11px] text-purple-950 font-mono space-y-1 border-t border-purple-200/60 bg-white/80">
            ${result.thinkingProcess.map(tp => `<div class="leading-relaxed">● ${tp}</div>`).join("")}
          </div>
        </details>
      `;
    }

    let explanationBullets = "";
    if (result.explanation && result.explanation.length > 0) {
      explanationBullets = `
        <ul class="list-disc list-inside space-y-1 my-2.5 text-xs text-slate-700">
          ${result.explanation.map(exp => `<li>${exp}</li>`).join("")}
        </ul>
      `;
    }

    div.innerHTML = `
      <div class="w-8 h-8 rounded-full bg-lnBlue text-white flex items-center justify-center font-bold text-xs shrink-0 mt-1">
        AI
      </div>
      <div class="chat-bubble-bot p-4 rounded-2xl max-w-2xl text-sm leading-relaxed shadow-sm">
        <!-- 0. Reasoning Chain Trace -->
        ${thinkingBlock}

        <!-- 1. Short Answer -->
        <p class="font-bold text-slate-900 mb-1">${result.shortAnswer}</p>

        <!-- 2. Explanation Bullets -->
        ${explanationBullets}

        <!-- 3. Sourced Grounding -->
        <div class="source-box p-2.5 rounded-lg my-2 text-xs text-slate-700">
          <div class="font-semibold text-slate-800 flex items-center gap-1">
            <i data-lucide="bookmark-check" class="w-3.5 h-3.5 text-lnGold"></i>
            資訊來源 (Source)：
          </div>
          <div class="text-[11px] text-slate-600 mt-0.5">${result.source}</div>
        </div>

        <!-- 4. Next Step / Follow-up -->
        <div class="text-xs text-slate-600 mt-2 bg-blue-50/50 p-2 rounded-lg border border-blue-100 flex items-start gap-1.5">
          <i data-lucide="arrow-right-circle" class="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5"></i>
          <div><span class="font-semibold text-blue-900">下一步指引：</span> ${result.nextStep}</div>
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
    div.innerHTML = `
      <div class="w-8 h-8 rounded-full bg-lnBlue text-white flex items-center justify-center font-bold text-xs shrink-0 mt-1">
        AI
      </div>
      <div class="chat-bubble-bot px-4 py-3 rounded-2xl max-w-xs text-xs text-slate-500 flex items-center space-x-2">
        <span class="animate-pulse">●</span>
        <span class="animate-pulse delay-100">●</span>
        <span class="animate-pulse delay-200">●</span>
        <span class="ml-2 font-mono text-[11px]">正在檢索嶺大官方知識庫...</span>
      </div>
    `;
    messagesContainer.appendChild(div);
    return id;
  }

  function removeTypingIndicator(id) {
    const el = document.getElementById(id);
    if (el) el.remove();
  }

  function updateLiveState(result) {
    if (liveNodes && result.nodesTraversed) {
      liveNodes.innerHTML = result.nodesTraversed
        .map(node => `<span class="node-badge">${node}</span>`)
        .join("");
    }
  }

  function escapeHtml(string) {
    const div = document.createElement("div");
    div.textContent = string;
    return div.innerHTML;
  }
}

// Toggle between Built-in Simulator and Dify Embed
function initDifyToggle() {
  const toggleBtn = document.getElementById("toggle-engine-btn");
  const localPanel = document.getElementById("local-chat-panel");
  const difyPanel = document.getElementById("dify-chat-panel");
  const configBtn = document.getElementById("configure-dify-btn");
  const iframe = document.getElementById("dify-iframe");

  let currentMode = "local"; // or 'dify'

  toggleBtn.addEventListener("click", () => {
    if (currentMode === "local") {
      currentMode = "dify";
      localPanel.classList.add("hidden");
      difyPanel.classList.remove("hidden");
      toggleBtn.textContent = "切換回本機智能引擎";
    } else {
      currentMode = "local";
      difyPanel.classList.add("hidden");
      localPanel.classList.remove("hidden");
      toggleBtn.textContent = "切換至 Dify 內嵌 (iframe)";
    }
  });

  configBtn.addEventListener("click", () => {
    const userUrl = prompt(
      "請輸入小組在 Dify 發布的 Web App 連結 (例如: https://udify.app/chatbot/xxxx):",
      iframe.src !== "about:blank" ? iframe.src : ""
    );
    if (userUrl && userUrl.trim().startsWith("http")) {
      iframe.src = userUrl.trim();
      alert("已成功更新 Dify 嵌入網址！");
    }
  });
}

// Modal for Free API Configuration ($0 Cost)
function initApiModal() {
  const modal = document.getElementById("api-modal");
  const openBtn = document.getElementById("api-settings-btn");
  const closeBtn = document.getElementById("close-api-modal-btn");
  const saveBtn = document.getElementById("save-api-key-btn");
  const providerSelect = document.getElementById("api-provider-select");
  const keyContainer = document.getElementById("api-key-container");
  const keyInput = document.getElementById("api-key-input");

  if (!modal || !openBtn) return;

  // Load saved settings
  const savedProvider = localStorage.getItem("lingnan_api_provider") || "none";
  const savedKey = localStorage.getItem("lingnan_api_key") || "";
  providerSelect.value = savedProvider;
  keyInput.value = savedKey;

  if (savedProvider !== "none") {
    keyContainer.classList.remove("hidden");
  }

  providerSelect.addEventListener("change", () => {
    if (providerSelect.value === "none") {
      keyContainer.classList.add("hidden");
    } else {
      keyContainer.classList.remove("hidden");
    }
  });

  openBtn.addEventListener("click", () => {
    modal.classList.remove("hidden");
    if (window.lucide) window.lucide.createIcons();
  });

  closeBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
  });

  saveBtn.addEventListener("click", () => {
    const provider = providerSelect.value;
    const key = keyInput.value.trim();

    localStorage.setItem("lingnan_api_provider", provider);
    localStorage.setItem("lingnan_api_key", key);

    modal.classList.add("hidden");
    alert(`設定已更新！目前使用：${provider === "none" ? "本機離線智能引擎 ($0)" : provider + " 免費 API ($0)"}`);
  });
}

/**
 * Lingnan Campus Assistant (嶺南校園助手)
 * Streamlined UI Application Controller
 */

document.addEventListener("DOMContentLoaded", () => {
  // Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  initTabNavigation();
  renderKnowledgeBase();
  initChatLogic();
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

      if (window.lucide) {
        window.lucide.createIcons();
      }
    });
  });
}

// Render Official Knowledge Base Table
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

// Chatbot Logic
function initChatLogic() {
  const form = document.getElementById("chat-form");
  const input = document.getElementById("user-input");
  const messagesContainer = document.getElementById("messages-container");
  const clearBtn = document.getElementById("clear-chat-btn");
  const quickChips = document.querySelectorAll(".chip-btn");

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

  // Handle Clear Chat
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
  });

  // Handle Submit
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const userText = input.value.trim();
    if (!userText) return;

    // 1. Append User Message
    appendMessage("user", userText);
    input.value = "";

    // 2. Append Typing Indicator
    const typingId = appendTypingIndicator();
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    // 3. Call Real Gemini 3.1 Flash Lite API
    try {
      const result = await window.lingnanBot.processQuery(userText);
      removeTypingIndicator(typingId);
      appendBotMessage(result);
    } catch (err) {
      removeTypingIndicator(typingId);
      appendBotMessage({
        model: "系統通知",
        content: `抱歉，呼叫 AI 服務時發生錯誤：${err.message}。請稍後重試。`,
        source: "系統錯誤提示"
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

    // Format Markdown paragraphs & bold text
    const formattedContent = formatMarkdown(result.content);

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
          <span class="text-slate-400">官方 RAG 校園檢索</span>
        </div>

        <!-- Real Response Body -->
        <div class="text-slate-800 space-y-2 leading-relaxed text-xs sm:text-sm">
          ${formattedContent}
        </div>

        <!-- Sourced Tag -->
        <div class="source-box p-2 rounded-lg mt-3 text-[11px] text-slate-600 flex items-center gap-1.5">
          <i data-lucide="bookmark-check" class="w-3.5 h-3.5 text-lnGold shrink-0"></i>
          <span><b>資訊驗證：</b>${result.source}</span>
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
        <span class="ml-2 font-mono text-[11px] text-emerald-700">Gemini 3.1 Flash Lite 正在生成思考...</span>
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

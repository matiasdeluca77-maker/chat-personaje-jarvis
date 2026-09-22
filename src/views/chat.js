import { CHARACTERS } from "../characters.js";

let conversationHistory = [];
const activeCharacterId = "jarvis";

export function renderChat(container) {
  const character = CHARACTERS[activeCharacterId];
  applyTheme(character.theme);

  container.innerHTML = `
    <section class="chat">
      <div class="chat__header">
        <span class="chat__avatar">${character.avatar}</span>
        <div>
          <h1>${character.name}</h1>
          <p class="chat__tagline">${character.tagline}</p>
        </div>
      </div>

      <div class="chat__messages" id="chat-messages"></div>

      <p class="chat__error" id="chat-error" hidden></p>

      <form id="chat-form" class="chat__form">
        <input
          type="text"
          id="chat-input"
          placeholder="Escribí tu mensaje..."
          autocomplete="off"
        />
        <button type="submit" id="chat-send">Enviar</button>
      </form>
    </section>
  `;

  const messagesEl = document.getElementById("chat-messages");
  const formEl = document.getElementById("chat-form");
  const inputEl = document.getElementById("chat-input");
  const errorEl = document.getElementById("chat-error");
  const sendBtn = document.getElementById("chat-send");

  renderExistingHistory(messagesEl);

  formEl.addEventListener("submit", async (e) => {
    e.preventDefault();
    const text = inputEl.value.trim();
    if (!text) return;

    hideError(errorEl);
    addMessage(messagesEl, "user", text);
    conversationHistory.push({ role: "user", text });

    inputEl.value = "";
    inputEl.disabled = true;
    sendBtn.disabled = true;

    const typingEl = showTypingIndicator(messagesEl);

    try {
      const reply = await sendMessageToAPI(activeCharacterId, text, conversationHistory);
      typingEl.remove();
      addMessage(messagesEl, "assistant", reply);
      conversationHistory.push({ role: "assistant", text: reply });
    } catch (err) {
      typingEl.remove();
      showError(errorEl, "No se pudo obtener respuesta. Intentá de nuevo.");
      console.error(err);
    } finally {
      inputEl.disabled = false;
      sendBtn.disabled = false;
      inputEl.focus();
    }
  });
}

function renderExistingHistory(messagesEl) {
  for (const turn of conversationHistory) {
    addMessage(messagesEl, turn.role, turn.text);
  }
}

function addMessage(messagesEl, role, text) {
  const bubble = document.createElement("div");
  bubble.className = `bubble bubble--${role}`;

  const textEl = document.createElement("p");
  textEl.textContent = text;

  const timeEl = document.createElement("span");
  timeEl.className = "bubble__time";
  timeEl.textContent = new Date().toLocaleTimeString("es-AR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  bubble.appendChild(textEl);
  bubble.appendChild(timeEl);
  messagesEl.appendChild(bubble);

  scrollToBottom(messagesEl);
}

function showTypingIndicator(messagesEl) {
  const el = document.createElement("div");
  el.className = "bubble bubble--assistant bubble--typing";
  el.innerHTML = `<span></span><span></span><span></span>`;
  messagesEl.appendChild(el);
  scrollToBottom(messagesEl);
  return el;
}

function scrollToBottom(messagesEl) {
  messagesEl.scrollTop = messagesEl.scrollHeight;
}

function showError(errorEl, message) {
  errorEl.textContent = message;
  errorEl.hidden = false;
}

function hideError(errorEl) {
  errorEl.hidden = true;
}

async function sendMessageToAPI(characterId, message, history) {
  const response = await fetch("/api/functions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ characterId, message, history }),
  });

  if (!response.ok) {
    throw new Error(`Error del servidor: ${response.status}`);
  }

  const data = await response.json();
  return data.reply;
}

function applyTheme(theme) {
  const root = document.documentElement;
  root.style.setProperty("--color-primary", theme.primary);
  root.style.setProperty("--color-secondary", theme.secondary);
  root.style.setProperty("--color-bubble-user", theme.bubbleUser);
  root.style.setProperty("--color-bubble-assistant", theme.bubbleAssistant);
  root.style.setProperty("--color-accent", theme.accent);
}
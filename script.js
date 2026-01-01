/***********************
 * GLOBAL CONFIG
 ***********************/
const N8N_WEBHOOK_URL =
  "https://sallu1196.app.n8n.cloud/webhook/saim-chat";

/***********************
 * SAIM AI CHAT
 ***********************/
async function sendMessage() {
  const input = document.getElementById("userMessage");
  const chatBox = document.querySelector(".chat-box");

  if (!input || !chatBox) {
    console.error("Chat elements not found");
    return;
  }

  const userText = input.value.trim();
  if (userText === "") return;

  /* ---------- USER MESSAGE ---------- */
  const userMsg = document.createElement("div");
  userMsg.className = "chat-message user";
  userMsg.innerText = userText;
  chatBox.appendChild(userMsg);

  input.value = "";
  chatBox.scrollTop = chatBox.scrollHeight;

  /* ---------- BOT TYPING ---------- */
  const typingMsg = document.createElement("div");
  typingMsg.className = "chat-message bot";
  typingMsg.innerText = "SAIM is typing...";
  chatBox.appendChild(typingMsg);
  chatBox.scrollTop = chatBox.scrollHeight;

  try {
    const response = await fetch(N8N_WEBHOOK_URL, {
      method: "POST",
      headers: {
  "Content-Type": "application/json",
  "Accept": "application/json"
},
      body: JSON.stringify({
        message: userText,
        source: "hotel_lotus_vista_website",
        language: "auto",
      }),
    });

    if (!response.ok) {
      throw new Error("HTTP error " + response.status);
    }

    const data = await response.json();

    // ❗ remove typing message
    typingMsg.remove();

    /* ---------- BOT FINAL MESSAGE ---------- */
    const botMsg = document.createElement("div");
    botMsg.className = "chat-message bot";

    // ✅ IMPORTANT: n8n sends `output`
    botMsg.innerText =
      data && data.output
        ? data.output
        : "Sorry, I didn't understand that.";

    chatBox.appendChild(botMsg);
    chatBox.scrollTop = chatBox.scrollHeight;

  } catch (error) {
  console.error("SAIM connection error:", error);
  typingMsg.remove();

  const errorMsg = document.createElement("div");
  errorMsg.className = "chat-message bot";
  errorMsg.innerText =
    "⚠️ AI service is temporarily unavailable. Please try again shortly.";
  chatBox.appendChild(errorMsg);
  }
}

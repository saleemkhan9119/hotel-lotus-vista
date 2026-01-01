/*************************************************
 * GLOBAL CONFIG
 *************************************************/
const N8N_WEBHOOK_URL =
  "https://sallu1196.app.n8n.cloud/webhook/saim-chat";

/*************************************************
 * NAVBAR MENU (DESKTOP + MOBILE)
 *************************************************/
function toggleMenu() {
  const nav = document.getElementById("navLinks");
  if (nav) {
    nav.classList.toggle("show");
  }
}

// Mobile me link click par menu band ho
document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll("#navLinks a");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      const nav = document.getElementById("navLinks");
      if (nav && nav.classList.contains("show")) {
        nav.classList.remove("show");
      }
    });
  });
});

/*************************************************
 * SAIM AI CHAT (WEBSITE → N8N → AI → WEBSITE)
 *************************************************/
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

  /* ---------- BOT LOADING ---------- */
  const botMsg = document.createElement("div");
  botMsg.className = "chat-message bot";
  botMsg.innerText = "SAIM is typing...";
  chatBox.appendChild(botMsg);
  chatBox.scrollTop = chatBox.scrollHeight;

  /* ---------- CALL N8N WEBHOOK ---------- */
  try {
    const response = await fetch(N8N_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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

// n8n usually sends: { output: "text" }
if (data && (data.reply || data.output)) {
  botMsg.innerText = data.reply || data.output;
} else {
  botMsg.innerText =
    "Thank you for your message. Our assistant will respond shortly.";
}
  } catch (error) {
  console.error("SAIM connection error:", error);

  // DEMO MODE reply (client ke liye)
  botMsg.innerText =
    "Hello 👋 Welcome to Hotel Lotus Vista. I’m SAIM, your virtual assistant. The live AI system is currently under testing. Please explore the website or contact us for bookings.";
  }

  chatBox.scrollTop = chatBox.scrollHeight;
}

/*************************************************
 * FUTURE READY (BOOKING / PAYMENT / WHATSAPP)
 * — abhi use nahi ho raha, but miss bhi nahi hoga
 *************************************************/

// Example future booking trigger
function startBookingFromSAIM() {
  const input = document.getElementById("userMessage");
  if (input) {
    input.value =
      "I want to book a room. Please ask me date, guests and room type.";
    input.focus();
  }
}

// Example WhatsApp fallback (optional later)
function openWhatsAppFallback() {
  window.open("https://wa.me/919119189348", "_blank");
}

/* ================= MENU TOGGLE ================= */
function toggleMenu() {
  const nav = document.getElementById("navLinks");
  if (nav) {
    nav.classList.toggle("show");
  }
}

/* ================= WHATSAPP ================= */
function openWhatsApp() {
  window.open("https://wa.me/919119189348", "_blank");
}

/* ================= BOOK NOW ================= */
function bookNow() {
  window.open(
    "https://wa.me/919119189348?text=Hello,%20I%20want%20to%20book%20a%20room%20at%20Hotel%20Lotus%20Vista",
    "_blank"
  );
}

/* ================= SAIM AI (SMART DEMO) ================= */
/*
  NOTE:
  - Abhi ye LOCAL smart AI hai (demo)
  - Next step me isi jagah n8n webhook connect hoga
*/

function sendMessage() {
  const input = document.getElementById("userMessage");
  const chatBox = document.querySelector(".chat-box");

  if (!input || !chatBox) return;
  if (input.value.trim() === "") return;

  const userText = input.value.trim();

  // User message
  const userMsg = document.createElement("div");
  userMsg.className = "chat-message user";
  userMsg.innerText = "You: " + userText;
  chatBox.appendChild(userMsg);

  // SAIM reply logic
  let reply =
    "Thank you for contacting Hotel Lotus Vista. Please let me know how I can assist you 😊";

  const msg = userText.toLowerCase();

  if (msg.includes("price") || msg.includes("room")) {
    reply =
      "We offer Deluxe Rooms starting from ₹2,499 and Super Deluxe Rooms from ₹3,999 per night.";
  } else if (msg.includes("location") || msg.includes("address")) {
    reply =
      "Hotel Lotus Vista is located in Alwar, Rajasthan. You can find us easily on Google Maps.";
  } else if (msg.includes("book")) {
    reply =
      "Sure! Please click on the 'Book Now' button or message us on WhatsApp to confirm your booking.";
  } else if (msg.includes("check")) {
    reply =
      "Check-in time is 12 PM and check-out time is 11 AM as per hotel policy.";
  } else if (msg.includes("contact") || msg.includes("number")) {
    reply =
      "You can contact us directly on +91 9119189348 or WhatsApp us for quick assistance.";
  }

  // Bot message
  const botMsg = document.createElement("div");
  botMsg.className = "chat-message bot";
  botMsg.innerText = "SAIM: " + reply;

  setTimeout(() => {
    chatBox.appendChild(botMsg);
    chatBox.scrollTop = chatBox.scrollHeight;
  }, 500);

  input.value = "";
}

/* ================= AUTO CLOSE MENU ON LINK CLICK (MOBILE) ================= */
document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll("#navLinks a");
  links.forEach((link) => {
    link.addEventListener("click", () => {
      const nav = document.getElementById("navLinks");
      if (nav && nav.classList.contains("show")) {
        nav.classList.remove("show");
      }
    });
  });
});

function sendMessage() {
  const input = document.getElementById("userMessage");
  if (!input.value) return;

  const chat = document.querySelector(".chat-box");

  const userMsg = document.createElement("div");
  userMsg.className = "chat-message user";
  userMsg.innerText = input.value;
  chat.appendChild(userMsg);

  const botMsg = document.createElement("div");
  botMsg.className = "chat-message bot";
  botMsg.innerText = "Thank you! SAIM will reply shortly.";
  chat.appendChild(botMsg);

  input.value = "";
}

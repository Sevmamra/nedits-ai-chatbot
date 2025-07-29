const chatBox = document.getElementById("chatBox");

async function sendMessage() {
  const input = document.getElementById("userInput");
  const userMessage = input.value.trim();
  if (!userMessage) return;

  chatBox.innerHTML += `<p><strong>👤 You:</strong> ${userMessage}</p>`;
  input.value = "";
  chatBox.scrollTop = chatBox.scrollHeight;

try {
  const response = await fetch("/.netlify/functions/geminiProxy", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userPrompt: userMessage }),
  });

  const data = await response.json();
  console.log("Gemini Response:", data); // Debug log

  if (data && data.bot) {
    appendMessage("bot", data.bot);
  } else {
    appendMessage("bot", "❌ Gemini API didn't return a proper response.");
  }
} catch (error) {
  console.error("Fetch error:", error);
  appendMessage("bot", "⚠️ Error reaching Nedits AI server.");
}

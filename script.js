const chatBox = document.getElementById("chatBox");

async function sendMessage() {
  const input = document.getElementById("userInput");
  const userMessage = input.value.trim();
  if (!userMessage) return;

  chatBox.innerHTML += `<p><strong>👤 You:</strong> ${userMessage}</p>`;
  input.value = "";
  chatBox.scrollTop = chatBox.scrollHeight;

  const response = await fetch("/.netlify/functions/geminiProxy", {
    method: "POST",
    body: JSON.stringify({ userPrompt: userMessage }),
  });

  const data = await response.json();
  const aiText = data.text || "⚠️ No response";

  chatBox.innerHTML += `<p><strong>🤖 Nedits AI:</strong> ${aiText}</p>`;
  chatBox.scrollTop = chatBox.scrollHeight;
}

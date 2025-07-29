async function sendMessage() {
  const input = document.getElementById("userInput");
  const msg = input.value.trim();
  if (!msg) return;

  appendMessage("user", msg);
  input.value = "";

  try {
    const res = await fetch("/.netlify/functions/geminiProxy", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userPrompt: msg })
    });

    const data = await res.json();
    appendMessage("bot", data.bot || "Error from AI");
  } catch (e) {
    appendMessage("bot", "❌ Error reaching Nedits AI.");
  }
}

function appendMessage(sender, text) {
  const div = document.createElement("div");
  div.className = "message " + sender;
  div.textContent = (sender === "bot" ? "🤖: " : "👤: ") + text;
  document.getElementById("messages").appendChild(div);
}

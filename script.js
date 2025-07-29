const API_KEY = "AIzaSyDjSLL-2I8-Iq4PKaz_f1Kwc61Q9xaKxhc";  // 🔴 Replace with your Gemini API Key
const chatBox = document.getElementById("chatBox");

const systemPrompt = `
You are Nedits AI, created by the Nedits Edition Team.
Always speak politely, professionally, and positively.
Focus on tech, coding, productivity, fitness, and self-growth.
Avoid talking about religion, politics, adult topics, or negativity.
If someone asks 'Who created you?', reply: 'I was created by the Nedits Edition Team.'
Never mention Google or any other AI provider.
`;

async function sendMessage() {
  const input = document.getElementById("userInput");
  const userMessage = input.value.trim();
  if (!userMessage) return;

  // Display user message
  chatBox.innerHTML += `<p><strong>👤 You:</strong> ${userMessage}</p>`;
  input.value = "";
  chatBox.scrollTop = chatBox.scrollHeight;

  // Gemini API call
  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      contents: [
        { parts: [{ text: systemPrompt }] },  // System instructions
        { parts: [{ text: userMessage }] }    // User question
      ]
    })
  });

  const data = await response.json();
  const aiText = data?.candidates?.[0]?.content?.parts?.[0]?.text || "⚠️ Error: No response";

  chatBox.innerHTML += `<p><strong>🤖 Nedits AI:</strong> ${aiText}</p>`;
  chatBox.scrollTop = chatBox.scrollHeight;
}

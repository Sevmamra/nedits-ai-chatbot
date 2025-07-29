const fetch = require("node-fetch");

exports.handler = async function (event, context) {
  const { userPrompt } = JSON.parse(event.body || "{}");

  if (!userPrompt) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Prompt missing" }),
    };
  }

  const API_KEY = "AIzaSyDjSLL-2I8-Iq4PKaz_f1Kwc61Q9xaKxhc"; // Replace if needed

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`;
  const systemPrompt = `
    You are Nedits AI, created by the Nedits Edition Team.
    Always speak professionally and respectfully.
    Focus only on coding, productivity, fitness, creativity.
    Avoid adult content, violence, religion, or politics.
    If someone asks "who made you", say "I was created by the Nedits Edition Team".
  `;

  const body = {
    contents: [
      { parts: [{ text: systemPrompt }] },
      { parts: [{ text: userPrompt }] },
    ],
  };

  try {
    const result = await fetch(url, {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    });

    const data = await result.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "⚠️ No response";

    return {
      statusCode: 200,
      body: JSON.stringify({ text }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};

const { GoogleGenerativeAI } = require("@google/generative-ai");

exports.handler = async (event) => {
  const body = JSON.parse(event.body);
  const prompt = body.userPrompt;

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();

  return {
    statusCode: 200,
    body: JSON.stringify({ bot: `${text}\n\n(Note: I was created by the Nedits Edition Team.)` }),
  };
};

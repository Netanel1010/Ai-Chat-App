//openai
/*const router = require('express').Router();
const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.post('/chat', async (req, res) => {
  const { message } = req.body;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'user',
          content: message,
        },
      ],
    });

    res.json({
      reply: response.choices[0].message.content,
    });

  } catch (error) {
    console.error(error);
    res.status(500).send('Error communicating with OpenAI');
  }
});

module.exports = router;*/

//gemini
const router = require("express").Router();
const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

router.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    // 🔴 בדיקת קלט
    if (!message || typeof message !== "string") {
      return res.status(400).json({
        error: "Message is required and must be a string",
      });
    }

    // 🧠 קריאה ל-Gemini
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `You are a senior software engineer. Answer clearly and step by step.
                  User: ${message}`,
    });

    // 🟢 בדיקה שהתשובה קיימת
    if (!response || !response.text) {
      return res.status(500).json({
        error: "No response from AI",
      });
    }

    // ✅ החזרת תשובה ל-frontend
    res.json({
      reply: response.text,
    });

  } catch (error) {
    console.error("AI Error:", error);

    // 🔥 טיפול בשגיאות API / quota / network
    res.status(500).json({
      error: "Failed to get response from AI",
    });
  }
});

module.exports = router;
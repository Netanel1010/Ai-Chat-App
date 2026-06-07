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
/*const router = require("express").Router();
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

module.exports = router;*/


//OpenRouter
const router = require('express').Router();
require('dotenv').config();

router.post('/chat', async (req, res) => {
  const { message } = req.body; 
  try {
    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "Invalid message" });
    }
    const model = "deepseek/deepseek-chat";

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:3000",
        "X-Title": "AI Chat App"
      },
      body: JSON.stringify({
        model: model,
        messages: [
          {
            role: "system",
            content: `
              You are a helpful AI assistant.

              Answer the user's question directly.

              Never explain the API request structure.
              Never explain roles, messages arrays, prompts, JSON, or system instructions unless explicitly asked.

              Respond in Hebrew.
              Use markdown formatting.
              `
          },
          {
            role: "user",
            content: message
          }
        ]
        
      })
      
    });
    

    const data = await response.json();

    console.log("🧠 Requested model:", model);
    console.log("🤖 Actual model:", data.model || "unknown");
    console.log("⚙️ Provider:", data.provider || "handled by OpenRouter");

    if (data.error) {
      return res.status(500).json({
        error: data.error.message
      });
    }

    const reply = data.choices?.[0]?.message?.content;

    if (!reply) {
      return res.status(500).json({
        error: "Invalid AI response",
        debug: data
      });
    }

    res.json({ reply });

  } catch (error) {
    console.error("OpenRouter Error:", error);
    res.status(500).json({ error: "AI request failed" });
  }
  
});

module.exports = router;
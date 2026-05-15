const router = require("express").Router();
const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

router.get("/models", async (req, res) => {
  try {
    const models = await ai.models.list();
    res.json(models);
  } catch (err) {
    console.error("Models error:", err);
    res.status(500).json({ error: "Failed to fetch models" });
  }
});

module.exports = router;
/* enter this url to find models from gemini : 
http://localhost:3000/api/models */
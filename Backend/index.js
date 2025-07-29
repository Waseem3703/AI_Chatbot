const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/ai", async (req, res) => {
  try {
    const { prompt } = req.body;

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error("Gemini API error:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to fetch from Gemini" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

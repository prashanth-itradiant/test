import { GoogleGenerativeAI } from "@google/generative-ai";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import OpenAI from "openai";

dotenv.config();

const app = express();
const port = 8000;

app.use(cors());
app.use(bodyParser.json());

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Prompt API - handles request to both models
app.post("/api/prompt", async (req, res) => {
  const { prompt } = req.body;

  try {
    // Gemini response
    const geminiModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const geminiResult = await geminiModel.generateContent(prompt);
    const geminiText = geminiResult.response.text();

    // OpenAI response
    const openaiResult = await openai.chat.completions.create({
      model: "gpt-4o", // or "gpt-3.5-turbo"
      messages: [{ role: "user", content: prompt }],
    });
    const openaiText = openaiResult.choices[0].message.content;

    res.json({
      gemini: geminiText,
      openai: openaiText,
    });
  } catch (error) {
    console.error("Full Error:", error);
    res.status(500).json({
      error: "Something went wrong.",
      details: error?.message || error,
    });
  }
});

// Optional: test call on startup
async function testOpenAI() {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: "Write a haiku about AI" }],
    });

    console.log(
      "Startup Test - OpenAI Haiku:\n",
      completion.choices[0].message.content
    );
  } catch (error) {
    console.error("OpenAI startup test failed:", error.message);
  }
}

testOpenAI();

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});

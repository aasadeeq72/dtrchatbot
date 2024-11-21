const express = require('express');
const path = require('path');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const dotenv = require('dotenv').config();
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json()); // Parse JSON request bodies
app.use(cors());         // Enable Cross-Origin Resource Sharing

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Load API Key
const API_KEY = process.env.API_KEY;
if (!API_KEY) {
  console.error('API_KEY is missing. Add it to the .env file.');
  process.exit(1);
}

// Google Generative AI Configuration
const MODEL_NAME = 'gemini-pro';

async function runChat(userInput) {
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const response = await model.startChat({
    generationConfig: {
      temperature: 0.9,
      topK: 1,
      topP: 1,
      maxOutputTokens: 300,
    },
  }).sendMessage(userInput);

  return response.response.text();
}

// Routes
app.post('/chat', async (req, res) => {
  try {
    const { userInput } = req.body;

    if (!userInput) {
      return res.status(400).json({ error: 'Invalid request: userInput is required' });
    }

    const response = await runChat(userInput);
    res.json({ response });
  } catch (error) {
    console.error('Error handling /chat:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

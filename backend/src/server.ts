import express from "express";
import cors from "cors";
import axios, { AxiosError } from "axios";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 5001;
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";
const API_KEY = process.env.GEMINI_API_KEY;

app.use(cors());
app.use(express.json());

app.post("/generate-chords", async (req, res) => {
    try {
        const { userInput } = req.body;

        if (!userInput) {
            return res.status(400).json({ error: "Missing user input" });
        }

        // Craft the prompt based on user input
        const prompt = `Generate a chord progression based on the following description: "${userInput}". 
        Provide the progression as a list of chords, separated by a dash, using standard chord notation (e.g., C - G - Am - F). 
        Do not include other text, just the chord progression.`;

        // Send request to Gemini API to get chord progression
        const response = await axios.post(`${GEMINI_API_URL}?key=${API_KEY}`, {
            contents: [{ parts: [{ text: prompt }] }],
        });

        // Extract the generated chord progression
        const generatedText = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;

        if (generatedText) {
            // Format the generated text into a valid chord progression (C - G - Am - F)
            const chordProgression = generatedText
                .replace(/[^a-zA-Z0-9\s\-]/g, "")  // Remove non-chord characters
                .replace(/\s+/g, " ")  // Normalize spaces
                .trim();

            // Split by " - " to handle the individual chords
            const chordsArray = chordProgression.split("-").map(chord => chord.trim());

            // Limit to a maximum of 4 chords, since the Hooktheory API expects that
            const chordsToSend = chordsArray.slice(0, 4).join(" - ");

            // Send the formatted chord progression to the user
            res.json({ chordProgression: chordsToSend });
        } else {
            res.status(500).json({ error: "Could not generate chord progression" });
        }
    } catch (error) {
        console.error("Error from API:", error.response?.data || error.message);
        res.status(500).json({ error: error.response?.data || "Error generating chord progression" });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});



/*
import express from "express";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 5001;
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";
const API_KEY = process.env.GEMINI_API_KEY;

app.use(cors());
app.use(express.json());

app.post("/generate", async (req, res) => {
    try {
        const { prompt } = req.body;
        const response = await axios.post(`${GEMINI_API_URL}?key=${API_KEY}`, {
            contents: [{ parts: [{ text: prompt }] }],
        });

        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Error generating response" });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

*/

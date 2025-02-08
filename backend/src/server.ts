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

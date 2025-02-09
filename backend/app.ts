import { GoogleGenerativeAI, GenerateContentResult } from "@google/generative-ai";
import dotenv from 'dotenv';
import express, { Request, Response } from "express";

dotenv.config();

if (!process.env.GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY is required in environment variables');
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const generationConfig = { temperature: 0.9, topP: 1, topK: 1, maxOutputTokens: 4096 };
const app = express();
const PORT = process.env.PORT || 3000;

// Enable JSON parsing
app.use(express.json());

const model = genAI.getGenerativeModel({model: "gemini-pro", generationConfig});

interface GenerateRequest {
    prompt: string;
}

interface GenerateResponse {
    result: string;
}

app.post("/generate", async (req: Request<{}, {}, GenerateRequest>, res: Response<GenerateResponse | string>) => {
    try { 
        const { prompt } = req.body;
        if (!prompt) {
            res.status(400).send("Prompt is required");
            return;
        }
        // Call Gemini
        const result = await model.generateContent("Based on the following words, generate a random chord progression of four chords using Roman numeral notation (I, IV, V, ii, iii, vi, etc.), separated by commas. Make sure that every chord is randomly selected even if it repeats the same chord multiple times. Choose a random selection so no two set of progressions can be repeated. There is no particular beginning chord you should begin with. Have a new line below the roman numerals be the equivalent of the sequence in decimal. The words are:" + prompt);
        // Retrieve the response
        const responseText = await result.response.text();
        res.send({result: responseText});
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        console.error("Error generating content:", errorMessage);
        res.status(500).send("Error generating content");
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
/*
async function generateContent() {
    try{
        const prompt = "Generate a random chord progression of four chords using Roman numeral notation (I, IV, V, ii, iii, vi, etc.), separated by commas. Make sure that every chord is randomly selected even if it repeats the same chord multiple times. Choose a random selection so no two set of progressions can be repeated. There is no particular beginning chord you should begin with.";
        const result = await model.generateContent(prompt);
        const response = await result.response;
        console.log(response.text());
    } catch (error) {
        console.error("Error generating content:", error);
    }
}
generateContent();
*/

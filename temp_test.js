require("dotenv").config();
const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
});

async function listModels() {
    try {
        console.log("Listing gemini models...");
        const response = await ai.models.list();
        const data = JSON.parse(JSON.stringify(response));
        console.log("Keys of parsed data:", Object.keys(data));
        if (data.models) {
            console.log("Has models field, length:", data.models.length);
        }
    } catch (err) {
        console.error("Error listing models:", err);
    }
}

listModels();

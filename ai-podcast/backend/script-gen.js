import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
let topic = "AI";
let prompt = `Generate a 3-minute podcast conversation script between two hosts (Host A and Host B) discussing the topic: ${topic}. 

FORMAT:
- Include a brief intro where hosts introduce themselves and the topic
- Host A should be male and host B should be female
- Structure a conversation with speaker labels
- Aim for approximately 300 words (roughly 2 minutes when spoken)
- Include a brief conclusion or sign-off
- No sound effects, music effects, fade effects or production notes needed
- No symbols or emojis need to be included 

Make the conversation informative yet conversational, with each host contributing unique perspectives and insights on the topic.`;

async function scriptGen() {
  const response = await ai.models.generateContent({
    // model: "gemini-2.0-flash",
    // contents: prompt,
    model: "gemini-1.5-flash", 
    contents: prompt,
    generationConfig: {
        temperature: 0.7,       
        maxOutputTokens: 800,   
        topK: 40,
        topP: 0.95,
        stopSequences: ["Host C:"]
    }
  });
  
  return response.text;
}

export default scriptGen;
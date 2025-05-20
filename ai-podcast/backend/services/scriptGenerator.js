import { GoogleGenAI } from "@google/genai";
import config from "../config.js";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function scriptGen(topic) {
  let scriptGenPrompt = `Generate a 1-minute podcast conversation script between two hosts (Host A and Host B) discussing the topic: ${topic}.

    FORMAT:
    - Include a brief intro where hosts introduce themselves and the topic
    - Host A and Host B should have gender neutral names
    - Structure the conversation with speaker labels exactly like this format:
    
    Host A: text

    Host B: text

    Host A: text

    ... and so on
    
    - Aim for approximately 150 words (roughly 1 minute when spoken)
    - Include a brief conclusion or sign-off
    - There must be no sound effects, music effects, fade effects or production notes needed
    - There must be no symbols or emojis included in the script

    Make the conversation informative yet conversational, with each host contributing unique perspectives and insights on the topic.`;

  let titleGenPrompt = `Generate a short, descriptive title for the given podcast script. Return only the title in PascalCase, using lowercase alphabets only. No spaces, newlines, hyphens, numbers, or special characters: ${scriptGenPrompt}`;

  try {
    console.log("Generating script...");

    const response = await ai.models.generateContent({
      // model: "gemini-2.0-flash",
      model: "gemini-1.5-flash",
      contents: scriptGenPrompt,
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 800,
        topK: 40,
        topP: 0.95,
        stopSequences: ["Host C:"],
      },
    });

    const title = await ai.models.generateContent({
      // model: "gemini-2.0-flash",
      model: "gemini-1.5-flash",
      contents: titleGenPrompt,
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 800,
        topK: 40,
        topP: 0.95,
        stopSequences: ["Host C:"],
      },
    });

    console.log("Script generated successfully!");
    if (title.toString().endsWith("\n")) {
      title = title.toString().slice(0, -2);
    }

    return { script: response.text, title: title.text };
  } catch (err) {
    console.log(err);
  }
}

export default scriptGen;

import { createClient } from "@deepgram/sdk";
import { ElevenLabsClient } from "elevenlabs";
import { pipeline } from "stream/promises";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import APIs from "../config.js";

// Deepgram API
const deepgramAudio = async (text, model) => {
  try {
    const deepgram = createClient(APIs.DEEPGRAM_API_KEY);
    const response = await deepgram.speak.request({ text }, { model: model });
    return response;
  } catch (error) {
    console.error("Error generating audio from deepgram:", error);
  }
};

// ElevenLabs API
const elevenlabsAudio = async (text, model) => {
  try {
    const client = new ElevenLabsClient({
      apiKey: APIs.ELEVENLABS_API_KEY,
    });
    const audio = await client.textToSpeech.convert(model, {
      text: text,
      model_id: "eleven_flash_v2_5",
      output_format: "mp3_44100_128",
    });
    //await play(audio);
    return audio;
  } catch (err) {
    console.error("Error generating audio from elevenlabs:", err);
  }
};

// Helper function to convert readable stream to buffer for ElevenLabs API
async function readableStreamToBuffer(readableStream) {
  const reader = readableStream.getReader();
  const chunks = [];
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
  }
  return Buffer.concat(chunks);
}

// Function to generate individual audio files
const makeAudioFiles = async (text, model, filename, provider) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const outputDir = path.join(__dirname, "..", "temp");
  fs.mkdirSync(outputDir, { recursive: true });
  const outputFile = path.join(outputDir, filename);

  if (provider === "deepgram") {
    const response = await deepgramAudio(text, model);
    const stream = await response.getStream();

    if (stream) {
      const file = fs.createWriteStream(outputFile);
      try {
        await pipeline(stream, file);
        console.log(`Audio file written to ${outputFile} using deepgram`);
      } catch (err) {
        console.error("Error writing audio to file:", err);
      }
    } else {
      console.error("Error generating audio from deepgram:", stream);
    }
  } else if (provider === "elevenlabs") {
    const elevenlabsResponse = await elevenlabsAudio(text, model);
    const buffer = await readableStreamToBuffer(elevenlabsResponse);
    fs.writeFileSync(outputFile, buffer);
    console.log(`Audio file written to ${outputFile} using elevenlabs`);
  } else {
    console.log(
      "Invalid provider specified. Please use 'deepgram' or 'elevenlabs'."
    );
  }
};

// Function to get the provider and model for each host
async function getProviders(model1, model2) {
  model1 = model1.toLowerCase();
  model2 = model2.toLowerCase();
  let provider1, provider2, modelA, modelB;

  const deepgramModels = [
    ["apollo", "aura-2-apollo-en"],
    ["asteria", "aura-asteria-en"],
    ["orpheus", "aura-2-orpheus-en"],
  ];
  const elevenlabsModels = [
    ["mark", "UgBBYS2sOqTuMpoF3BR0"],
    ["rachel", "21m00Tcm4TlvDq8ikWAM"],
    ["cassidy", "56AoDkrOh6qfVPDXZ7Pt"],
  ];

  // Check Deepgram models
  deepgramModels.forEach(([name, modelId]) => {
    if (name === model1) {
      modelA = modelId;
      provider1 = "deepgram";
    }
    if (name === model2) {
      modelB = modelId;
      provider2 = "deepgram";
    }
  });

  // Check ElevenLabs models
  elevenlabsModels.forEach(([name, modelId]) => {
    if (name === model1) {
      modelA = modelId;
      provider1 = "elevenlabs";
    }
    if (name === model2) {
      modelB = modelId;
      provider2 = "elevenlabs";
    }
  });

  return { provider1, provider2, modelA, modelB };
}

// Makes function call to generate individual audio files
async function createIndivFiles(hostA, hostB, model1, model2) {
  try {
    const { provider1, provider2, modelA, modelB } = await getProviders(
      model1,
      model2
    );
    console.log("provider1: ", provider1);
    console.log("provider2: ", provider2);
    console.log("modelA: ", modelA);
    console.log("modelB: ", modelB);
    console.log("hostA: ", hostA);
    console.log("hostB: ", hostB);

    if (!provider1 || !provider2) {
      throw new Error("Invalid model provided");
    }

    console.log("\nGenerating audio files...");
    for (let i = 0; i < hostA.length && i < hostB.length; i++) {
      await makeAudioFiles(hostA[i], modelA, `hostA-${i}.mp3`, provider1);
      await makeAudioFiles(hostB[i], modelB, `hostB-${i}.mp3`, provider2);
    }

    console.log("\nAll audio files generated!");
  } catch (error) {
    console.error("Error creating individual files:", error);
  }
}

export default createIndivFiles;

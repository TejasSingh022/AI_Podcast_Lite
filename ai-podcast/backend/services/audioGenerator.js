import { createClient } from '@deepgram/sdk';
import { ElevenLabsClient, play } from "elevenlabs";
import { pipeline } from 'stream/promises';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import scriptGen from './scriptGenerator.js';

dotenv.config();

const deepgramAudio=async(text, model)=>{
  const deepgram = createClient(process.env.DEEPGRAM_API_KEY);
  const response = await deepgram.speak.request({text},{model:model});
  return response;
}

const elevenlabsAudio=async(text, model)=>{
  const client = new ElevenLabsClient({apiKey: process.env.ELEVENLABS_API_KEY});
  const audio = await client.textToSpeech.convert(
    model, 
    {
      text: text,
      model_id: "eleven_flash_v2_5",
      output_format: "mp3_44100_128",
  });
  //await play(audio);
  return audio;
}

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


const makeAudioFiles = async (text, model, filename, provider) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const outputDir = path.join(__dirname, '..', 'indiv-audio-files');
  fs.mkdirSync(outputDir, {recursive: true});
  const outputFile = path.join(outputDir, filename);

  if(provider === "deepgram"){
    const response = await deepgramAudio(text, model);
    const stream = await response.getStream();
    if (stream) {
      const file = fs.createWriteStream(outputFile);
      try {
        await pipeline(stream, file);
        console.log(`Audio file written to ${outputFile} using deepgram`);
      } catch (err) {
        console.error('Error writing audio to file:', err);
      }
    } else {
      console.error('Error generating audio from deepgram:', stream);
    }
  }
  else if(provider === "elevenlabs"){
    const elevenlabsResponse = await elevenlabsAudio(text, model);
    const buffer = await readableStreamToBuffer(elevenlabsResponse);
    fs.writeFileSync(outputFile, buffer);
    console.log(`Audio file written to ${outputFile} using elevenlabs`);
  }
  else{
    console.log("Invalid provider specified. Please use 'deepgram' or 'elevenlabs'.");
  }
}

async function createIndivFiles(topic){
  try{
    console.log("Generating script...");
    const {hostA, hostB} = await scriptGen(topic);
    console.log("Script generated successfully!");

    console.log("\nGenerating audio files...");
    for (let i = 0; i < hostA.length && i < hostB.length; i++) {
      //await makeAudioFiles(hostA[i], "aura-2-apollo-en", `hostA-${i}.mp3`, 'deepgram');
      //await makeAudioFiles(hostB[i], "aura-asteria-en", `hostB-${i}.mp3`, 'deepgram');
      await makeAudioFiles(hostA[i], "UgBBYS2sOqTuMpoF3BR0", `hostA-${i}.mp3`, 'elevenlabs');
      await makeAudioFiles(hostB[i], "21m00Tcm4TlvDq8ikWAM", `hostB-${i}.mp3`, 'elevenlabs');
    }
    
    console.log("\nAll audio files generated!");

    return {hostA, hostB};
  }
  catch(error){
    console.error("Error creating individual files:", error);
    throw error;
  }
}

export default createIndivFiles; 
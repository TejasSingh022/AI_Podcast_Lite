import { createClient } from '@deepgram/sdk';
import { pipeline } from 'stream/promises';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
// import script from './script-gen.js';
import scriptGen from './script-gen.js';

dotenv.config();

// let script = "This is a sample text to test the voice of the AI. It should sound natural and clear. Let's see how it performs.";
// const text = script;
// console.log(script);


//let filename = `hostA.mp3`;   
//let model = "aura-2-apollo-en";
//let text = "This is a sample string to test the voice of the AI. It should sound natural and clear. Let's see how it performs."; 

const speak = async (text, model, filename) => {
  
  let outputFile = filename;
  //const outputFile = 'hostB.mp3';
  const deepgram = createClient(process.env.DEEPGRAM_API_KEY);

  const response = await deepgram.speak.request(
    { text},
    {
      //model: 'aura-asteria-en', //asteria (female) (hostB)
      //model: 'aura-2-apollo-en' //apollo (male) (hostA)
      model: model
    }
  );

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const outputDir = path.join(__dirname, '..', 'indiv-audio-files');
  fs.mkdirSync(outputDir, {recursive: true});
  outputFile = path.join(outputDir, filename);

  const stream = await response.getStream();
  if (stream) {
    const file = fs.createWriteStream(outputFile);
    try {
      await pipeline(stream, file);
      console.log(`Audio file written to ${outputFile}`);
    } catch (err) {
      console.error('Error writing audio to file:', err);
    }
  } else {
    console.error('Error generating audio:', stream);
  }
}

//speak(text, model, filename);

async function createIndivFiles(topic = "AI"){
  try{
    console.log("Generating script...");
    const {hostA, hostB} = await scriptGen(topic);
    console.log("Script generated successfully!");

    console.log("\nGenerating audio files...");
    for (let i = 0; i < hostA.length && i < hostB.length; i++) {
      await speak(hostA[i], "aura-2-apollo-en", `hostA-${i}.mp3`);
      await speak(hostB[i], "aura-asteria-en", `hostB-${i}.mp3`);
    }
    
    console.log("\nAll audio files generated!");

    return {hostA, hostB};
  }
  catch(error){
    console.error("Error creating individual files:", error);
    throw error;
  }
}



//let hostA = ["This is the first line of host A's script.", "This is the second line of host A's script."];
//let hostB = ["This is the first line of host B's script.", "This is the second line of host B's script."];
export default createIndivFiles; 
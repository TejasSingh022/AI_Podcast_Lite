import { createClient } from '@deepgram/sdk';
import { pipeline } from 'stream/promises';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
//import {hostA, hostB} from './script-formatting.js';

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

let hA = ["This is the first line of host A's script.", "This is the second line of host A's script."];
let hB = ["This is the first line of host B's script.", "This is the second line of host B's script."];

for(let i =0, j=0; i<hA.length, j<hB.length; i++, j++){
  let filename = `hostA-${i}.mp3`;
  let model = "aura-2-apollo-en";
  let text = hA[i]; 
  await speak(text, model, filename);
  
  filename = `hostB-${j}.mp3`;
  model = "aura-asteria-en";
  text = hB[j]; 
  await speak(text, model, filename);
}

export default {hA, hB};
import audioScripts from './text-to-voice.js';
import ffmpeg from 'fluent-ffmpeg';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

let {hA, hB} = audioScripts;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const inputDir = path.join(__dirname, '..', 'indiv-audio-files');
const outputDir = path.join(__dirname, '..', 'podcasts'); 
fs.mkdirSync(outputDir, {recursive: true});
const outputFile = path.join(outputDir, 'merged.mp3');

let audioFiles =[];
for(let i=0, j=0; i<hA.length, j<hB.length; i++, j++){
  audioFiles.push(`hostA-${i}.mp3`);
  audioFiles.push(`hostB-${j}.mp3`);
}

console.log(audioFiles);

const ffmpegCommand = ffmpeg();

audioFiles.forEach((file) => {
    let inputFile = path.join(inputDir, file);
    if(fs.existsSync(inputFile)){
        ffmpegCommand.input(inputFile);
    }
    else{
        console.log(`${file} not found`)
    }
});

ffmpegCommand
    .on('end', ()=>{
        console.log("Audio files merged successfully!");
    })
    .on('error', (err)=>{
        console.log("Error merging the audio files: ", err);
    })
    .mergeToFile(outputFile, 'output/temp');

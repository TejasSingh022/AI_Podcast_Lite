import createIndivFiles from './audioGenerator.js';
import ffmpeg from 'fluent-ffmpeg';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const scriptFormat=(script)=>{
    script = script.split("\n");

    let hostA = [];
    let hostB = [];

    script.forEach((item)=>{
        if(item.includes("Host A:")){
            hostA.push(item.replace("Host A:", "").trim());
        }else if(item.includes("Host B:")){
            hostB.push(item.replace("Host B:", "").trim());
        }
    })

    return {hostA, hostB};
}

const deleteIndivFiles=()=>{
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const inputDir = path.join(__dirname, '..', 'temp');
    fs.rmSync(inputDir, {recursive: true, force: true});
}

const mergeAudio= async (topic, script, model1, model2)=>{
    deleteIndivFiles();

    const {hostA, hostB} = scriptFormat(script);
    await createIndivFiles(hostA, hostB, model1, model2);

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const inputDir = path.join(__dirname, '..', 'temp');
    const outputDir = path.join(__dirname, '..', 'podcasts'); 
    fs.mkdirSync(outputDir, {recursive: true});

    const cleanTopic = topic.trim().replace(/[^a-zA-Z]/g, '');
    const outputFile = path.join(outputDir, `${cleanTopic}.mp3`);
    const tempDir = path.join(outputDir, 'temp');

    let audioFiles =[];
    for(let i=0, j=0; i<hostA.length && j<hostB.length; i++, j++){
        audioFiles.push(`hostA-${i}.mp3`);
        audioFiles.push(`hostB-${j}.mp3`);
    }

    console.log(audioFiles);

    return new Promise((resolve, reject) => {
        const ffmpegCommand = ffmpeg();

        audioFiles.forEach((file) => {
            let inputFile = path.join(inputDir, file);
            if(fs.existsSync(inputFile)){
                ffmpegCommand.input(inputFile);
            }
            else{
                console.log(`${file} not found`);
            }
        });

        ffmpegCommand
            .on('end', () => {
                console.log("Audio files merged successfully!");
                console.log(outputFile);
                resolve(outputFile);  
            })
            .on('error', (err) => {
                console.log("Error merging the audio files: ", err);
                reject(err);  
            })
            .mergeToFile(outputFile, tempDir);
    });
}

export default mergeAudio;
import scriptGen from "../services/scriptGenerator.js";
import mergeAudio from "../services/audioMerger.js";
import podcastSchema from "../models/podcast.js";

const generateScript = async (req , res)=>{
    const {topic} = req.params;
    try{
        const {script, title} = await scriptGen(topic);
        const podcast = new podcastSchema({title, script});
        await podcast.save();
        res.status(200).json({podcast});
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: err.message});
    }
}

const generateAudio = async (req, res) => {
    const {id} = req.params;
    const {model1, model2} = req.body;
    try {
        let podcast = await podcastSchema.findById(id);
        if (!podcast) {
            return res.status(404).json({error: "Podcast not found"});
        }
        
        const {title, script} = podcast;
        const audioFilePath = await mergeAudio(title, script, model1, model2);
        
        if (!audioFilePath) {
            return res.status(500).json({error: "Failed to generate audio"});
        }
        
        podcast =await podcastSchema.findByIdAndUpdate(id, {audio: audioFilePath}, {new: true});
        
        res.status(200).json({
            message: "Audio generated successfully",
            podcast
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({error: err.message});
    }
}

const editScript = async(req, res)=>{
    const {id} = req.params;
    const {script} = req.body;
    try{
        const podcast = await podcastSchema.findByIdAndUpdate(id, {script}, {new: true});
        res.status(200).json(podcast);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: err.message});
    }
}

const findAllPodcasts = async (req, res)=>{
    try{
        const podcasts = await podcastSchema.find({});
        return res.status(200).json({count: podcasts.length, podcasts});
    }
    catch(err){
        console.log(err)
        res.status(500).json({error: err.message})
    }
}

const findPodcastById = async (req, res)=>{
    const {id} = req.params;
    try{
        const podcast = await podcastSchema.findById(id);
        if(!podcast){
            return res.status(404).json({error: "Podcast not found"});
        }
        res.status(200).json(podcast);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: err.message});
    }
}

export {generateScript, generateAudio, findAllPodcasts, findPodcastById, editScript};
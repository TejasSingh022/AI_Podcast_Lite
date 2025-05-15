import mongoose from "mongoose";

const podcastSchema = new mongoose.Schema({
    title: {
        type: String, 
        required: [true, 'Title is required'],
        trim: true,
        maxlength: [100, 'Title cannot be more than 100 characters'],
    },
    script: {
        type: String, 
        required: [true, 'Script is required']
    },
    audio:{
        type: String,   
    },
    createdAt: {
        type: Date, 
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

podcastSchema.pre('save', function(next) {
    this.updatedAt = new Date();
    next();
});

export default mongoose.model("Podcast", podcastSchema);
import express from "express";
import {generateScript, generateAudio, findAllPodcasts, findPodcastById, editScript} from "../controllers/podcastController.js";

const router = express.Router();

router.post("/generate-script/:topic", generateScript);
router.post("/generate-audio/:id", generateAudio);
router.get("/", findAllPodcasts);
router.get("/:id", findPodcastById);
router.put("/:id", editScript);

export default router;

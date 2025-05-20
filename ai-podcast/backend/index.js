import helmet from "helmet";
import cors from "cors";
import express from "express";
import podcastRoutes from "./routes/podcastRoutes.js";
import rateLimit from "express-rate-limit";
import connectDB from "./db/db.js";
import path from "path";

const app = express();

app.use(express.json());
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);
app.use(cors());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000,
  message: "Too many requests, please try again later",
});

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 1000,
  message: "Too many requests, please try again later",
});

app.use("/api/", limiter);
app.use("/api/podcasts/generate-script", apiLimiter);
app.use("/api/podcasts/generate-audio", apiLimiter);

app.use("/podcasts", express.static(path.resolve("podcasts")));

try {
  await connectDB();
} catch (err) {
  console.log(err);
  process.exit(1);
}

app.get("/", (req, res) => {
  res.send("AI Podcast API is running");
});

app.use("/api/podcasts", podcastRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

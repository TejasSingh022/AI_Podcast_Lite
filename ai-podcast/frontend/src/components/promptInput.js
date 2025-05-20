import React from "react";
import { useState } from "react";
import axios from "axios";

function PromptInput() {
  const [isAudio, setIsAudio] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [script, setScript] = useState("");
  const [prompt, setPrompt] = useState("");
  const [title, setTitle] = useState("Empty Title");
  const [audio, setAudio] = useState("");
  const [host1, setHost1] = useState("asteria");
  const [host2, setHost2] = useState("apollo");
  const hosts = ["Asteria", "Apollo", "Arcas", "Mark", "Rachel", "Cassidy"];
  const [podcastId, setPodcastId] = useState("");

  const generateScript = async (topic) => {
    try {
      setLoaded(true);
      const response = await axios.post(
        `http://localhost:5000/api/podcasts/generate-script/${topic}`
      );
      if (response.data.podcast) {
        setScript(response.data.podcast.script);
        setTitle(response.data.podcast.title);
        setPodcastId(response.data.podcast._id);
      }
    } catch (error) {
      console.error("Error generating podcast:", error);
    }
  };

  const generateAudio = async (host1, host2) => {
    const audio = document.querySelector("audio source");
    if (!podcastId) {
      console.log("Podcast ID is not set");
      return;
    }
    try {
      const audioFile = await axios.post(
        `http://localhost:5000/api/podcasts/generate-audio/${podcastId}`,
        {
          model1: host1,
          model2: host2,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (audioFile.data.podcast.audio) {
        console.log("Audio file generated");
        audio.src = `http://localhost:5000/podcasts/${audioFile.data.podcast.audio}`;
        audio.parentElement.load();
      }
    } catch (err) {
      console.log("Error generating audio: ", err);
    }
  };

  const scriptButton = () => {
    setIsAudio(false);
  };

  const audioButton = () => {
    setIsAudio(true);
  };

  return (
    <div className="flex justify-center items-center pt-20 p-4 max-w-full">
      <div className="flex flex-col items-center">
        <p className="font-medium text-6xl mt-10">Create Your AI Podcast</p>
        <p className="text-gray-600 m-7 text-2xl">
          Enter a topic or sentence, and our AI will generate a podcast script
          and audio
        </p>
        <textarea
          className="w-full max-w-4xl h-40 border border-gray-300 rounded-md text-gray-900 p-4 focus:outline-none focus:border-gray-500 focus:border-2"
          placeholder="Enter a topic or sentence for your podcast"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        ></textarea>
        <button
          type="submit"
          onClick={() => generateScript(prompt)}
          className="rounded-lg m-5 p-2 font-normal text-lg bg-black text-white w-full max-w-4xl hover:cursor-pointer"
        >
          Generate Script
        </button>

        {loaded && (
          <div className="flex flex-col items-center">
            <div className="flex w-4xl justify-around p-1 bg-gray-100 rounded-md">
              <button
                className={`w-full max-w-md rounded p-2  hover:cursor-pointer ${
                  isAudio ? "" : "bg-white"
                }`}
                onClick={scriptButton}
              >
                Script
              </button>
              <button
                className={`w-full max-w-md rounded p-2  hover:cursor-pointer ${
                  isAudio ? "bg-white" : ""
                }`}
                onClick={audioButton}
              >
                Audio
              </button>
            </div>

            {!isAudio && (
              <div className="rounded-md border border-gray-200 w-full max-w-4xl m-8">
                <div className="flex flex-col items-center">
                  <div className="flex">
                    <div className="text-2xl font-medium mt-4 pt-1">
                      Title:{" "}
                    </div>
                    <textarea
                      className="text-lg border border-zinc-700 rounded-sm inline-block mt-4 ml-4 p-1 h-10"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    ></textarea>
                  </div>

                  <div
                    id="script"
                    className="w-[90%] bg-zinc-900 text-white rounded-md m-8 p-5 whitespace-pre-wrap"
                  >
                    {script}
                  </div>
                  <button
                    onClick={setIsAudio}
                    className="bg-zinc-900 w-[90%] text-white rounded-md mb-5 p-2  hover:cursor-pointer"
                  >
                    Select Voice
                  </button>
                </div>
              </div>
            )}

            {isAudio && (
              <div className="rounded-md border border-gray-200 w-full max-w-3xl m-8">
                <div className="w-3xl flex flex-col items-center">
                  <p className="text-xl p-5 font-normal">Select Voice</p>
                  <div className="grid lg:grid-cols-2 pb-5 gap-10 md:grid-cols-1">
                    <div>
                      Host 1
                      <br />
                      <select
                        value={host1}
                        onChange={(e) => setHost1(e.target.value)}
                        className="w-xs border border-gray-300 rounded mt-2 p-2  hover:cursor-pointer"
                      >
                        {hosts.map((host, index) => (
                          <option key={index} value={host}>
                            {host.charAt(0).toUpperCase() + host.slice(1)}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      Host 2
                      <br />
                      <select
                        value={host2}
                        onChange={(e) => setHost2(e.target.value)}
                        className="w-xs border border-gray-300 rounded mt-2 p-2  hover:cursor-pointer"
                      >
                        {hosts.map((host, index) => (
                          <option key={index} value={host}>
                            {host.charAt(0).toUpperCase() + host.slice(1)}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <button
                    onClick={() => generateAudio(host1, host2)}
                    className="bg-zinc-900 w-[90%] text-white rounded-md mb-5 p-2  hover:cursor-pointer"
                  >
                    Generate Podcast
                  </button>

                  <audio controls className="w-[90%] mb-10">
                    <source
                      src="http://localhost:5000/podcasts/AFoodConversation.mp3"
                      type="audio/mpeg"
                    />
                    Your browser does not support the audio element.
                  </audio>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default PromptInput;

import React from 'react'
import { useState } from 'react';
import AI from '../podcasts/AI.mp3';

function PromptInput() {
    const [topic, setTopic] = useState('');
    const [loading, setLoading] = useState(false);
    const [showScript, setShowScript] = useState(false);
    const [showAudio, setShowAudio] = useState(false);
    const [generatedScript, setGeneratedScript] = useState('');

    const sampleScript = `Host A: Welcome back to TechForward, everyone! I'm Alex.

Host B: And I'm Sarah. Today, we're diving headfirst into the world of Artificial Intelligence – AI.  It's everywhere, isn't it, Alex? From our phones to self-driving cars.

Host A: Absolutely, Sarah.  It's fascinating how quickly AI has progressed.  Just a few years ago, many of the things we now take for granted, like voice assistants and sophisticated image recognition, were considered science fiction. Now they're commonplace.

Host B:  Exactly.  And the applications are constantly expanding. We're seeing AI used in healthcare to diagnose diseases earlier, in finance to detect fraud, and even in art and music creation.  The creative potential is amazing, but it also raises some ethical questions, doesn't it?   

Host A:  It certainly does.  Bias in algorithms is a major concern. If the data used to train AI is biased, the AI itself will reflect and amplify those biases.  We need to be mindful of that and ensure fairness and equity are prioritized in AI development.

Host B:  Another concern is the potential impact on the job market.  As AI automates more tasks,  we need to think about how we can reskill and upskill the workforce to adapt to these changes. It's not just about replacing jobs, but creating new opportunities.

Host A:  That's a critical point, Sarah.  We need to focus on collaboration between humans and AI.  AI can handle repetitive tasks, freeing up human workers to focus on more creative and strategic work.

Host B:  And ultimately,  responsible development and deployment are key. We need transparency, accountability, and ongoing dialogue about the implications of this powerful technology.  The future with AI is going to be shaped by the choices we make today.

Host A:  Precisely.  It's a complex and evolving landscape, but understanding the potential benefits and risks is crucial for navigating this exciting new era.

Host B:  That's all the time we have for today, folks. Thanks for tuning in to TechForward. Join us next time for another insightful discussion.`;

    const generatePodcast = async() => {
        if(!topic) return;

        setLoading(true);
        setShowScript(false);
        setShowAudio(false);
        
        // Simulate API call with timeout
        setTimeout(() => {
            setGeneratedScript(sampleScript);
            setShowScript(true);
            
            // Show audio player 1 second after script appears
            setTimeout(() => {
                setShowAudio(true);
                setLoading(false);
            }, 5000);
        }, 3000);
    }

    return (
        <div className="flex justify-center items-center pt-20 bg-gray-50 p-4">
            <div className="flex flex-col items-center max-w-4xl w-full bg-white rounded-xl shadow-lg p-8">
                <h1 className="text-5xl font-bold text-zinc-800 text-center mb-6">Create Your Podcast</h1>
                <p className="text-xl text-gray-600 text-center mb-8">Enter a topic or sentence, and our AI will generate a podcast script and audio</p>
                
                <textarea 
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder='Enter a topic or sentence for your podcast (e.g., "The future of AI")' 
                    className="w-full p-4 h-36 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 resize-none"
                />
                
                <button 
                    onClick={generatePodcast}
                    disabled={loading || !topic}
                    className={`w-full bg-zinc-800 mt-6 text-white p-4 rounded-lg font-medium hover:bg-zinc-700 transition-colors ${loading || !topic ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                    {loading ? "Generating..." : "Generate Podcast"}
                </button>
                
                {showScript && (
                    <div className="mt-10 w-full animate-fade-in">
                        <h2 className="text-2xl font-bold text-zinc-800 mb-4">Generated Script</h2>
                        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 max-h-96 overflow-y-auto whitespace-pre-line">
                            {generatedScript}
                        </div>
                    </div>
                )}
                
                {showAudio && (
                    <div className="mt-8 w-full animate-fade-in">
                        <h2 className="text-2xl font-bold text-zinc-800 mb-4">Generated Audio</h2>
                        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                            <audio controls className="w-full">
                                <source src={AI} type="audio/mpeg" />
                                Your browser does not support the audio element.
                            </audio>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default PromptInput;


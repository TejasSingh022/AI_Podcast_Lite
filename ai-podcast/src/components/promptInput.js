import React from 'react'
import { useState } from 'react';

function PromptInput() {
    const [isAudio, setIsAudio] = useState(false);
    const [host1, setHost1] = useState('asteria');
    const [host2, setHost2] = useState('apollo');
    const hosts = ['asteria', 'apollo', 'arcas', 'mark', 'rachel', 'cassidy'];

    const scriptButton = () =>{
        setIsAudio(false);
    }

    const audioButton = ()=>{
        setIsAudio(true);
    }

    return (
        <div className="flex justify-center items-center pt-20 p-4 max-w-full">
            <div className='flex flex-col items-center'>
                <p className='font-medium text-6xl mt-10'>Create Your AI Podcast</p>
                <p className='text-gray-600 m-7 text-2xl'>Enter a topic or sentence, and our AI will generate a podcast script and audio</p>
                <textarea 
                    className='w-full max-w-4xl h-40 border border-gray-300 rounded-md text-gray-900 p-4 focus:outline-none focus:border-gray-500 focus:border-2'
                    placeholder='Enter a topic or sentence for your podcast'></textarea>
                <button 
                    type='submit'
                    className='rounded-lg m-5 p-2 font-normal text-lg bg-black text-white w-full max-w-4xl hover:cursor-pointer'>
                        Generate Podcast</button>
                
                <div className='flex w-full max-w-4xl justify-around p-1 bg-gray-100 rounded-md'>
                    <button 
                        className={`w-full max-w-md rounded p-2  hover:cursor-pointer ${isAudio ? '':'bg-white'}`}
                        onClick={scriptButton}>Script</button>
                    <button 
                        className={`w-full max-w-md rounded p-2  hover:cursor-pointer ${isAudio ? 'bg-white':''}`}
                        onClick={audioButton}>Audio</button>
                </div>

                <div className='rounded-md border border-gray-200 w-full max-w-4xl m-8'>
                    {!isAudio &&
                    <div className='flex flex-col items-center'>
                    <div className='w-[90%] bg-zinc-900 text-white rounded-md m-8 p-5'>
                        # AI Podcast: 
                        <br/><br/>
                        ## Introduction
                        Hello and welcome to today's AI-generated podcast on a. I'm your host, an AI voice created to explore interesting topics with you.
                        <br/><br/>
                        ## Main Content
                        a is a fascinating subject that has captured the attention of many researchers and enthusiasts alike. Let's dive deeper into what makes this topic so compelling.
                        <br/><br/>
                        First, we should consider the historical context. The development of a has evolved significantly over the past decade, with major breakthroughs occurring in recent years.
                        <br/><br/>
                        Experts in the field suggest that the future implications of a could be far-reaching, affecting everything from daily life to global systems.
                        <br/><br/>
                        ## Conclusion
                        As we've explored today, a represents an exciting frontier with numerous possibilities. Thank you for listening to this AI-generated podcast. Until next time, stay curious!
                    </div>
                        <button onClick={setIsAudio} className='bg-zinc-900 w-[90%] text-white rounded-md mb-5 p-2  hover:cursor-pointer'>Select Voice</button>
                    </div>
                    }

                    {isAudio && 
                        <div>
                            <p className='text-xl p-5 font-normal'>Select Voice</p>
                            <div className='grid grid-cols-2 pl-5 pb-5'>
                                <div>
                                    Host 1
                                    <br/>
                                    <select 
                                        value={host1}
                                        onChange={(e)=> setHost1(e.target.value)} 
                                        className='w-full max-w-xs border border-gray-300 rounded mt-2 p-2  hover:cursor-pointer'>
                                    {hosts.map((host, index) => (
                                        <option key={index} value={host}>{host.charAt(0).toUpperCase() + host.slice(1)}</option>
                                    ))}
                                    </select>
                                </div>
                                <div>
                                    Host 2
                                    <br/>
                                    <select 
                                        value = {host2}
                                        onChange={(e)=> setHost2(e.target.value)} 
                                        className='w-full max-w-xs border border-gray-300 rounded mt-2 p-2  hover:cursor-pointer'>
                                    {hosts.map((host, index) => (
                                        <option key={index} value={host}>{host.charAt(0).toUpperCase() + host.slice(1)}</option>
                                    ))}
                                    </select>
                                </div>
                            </div>

                            <div id='audio-player' className='w-full max-w-4xl p-5'>
                                <audio controls className='w-[95%]'>
                                    <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" type="audio/mpeg"/>
                                    Your browser does not support the audio element.
                                </audio>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default PromptInput;


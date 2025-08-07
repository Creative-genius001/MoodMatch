'use client'
import React, { useRef, useState } from 'react';
import { SendHorizontal } from 'lucide-react';
import { useStore } from '../store/store';
import PromptCard from './PromptCard';
import Spinner from './Spinner';

export const AIGenerator = () => {

    const { generatePlaylist, gettingPrompt } = useStore();

    const [prompt, setPrompt] = useState("");
    const textareaRef = useRef(null);


  const handlePromptChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setPrompt(e.target.value);
  };

  const handleSendPrompt = () => {
    if (prompt.trim()) {
      generatePlaylist(prompt)
      setPrompt('');
    }
  };


  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleKeyDown = (e: any) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); 
      handleSendPrompt();
    }
  };

  const demoPrompt: string[] = [
    "I'm in a reflective mood and want chill, acoustic songs for a quiet night drive. Make it feel like Bon Iver meets Phoebe Bridgers",
    "I just got out of a breakup and need an emotional playlist to cry and heal to. Think sad pop or indie with strong lyrics. Include artists like Olivia Rodrigo and Mitski",
    "Give me gym motivation songs with a dark, intense vibe—something like Travis Scott or Kanye during his Yeezus era. Genre should be aggressive trap or industrial rap. I want high-energy tracks to push through my workout"
  ];



  return (

    <div className="flex flex-col justify-center items-center mt-[12rem] w-full pb-8">
      <h1 className="text-2xl md:text-3xl font-light text-center">What type of playlist would you like?</h1>
            <div className="flex flex-col md:flex-row w-full md:w-[80%] mx-auto justify-around gap-3 items-center mt-8 ">
              {demoPrompt.map((prompt, index) => (
                <PromptCard key={index} prompt={prompt} />
              ))}
            </div>
      <div className='w-full bg-[#253727] rounded-3xl md:w-[680px] mt-8 p-2 '>
      <div className="w-full relative max-w-4xl flex p-2 items-end bg-transparent border border-none rounded-3xl shadow-sm overflow-hidden transition-all duration-300 ease-in-out">    

      <textarea
          ref={textareaRef}
          value={prompt}
          onChange={handlePromptChange}
          onKeyDown={handleKeyDown}
          placeholder="Enter a prompt here..."
          className="flex-grow resize-none p-2 text-base outline-none bg-transparent overflow-y-auto max-h-40 [&::-webkit-scrollbar]:w-2
          [&::-webkit-scrollbar-track]:rounded-full
          [&::-webkit-scrollbar-track]:bg-gray-100
          [&::-webkit-scrollbar-thumb]:rounded-full
          [&::-webkit-scrollbar-thumb]:bg-gray-300
          dark:[&::-webkit-scrollbar-track]:bg-neutral-700
          dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
          rows={1}
          style={{ lineHeight: '1.5rem' }}
        />
        
        <button
          onClick={handleSendPrompt}
          disabled={!prompt.trim() || gettingPrompt}
          className={`flex items-center justify-center w-10 h-10 rounded-full transition-colors duration-200 ease-in-out
            ${prompt.trim() 
              ? 'bg-brightGreen text-white hover:bg-brightGreen' 
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }
          `}
          aria-label="Send prompt"
        >
          {gettingPrompt ? <Spinner /> : <SendHorizontal size={20} /> }
        </button>
      </div>
    </div>
    </div>
    
  )
}

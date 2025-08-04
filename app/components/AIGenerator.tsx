import React, { useEffect, useRef, useState } from 'react'
import { Textarea } from './ui/textarea'
import { genres, moods } from '../types/type';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from './ui/select';
import { Mic, Music, SendHorizontal, Wand2 } from 'lucide-react';
import { Validate } from '../types/validate';
import { useStore } from '../store/store';
import { Card } from './CardGradient';
import Dropdown from './Dropdown';

export const AIGenerator = () => {

    const { generatePlaylist, loading } = useStore();

    const [prompt, setPrompt] = useState("");
    const [mood, setMood] = useState("");
    const [genre, setGenre] = useState("");
    const [trackNum, setTrackNum] = useState("");
      const textareaRef = useRef(null);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = event.target.value;

      let numericValue: number;
      if (inputValue === '') {
        numericValue = NaN; 
      } else {
        numericValue = parseFloat(inputValue);
      }

      if (!isNaN(numericValue)) {
        if (numericValue > 30) {
          numericValue = 30;
        } else if (numericValue < 0) {
          numericValue = 10;
        }
        setTrackNum(numericValue.toString());
      } else if (inputValue === '') {
        setTrackNum("");
      } else {
        setTrackNum("");
      }
  };



  // This useEffect hook dynamically resizes the textarea height
  // to match the content's scroll height.
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'; // Reset height to recalculate
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [prompt]);

  // Handler for when the user types in the textarea.
  const handlePromptChange = (e) => {
    setPrompt(e.target.value);
  };

  // Handler for sending the prompt.
  const handleSendPrompt = () => {
    if (prompt.trim()) {
      console.log('Sending prompt:', prompt);
      // Here you would typically send the prompt to an API
      // and then clear the input.
      setPrompt('');
    }
  };

  // Handler for the Enter key.
  const handleKeyDown = (e) => {
    // Check for Enter key without Shift key to send the message.
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // Prevent a new line from being added
      handleSendPrompt();
    }
  };

  const handleGenerate = async () => {
    const isValid = Validate({prompt, mood, genre, trackNum})
    if (!isValid) {
        console.error("Empty fields or invalid input")
        return
    } 
    generatePlaylist(mood, genre, prompt, parseFloat(trackNum))
  };


  return (
    <div className='w-[400px]  bg-[#253727] rounded-3xl md:w-[680px] mt-8 p-4 '>
      <div className="w-full relative max-w-4xl flex items-end bg-transparent border border-none rounded-3xl shadow-sm overflow-hidden transition-all duration-300 ease-in-out">
        
        {/* The textarea is styled to grow and handle user input. */}
        <textarea
          ref={textareaRef}
          value={prompt}
          onChange={handlePromptChange}
          onKeyDown={handleKeyDown}
          placeholder="Enter a prompt here..."
          className="flex-grow resize-none p-2 text-base outline-none bg-transparent overflow-hidden max-h-40"
          rows={1}
          style={{ lineHeight: '1.5rem', maxHeight: '10rem' }}
        />
        {/* <div className='absolute bottom-0 left-0'>
          <Dropdown />
        </div> */}
        
        <button
          onClick={handleSendPrompt}
          disabled={!prompt.trim()}
          className={`flex items-center justify-center w-10 h-10 rounded-full transition-colors duration-200 ease-in-out
            ${prompt.trim() 
              ? 'bg-brightGreen text-white hover:bg-brightGreen' 
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }
          `}
          aria-label="Send prompt"
        >
          <SendHorizontal size={20} />
        </button>
      </div>
        {/* <div className='mt-6'>
          <label className="block text-sm font-medium text-foreground mb-3">
            Select a mood
          </label>
          <div className="grid grid-cols-3 gap-2">
            {moods.map((moodOption) => (
              <Button
                key={moodOption}
                onClick={() => setMood(moodOption)}
                className={`${mood === moodOption ? "bg-brightGreen text-dark50 hover:bg-brightGreen hover:shadow-glow-primary transition-all ease-out" : "bg-dark50 text-white"} text-sm`}
              >
                {moodOption}
              </Button>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Genre
            </label>
            <Select onValueChange={setGenre} >
                <SelectTrigger className="w-full py-5">
                    <SelectValue placeholder="Select a genre" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                    <SelectLabel>Genres</SelectLabel>
                    { genres.map(g => (
                        <SelectItem key={g} value={g}>{g}</SelectItem>
                    )) }
                    </SelectGroup>
                </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Number of tracks
            </label>
            <Input
                onChange={handleChange}
                type="number" 
                max="30"
                value={trackNum}
                className="bg-white border-border/50 py-5 focus:border-primary text-dark50"
            />
          </div>
        </div>

        <Button
          onClick={handleGenerate}
          disabled={!prompt || loading}
          variant="hero"
          size="lg"
          className="w-full text-lg py-6 z-10 mt-8"
        >
          {loading ? (
            <>
              <Music className="w-5 h-5 animate-spin" />
              Generating Your Perfect Playlist...
            </>
          ) : (
            <>
              <Wand2 className="w-5 h-5" />
              Generate AI Playlist
            </>
          )}
        </Button> */}
    </div>
    
  )
}

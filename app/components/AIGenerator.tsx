import React, { useState } from 'react'
import { Textarea } from './ui/textarea'
import { genres, moods } from '../types/type';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from './ui/select';
import { Music, Wand2 } from 'lucide-react';
import { Validate } from '../types/validate';
import { useStore } from '../store/store';
import { Card } from './CardGradient';

export const AIGenerator = () => {

    const { generatePlaylist, loading } = useStore();

    const [prompt, setPrompt] = useState("");
    const [mood, setMood] = useState("");
    const [genre, setGenre] = useState("");
    const [trackNum, setTrackNum] = useState("");

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

  const handleGenerate = async () => {
    const isValid = Validate({prompt, mood, genre, trackNum})
    if (!isValid) {
        console.error("Empty fields or invalid input")
        return
    } 
    generatePlaylist(mood, genre, prompt, parseFloat(trackNum))
  };


  return (
    <Card className='w-1/2 mx-auto mt-12 p-8'>
        <div className='text-center'>
            <h3 className='text-3xl font-bold text-white mb-2'>Playlist Generator</h3>
            <p className='text-muted'>Describe your mood and playlist vibes and let our AI create the perfect mix for you</p>
        </div>
        <div className='mt-6'>
            <div>
                <label className="block text-sm font-medium text-white mb-2">
                    Describe your ideal playlist
                </label>
                <Textarea
                    placeholder="I want upbeat electronic music for my morning workout..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="min-h-[100px] bg-transparent text-brightGreen border-border focus:border-brightGreen"
                />
            </div>
        </div>
        
        <div className='mt-6'>
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
        </Button>
    </Card>
    
  )
}

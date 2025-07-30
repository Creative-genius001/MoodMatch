import React, { useState } from 'react'
import { Textarea } from './ui/textarea'
import { genres, moods } from '../types/type';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from './ui/select';

export const AIGenerator = () => {

    const [prompt, setPrompt] = useState("");
    const [mood, setMood] = useState("");
    const [genre, setGenre] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);

  return (
    <div className='card-gradient w-1/2 mx-auto mt-12 p-8 rounded-xl border border-[#2e4635] shadow-elegant backdrop-blur-sm'>
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
                    className="min-h-[100px] bg-white border-border/50 focus:border-primary"
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
                className={`${mood === moodOption ? "btn-default" : "btn-outline"} text-sm bg-[#0b160e]`}
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
            <Select>
                <SelectTrigger className="w-full">
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
              type="number" 
              placeholder="20" 
              className="bg-white border-border/50 focus:border-primary"
            />
          </div>
        </div>
    </div>
  )
}

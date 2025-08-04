'use client'

import { useEffect } from "react";
import { AIGenerator } from "../components/AIGenerator";
import PromptCard from "../components/PromptCard";
import { useStore } from "../store/store";


export default function DashboardHomePage() {

  const { getTopData} = useStore();

  useEffect(()=> {
    getTopData()
  },[])

  const demoPrompts = [
  "I just want to unwind after a long day. Something mellow and atmospheric to help me focus while reading or studying",
  "Road trip with friends. We need a playlist full of upbeat, feel-good songs to sing along and vibe to while driving",
  "Looking for something emotional and deep. Songs that make you reflect and hit right in the feels"
];

  return (
    <main className="flex justify-center items-center text-white">
        <div className="flex flex-col justify-center items-center mt-[16rem] w-full">
            <h1 className="text-3xl font-light">What type of playlist would you like?</h1>
            <div className="flex w-[80%] mx-auto justify-around items-center mt-8 ">
              {demoPrompts.map((prompt, index) => (
                <PromptCard key={index} prompt={prompt} />
              ))}
            </div>
            <AIGenerator />
        </div>
    </main>
  );
}
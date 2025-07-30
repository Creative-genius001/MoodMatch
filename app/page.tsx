'use client'

import React from "react";
import { useStore } from "./store/store";
import ConnectSpotifyModal from "@/app/components/ConnectSpotifyModal";
import { useSearchParams } from "next/navigation";
import { requestAccessToken } from "@/api/spotify";
import Hero from "./components/Hero";
import { AIGenerator } from "./components/AIGenerator";


export default function Home() {

  const searchParams = useSearchParams()
  const { spotifyModalActive } = useStore();

  React.useEffect(()=>{ 
    const state = searchParams.get('state')
    const code = searchParams.get('code')
    if(state != null && code != null){
      requestAccessToken(code);
    }
    else{
      return;
    }

  })

 
  return (
    <div className="main-div pb-20">
        <div className="blobs blob1"></div>
        <div className="blobs blob2"></div>
        <div className="blobs blob3"></div>
        <div className="blobs blob4"></div>
        <div className="blobs blob5"></div>
      <Hero />
      <AIGenerator />
      {spotifyModalActive && <ConnectSpotifyModal /> }
    </div>
  );
}

'use client'

import React from "react";
import { useStore } from "./store/store";
import ConnectSpotifyModal from "@/app/components/ConnectSpotifyModal";
import { useSearchParams } from "next/navigation";
import { requestAccessToken } from "@/api/spotify";
import Hero from "./components/Hero";
import { AIGenerator } from "./components/AIGenerator";
import GeneratedPlaylist from "./components/GeneratedPlaylist";
import { getSessionStorage } from "./utils/getLocalStorage";
import { addToast } from "@heroui/toast";


export default function Home() {

  const searchParams = useSearchParams()
  const { spotifyModalActive,playlist } = useStore();

  React.useEffect(()=>{ 
    const state = searchParams.get('state')
    const code = searchParams.get('code')
    const error = searchParams.get('error')

    if (error != null) {
      addToast({
        title: "Failed",
        color: "warning",
        description: "You need to login to you spotify account!",
        variant: "flat"
      })
    }
    if(state != null && code != null){
      const stateCode = getSessionStorage('stateCode')
      if (stateCode == null) {
        return 
      }else if (stateCode != state) {
        return
      }else {
        requestAccessToken(code);
      }

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
      <section>
        <Hero />
      </section>
      <section>
        {playlist ? <GeneratedPlaylist /> : <AIGenerator />}
      </section>
      {spotifyModalActive && <ConnectSpotifyModal /> }
    </div>
  );
}

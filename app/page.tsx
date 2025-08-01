'use client'

import React from "react";
import { useStore } from "./store/store";
import { useSearchParams } from "next/navigation";
import { requestAccessToken } from "@/api/spotify";
import Hero from "./components/Hero";
import { AIGenerator } from "./components/AIGenerator";
import GeneratedPlaylist from "./components/GeneratedPlaylist";
import { toast } from "sonner";
import LoadingScreen from "./components/LoadingScreen";
import ConnectSpotifyAlert from "./components/ConnectSpotifyAlert";
import ListenInSpotifyAlert from "./components/ListenInSpotifyAlert";


export default function Home() {

  const searchParams = useSearchParams()
  const { listenOnSpotifyModal, spotifyModalActive,playlist, loading, setSpotifyModalActive } = useStore();

  React.useEffect(()=>{ 
    const state = searchParams.get('state')
    const code = searchParams.get('code')
    const error = searchParams.get('error')

    if (error != null) {
      toast("You need to login to you spotify account!")
    }
    if(state != null && code != null){
      const stateCode = sessionStorage.getItem('stateCode')
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
        {loading && <LoadingScreen />}
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
      {listenOnSpotifyModal && <ListenInSpotifyAlert />}
      {spotifyModalActive && <ConnectSpotifyAlert setSpotifyModalActive={setSpotifyModalActive} /> }
    </div>
  );
}

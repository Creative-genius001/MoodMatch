'use client'

import GeneratePlaylistPage from "@/components/GeneratePlaylistPage";
import React from "react";
import { useStore } from "./store/store";
import ConnectSpotifyModal from "@/components/ConnectSpotifyModal";
import { useSearchParams } from "next/navigation";
import { requestAccessToken } from "@/api/spotify";


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
    <div className="main-div">
      <GeneratePlaylistPage />
      {spotifyModalActive && <ConnectSpotifyModal /> }
    </div>
  );
}

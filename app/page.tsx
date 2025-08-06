'use client'

import React from "react";
import { useStore } from "./store/store";
import Hero from "./components/Hero";
import LoadingScreen from "./components/LoadingScreen";
import ConnectSpotifyAlert from "./components/ConnectSpotifyAlert";
import ListenInSpotifyAlert from "./components/ListenInSpotifyAlert";


export default function Home() {

  const { listenOnSpotifyModal, spotifyModalActive, loading, setSpotifyModalActive } = useStore();


 
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
      {listenOnSpotifyModal && <ListenInSpotifyAlert />}
      {spotifyModalActive && <ConnectSpotifyAlert setSpotifyModalActive={setSpotifyModalActive} /> }
    </div>
  );
}

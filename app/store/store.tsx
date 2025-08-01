'use client'

import { getSongRecommendation } from '@/api/moodmatch_ai';
import { addPlaylistToSpotify } from '@/api/spotify';
import getLocalStorage, { getSessionStorage } from '@/app/utils/getLocalStorage';
import { toast } from "sonner"
import React, { createContext, useContext, ReactNode } from 'react';


export type SongProp = {
  name: string,
  artist: string,
  spotifyURI: string
}

export type PlaylistProp = {
    playlistName: string,
    playlistDescription: string,
    genre: string,
    numberOfTracks: number,
    tags: Array<string>,
    generatedAt: string,
    songs: Array<SongProp>
}

type StoreContextValue = {
  loading: boolean;
  adding: boolean;
  spotifyModalActive: boolean;
  playlist: PlaylistProp | null;
  spotifyId: string | null;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setSpotifyModalActive: React.Dispatch<React.SetStateAction<boolean>>;
  setPlaylist: React.Dispatch<React.SetStateAction<PlaylistProp | null>>;
  generatePlaylist: (mood : string, genre: string, desc: string, trackNum: number) => void;
  addSongsToSpotifyPlaylist: () => Promise<boolean | undefined>;
  regeneratePlaylist: () => void;
}

const StoreContext = createContext<StoreContextValue | null>(null);


type StoreProviderProps = {
  children: ReactNode;
}

export const AppStoreProvider = ({ children }: StoreProviderProps) => {

    const [loading, setLoading] = React.useState<boolean>(false);
    const [adding, setAdding] = React.useState<boolean>(false);
    const [spotifyModalActive, setSpotifyModalActive] = React.useState<boolean>(false);
    const [spotifyId, setSpotifyId] = React.useState<string | null>(null);
    const [playlist, setPlaylist] = React.useState<PlaylistProp | null>(null);


    const regeneratePlaylist = async () => {

      const prompt = getSessionStorage('prompt')
      if (prompt == null) {
          throw ("user prompt not found!")
      }

      try {
        let playlist = await getSongRecommendation(prompt.mood, prompt.genre, prompt.desc, prompt.trackNum);
        
        playlist = {...playlist, generatedAt: new Date().toISOString()}
        sessionStorage.setItem("recommended-playlist", JSON.stringify(playlist));
        setPlaylist(playlist)
        setLoading(false) 

      } catch (err) {
        setLoading(false)
        toast("Failed to generate playlist. Try again!")
      }
    }

    const generatePlaylist = async (mood : string, genre: string, desc: string, trackNum: number) => {
      const promptJSON = {mood, genre, desc, trackNum}
      sessionStorage.setItem('prompt', JSON.stringify(promptJSON))
      setLoading(true)
      try {
        let playlist = await getSongRecommendation(mood, genre, desc, trackNum);
        
        playlist = {...playlist, generatedAt: new Date().toISOString()}
        sessionStorage.setItem("recommended-playlist", JSON.stringify(playlist));
        setPlaylist(playlist)
        setLoading(false) 

      } catch (err) {
        setLoading(false)
        toast("Failed to generate playlist. Try again!")
      }
    }


    const addSongsToSpotifyPlaylist = async() => {

      const local = getLocalStorage('access-data')
      if(!local) {
          setSpotifyModalActive(true)
          return
      }
      if (playlist === null) {
          console.error("Playlist not found. Null value")
          return false
      }

      try {
        setAdding(true)
        const snapshotID = await addPlaylistToSpotify(playlist.playlistName, playlist.playlistDescription, playlist.songs)
        setSpotifyId(snapshotID);
        setAdding(false)
        toast('Playlist added successfully. Enjoy Listening!')
        sessionStorage.removeItem("recommended-playlist");
        setPlaylist(null)
        return(true)
      } catch (err) {
          toast('Error creating playlist')
          return false
      }
      
    }
  
    return (
        <StoreContext.Provider value={{ loading, spotifyId, adding, spotifyModalActive, regeneratePlaylist, setSpotifyModalActive, setLoading, addSongsToSpotifyPlaylist, generatePlaylist, setPlaylist, playlist }}>
            {children}
        </StoreContext.Provider>
    );
};


export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};

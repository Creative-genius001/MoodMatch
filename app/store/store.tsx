'use client'

import { getSongRecommendation } from '@/api/moodmatch_ai';
import { addSongsToPlaylist, createPlaylist } from '@/api/spotify';
import { toast } from '@/app/hooks/use-toast';
import getLocalStorage, { getSessionStorage } from '@/app/utils/getLocalStorage';
import { addToast } from '@heroui/toast';
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
  setPlaylistName: React.Dispatch<React.SetStateAction<string | null>>;
  setPlaylistDescription: React.Dispatch<React.SetStateAction<string | null>>;
  setPlaylist: React.Dispatch<React.SetStateAction<PlaylistProp | null>>;
  generatePlaylist: (mood : string, genre: string, desc: string, trackNum: number) => void;
  createSpotifyPlaylist: () => void;
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
    const [goToSpotify, setGoToSpotify] = React.useState<boolean>(false);
    const [playlistName, setPlaylistName] = React.useState<string | null>(null);
    const [spotifyId, setSpotifyId] = React.useState<string | null>(null);
    const [playlistDescription, setPlaylistDescription] = React.useState<string | null>(null);
    const [playlist, setPlaylist] = React.useState<PlaylistProp | null>(null);


    const regeneratePlaylist = () => {
      const prompt = getSessionStorage('prompt')
      if (prompt == null) {
          throw new Error("user prompt not found!")
      }

      generatePlaylist(prompt.mood, prompt.genre, prompt.desc, prompt.trackNum)
    }

    const generatePlaylist = async (mood : string, genre: string, desc: string, trackNum: number) => {
      const promptJSON = {mood, genre, desc, trackNum}
      sessionStorage.setItem('prompt', JSON.stringify(promptJSON))
      setGoToSpotify(false)
      setLoading(true)
      try {
        let playlist = await getSongRecommendation(mood, genre, desc, trackNum);
        
        playlist = {...playlist, generatedAt: new Date().toISOString()}
        sessionStorage.setItem("recommended-playlist", JSON.stringify(playlist));
        setPlaylist(playlist)
        setLoading(false) 

      } catch (e) {
          console.error(e)
          setLoading(false)
          addToast({
            title: "Failed",
            color: "danger",
            variant: "flat",
            description: "Server is overloaded currently"
          })
      }
    }

    const createSpotifyPlaylist = async () => {
      
      const local = getLocalStorage('access-data')
      if(!local) {
          setSpotifyModalActive(true)
          return
      }
      else {        
        if(!playlist) return
        const playlistId = await createPlaylist(playlist.playlistName, playlist.playlistDescription);
        if(!playlistId) {
          toast({ description: 'Error adding playlist to spotify' })
          return null
        }
        else{
          return(playlistId)
        }
      }
    }

    const addSongsToSpotifyPlaylist = async() => {
      setAdding(true)
      const playlistId = await createSpotifyPlaylist()
      if(!playlistId || playlistId == "") {
        setAdding(false)
        return
      }
      const uris = playlist?.songs.map(song=>{ return song.spotifyURI}) as string[];
      const snapshot_id = await addSongsToPlaylist(playlistId, uris)
      if(snapshot_id == null){
         addToast({
            title: "Error",
            variant: "flat",
            color: "danger",
            description: "Error creating playlist",
            hideIcon: true
          })
          return
      }
      setSpotifyId(snapshot_id);
      setAdding(false)
       addToast({
            title: "Success",
            variant: "flat",
            color: "success",
            description: "Playlist added successfully. Enjoy Listening!",
            hideIcon: true
          })
      sessionStorage.removeItem("recommended-playlist");
      setPlaylist(null)
      setGoToSpotify(true)
      return(true)
    }
  
    return (
        <StoreContext.Provider value={{ loading, spotifyId, adding, spotifyModalActive, regeneratePlaylist, setSpotifyModalActive, setLoading, addSongsToSpotifyPlaylist, createSpotifyPlaylist, generatePlaylist, setPlaylistName, setPlaylistDescription, setPlaylist, playlist }}>
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

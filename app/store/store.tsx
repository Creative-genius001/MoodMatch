'use client'

import { getSongRecommendation } from '@/api/moodmatch_ai';
import { addPlaylistToSpotify, getUserTopArtists, getUserTopSongs } from '@/api/spotify';
import getLocalStorage, { getSessionStorage } from '@/app/utils/getLocalStorage';
import { toast } from "sonner"
import React, { createContext, useContext, ReactNode } from 'react';
import { IPlaylist, PlaylistProp } from '../types/type';
import { ITopArtist, ITopSong } from '@/api/spotify/types/types';
import { getAllPlaylist } from '../database/db';


type StoreContextValue = {
  loading: boolean;
  spotifyModalActive: boolean;
  playlist: PlaylistProp | null;
  topSongs: ITopSong[] | null;
  topArtists: ITopArtist[] | null;
  generatedPlaylist: IPlaylist[] | null;
  playlistLink: string;
  listenOnSpotifyModal: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setSpotifyModalActive: React.Dispatch<React.SetStateAction<boolean>>;
  setListenOnSpotifyModal: React.Dispatch<React.SetStateAction<boolean>>;
  setPlaylist: React.Dispatch<React.SetStateAction<PlaylistProp | null>>;
  generatePlaylist: (prompt: string) => void;
  addSongsToSpotifyPlaylist: () => Promise<boolean | undefined>;
  getTopData: () => void;
  regeneratePlaylist: () => void;
  closeGeneratedPlaylist: () => void;
}

const StoreContext = createContext<StoreContextValue | null>(null);


type StoreProviderProps = {
  children: ReactNode;
}

export const AppStoreProvider = ({ children }: StoreProviderProps) => {

    const [loading, setLoading] = React.useState<boolean>(false);
    const [spotifyModalActive, setSpotifyModalActive] = React.useState<boolean>(false);
    const [listenOnSpotifyModal, setListenOnSpotifyModal] = React.useState<boolean>(false);
    const [playlistLink, setPlaylistLink] = React.useState<string>("");
    const [playlist, setPlaylist] = React.useState<PlaylistProp | null>(null);
    const [generatedPlaylist, setGeneratedPlaylist] = React.useState<IPlaylist[] | null>(null);
    const [topSongs, setTopSongs] = React.useState<ITopSong[] | null>(null);
    const [topArtists, setTopArtists] = React.useState<ITopArtist[] | null>(null);



    const getTopData = async () => {

      const spotifyID = getLocalStorage('spotify-id')

      if (topSongs == null){    
        const resS = await getUserTopSongs();
        setTopSongs(resS)
      } 
      
      if (topArtists == null) {
        const resA = await getUserTopArtists();
        setTopArtists(resA)
      }
      
      if (generatedPlaylist == null){
        if(!spotifyID) {
          setSpotifyModalActive(true)
          return
        }

        const resP = await getAllPlaylist(spotifyID)
        setGeneratedPlaylist(resP)
        return
      } 
      else {
        return
      }
    }



    const regeneratePlaylist = async () => {

      const prompt = getSessionStorage('prompt')
      if (prompt == null) {
          throw ("user prompt not found!")
      }

      setTimeout(async ()=> {
        try {
          setLoading(true)
          let playlist = await getSongRecommendation(prompt);
          
          playlist = {...playlist, generatedAt: new Date().toISOString()}
          sessionStorage.setItem("recommended-playlist", JSON.stringify(playlist));
          setPlaylist(playlist)
          setLoading(false) 

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err) {
          setLoading(false)
          toast("Failed to generate playlist. Try again!")
        } finally {
          setLoading(false)
        }
      },2000)

    }

    const closeGeneratedPlaylist = () => {
      sessionStorage.removeItem("recommended-playlist");
      sessionStorage.removeItem("prompt");
      setPlaylist(null)
    }

    const generatePlaylist = async (prompt: string) => {

      sessionStorage.setItem('prompt', JSON.stringify(prompt))
      setLoading(true)
      try {
        let playlist = await getSongRecommendation(prompt);
        
        playlist = {...playlist, generatedAt: new Date().toISOString()}
        sessionStorage.setItem("recommended-playlist", JSON.stringify(playlist));
        setPlaylist(playlist)
        setLoading(false)

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setLoading(false)
        toast("Failed to generate playlist. Try again!")
      }finally {
          setLoading(false)
      }
    }


    const addSongsToSpotifyPlaylist = async() => {

      const local = getLocalStorage('access-data')
      if(!local) {
          setSpotifyModalActive(true)
          return
      }

      let spotifyID = getLocalStorage('spotify-id');
      spotifyID = spotifyID.replace(/^"|"$/g, "");
      if(!spotifyID) {
          setSpotifyModalActive(true)
          return
      }
      if (playlist === null) {
          console.error("Playlist not found. Null value")
          return false
      }

      try {
        setLoading(true)
        const { playlist_link } = await addPlaylistToSpotify(playlist, spotifyID)
        setPlaylistLink(playlist_link);
        setLoading(false)
        toast('Playlist added successfully. Enjoy Listening!')
        sessionStorage.removeItem("recommended-playlist");
        sessionStorage.removeItem("prompt");
        setPlaylist(null)
        setListenOnSpotifyModal(true)
        return(true)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
          setLoading(false)
          toast('Error creating playlist')
          return false
      }finally {
          setLoading(false)
      }
      
    }
  
    return (
        <StoreContext.Provider value={{ loading, generatedPlaylist, playlistLink, getTopData, topArtists,  topSongs, setListenOnSpotifyModal, listenOnSpotifyModal, spotifyModalActive,closeGeneratedPlaylist, regeneratePlaylist, setSpotifyModalActive, setLoading, addSongsToSpotifyPlaylist, generatePlaylist, setPlaylist, playlist }}>
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

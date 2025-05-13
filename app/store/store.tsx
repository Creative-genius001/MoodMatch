'use client'

import { getSongRecommendation } from '@/api/AI';
import { addSongsToPlaylist, createPlaylist } from '@/api/spotify';
import { toast } from '@/hooks/use-toast';
import getLocalStorage, { getSessionStorage } from '@/utils/getLocalStorage';
import React, { createContext, useContext, ReactNode } from 'react';


export type SongProp = {
  name: string,
  artist: string,
  spotifyURI: string
}

export type PlaylistProp = {
    playlistName: string,
    playlistDescription: string,
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
  getUserRecommendation: (playlistVibe: string, genre: string) => void;
  createSpotifyPlaylist: () => void;
  addSongsToSpotifyPlaylsit: () => Promise<boolean | undefined>;
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

    const getUserRecommendation = async (playlistVibes : string, genre: string) => {
      setGoToSpotify(false)
      setLoading(true)
      try {
        const playlist = await getSongRecommendation(playlistVibes, genre);
        if(!playlist){
          setLoading(false)
          return
        }
        setLoading(false)
        sessionStorage.setItem("recommended-playlist", JSON.stringify(playlist));
        setPlaylist(playlist)

      } catch (e) {
          setLoading(false)
          toast({ description: "Server is overloaded currently"})
      }
    }

    const createSpotifyPlaylist = async () => {
      const data = getSessionStorage('recommended-playlist')
      setPlaylist(data.playlist)
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

    const addSongsToSpotifyPlaylsit = async() => {
      setAdding(true)
      const playlistId = await createSpotifyPlaylist()
      if(!playlistId) {
        setAdding(false)
        return
      }
      const uris = playlist?.songs.map(song=>{ return song.spotifyURI}) as string[];
      const snapshot_id = await addSongsToPlaylist(playlistId, uris)
      if(snapshot_id == null){
         toast({
            description: "Error creating playlist",
          })
          return
      }
      setSpotifyId(snapshot_id);
      setAdding(false)
      toast({
            description: "You playlsit has been created and successfully added to spotify. Enjoy listening!",
      })
      sessionStorage.removeItem("recommended-playlist");
      setPlaylist(null)
      setGoToSpotify(true)
      return(true)
    }
  
    return (
        <StoreContext.Provider value={{ loading, spotifyId, adding, spotifyModalActive, setSpotifyModalActive, setLoading, addSongsToSpotifyPlaylsit, createSpotifyPlaylist, getUserRecommendation, setPlaylistName, setPlaylistDescription, setPlaylist, playlist }}>
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

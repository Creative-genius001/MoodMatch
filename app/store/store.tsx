'use client'

import { getSongRecommendation } from '@/api/AI';
import { addSongsToPlaylist, createPlaylist } from '@/api/spotify';
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
  playlist: Array<SongProp> | null;
  playlistName: string | null;
  playlistDescription: string | null;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setPlaylistName: React.Dispatch<React.SetStateAction<string | null>>;
  setPlaylistDescription: React.Dispatch<React.SetStateAction<string | null>>;
  setPlaylist: React.Dispatch<React.SetStateAction<Array<SongProp> | null>>;
  getUserRecommendation: (playlistVibe: string, genre: string) => void;
  createSpotifyPlaylist: () => void;
  addSongsToSpotifyPlaylsit: () => void;
}

const StoreContext = createContext<StoreContextValue | null>(null);


type StoreProviderProps = {
  children: ReactNode;
}

export const AppStoreProvider = ({ children }: StoreProviderProps) => {

    const [loading, setLoading] = React.useState<boolean>(false);
    const [playlistName, setPlaylistName] = React.useState<string | null>(null);
    const [playlistDescription, setPlaylistDescription] = React.useState<string | null>(null);
    const [playlist, setPlaylist] = React.useState<Array<SongProp> | null>(null);

    const getUserRecommendation = async (playlistVibes : string, genre: string) => {
      setLoading(true)
      try {
        const playlist = await getSongRecommendation(playlistVibes, genre);
        setLoading(false)
        setPlaylist(playlist.songs)
        setPlaylistName(playlist.playlistName)
        setPlaylistDescription(playlist.playlistDescription)

      } catch (error) {
          console.error('Could not fetch songs', error)
      }
    }

    const createSpotifyPlaylist = async () => {
      if(!playlistName || !playlistDescription ) return
      const spotifyId = await createPlaylist(playlistName, playlistDescription);
      if(!spotifyId) return;
      return(spotifyId)
    }

    const addSongsToSpotifyPlaylsit = async() => {
      const playlistId = await createSpotifyPlaylist()
      if(!playlistId) return;
      const uris = playlist?.map(song=>{ return song.spotifyURI}) as string[];
      const snapshot_id = await addSongsToPlaylist(playlistId, uris)
      return(snapshot_id)
    }
  
    return (
        <StoreContext.Provider value={{ loading, setLoading, addSongsToSpotifyPlaylsit, createSpotifyPlaylist, getUserRecommendation, setPlaylistName, setPlaylistDescription, setPlaylist, playlist, playlistName, playlistDescription }}>
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

'use client'

import React, { createContext, useContext, ReactNode } from 'react';


export type SongProp = {
  name: string,
  artist: string,
  spotifyId: string
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
  
    return (
        <StoreContext.Provider value={{ loading, setLoading, setPlaylistName, setPlaylistDescription, setPlaylist, playlist, playlistName, playlistDescription }}>
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

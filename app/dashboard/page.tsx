'use client'

import { AIGenerator } from "../components/AIGenerator";
import GeneratedPlaylist from "../components/GeneratedPlaylist";
import { useStore } from "../store/store";
import { useGetAllData } from "./hooks/useGetAllData";


export default function DashboardHomePage() {

  useGetAllData()
  const { listenOnSpotifyModal, spotifyModalActive,playlist, loading, setSpotifyModalActive } = useStore();

  return (
    <main className="flex justify-center items-center text-white">
      {playlist ? <GeneratedPlaylist /> : <AIGenerator />}
    </main>
  );
}
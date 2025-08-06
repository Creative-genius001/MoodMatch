'use client'

import { AIGenerator } from "../components/AIGenerator";
import GeneratedPlaylist from "../components/GeneratedPlaylist";
import { useStore } from "../store/store";
import { useGetAllData } from "./hooks/use-fetchData";


export default function DashboardHomePage() {

  useGetAllData()
  const { playlist } = useStore();

  return (
    <main className="flex justify-center items-center text-white px-4">
      {playlist ? <GeneratedPlaylist /> : <AIGenerator />}
    </main>
  );
}
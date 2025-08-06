'use client'

import { useStore } from "@/app/store/store";
import { useGetAllData } from "../hooks/use-fetchData";
import LoadingScreen from "@/app/components/LoadingScreen";
import ErrorScreen from "../components/ErrorScreen";
import Discover from "./components/Discover";
import AuthGuard from "@/app/components/AuthGuard";

const Page = () => {

  const { topSongs, topArtists, loading } = useStore();

  useGetAllData()

  return (
    <AuthGuard>
      <main className="px-4">
        {loading ? (
          <LoadingScreen />
        ) : topArtists && topSongs ? (
          <Discover topArtists={topArtists} topSongs={topSongs} />
        ) : (
          <ErrorScreen message="Data could not be loaded. Please check your internet connection and try again." />
        )}

      </main>
    </AuthGuard>
   
  )
}

export default Page
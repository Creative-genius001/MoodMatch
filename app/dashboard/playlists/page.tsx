'use client'

import LoadingScreen from "@/app/components/LoadingScreen";
import { useStore } from "@/app/store/store";
import PlaylistPage from "./components/PlaylistPage";
import ErrorScreen from "../components/ErrorScreen";
import { useGetAllData } from "../hooks/use-fetchData";
import AuthGuard from "@/app/components/AuthGuard";

const Page = () => {

  const { loading, generatedPlaylist } = useStore();
  useGetAllData()

  return (
    <AuthGuard>
      <main className="px-4">
        {loading ? (
          <LoadingScreen />
        ) : generatedPlaylist ? (
          <PlaylistPage playlists={generatedPlaylist} />
        ) : (
          <ErrorScreen message="Data could not be loaded. Please check your internet connection and try again." />
        )}

      </main>
    </AuthGuard>
  )
}

export default Page
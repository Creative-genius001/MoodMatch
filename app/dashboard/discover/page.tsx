'use client'

import ArtistCard from "@/app/components/ArtistCard";
import SongCard from "@/app/components/SongCard";
import { useStore } from "@/app/store/store";
import { useGetAllData } from "../hooks/useGetAllData";

const Page = () => {

  const { topSongs, topArtists } = useStore();

  useGetAllData()

  return (
    <main className='overflow-y-auto flex flex-col text-white'>
      <div>
        <h1 className="text-2xl font-bold">Your Top Songs</h1>
        <div className="grid grid-cols-6 gap-y-2 mt-3">
          {topSongs && topSongs.map(song=>(
            <SongCard key={song.uri} song={song} />
          ))}
        </div>
      </div>
      <div className="mt-12">
        <h1 className="text-2xl font-bold">Your Top Artists</h1>
        <div className="grid grid-cols-6 gap-y-2 mt-3">
          {topArtists && topArtists.map(artist=>(
            <ArtistCard key={artist.uri} artist={artist} />
          ))}
        </div>
      </div>
    </main>
  )
}

export default Page
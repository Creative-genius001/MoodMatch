import { ITopArtist, ITopSong } from '@/api/spotify/types/types';
import ArtistCard from '@/app/components/ArtistCard'
import SongCard from '@/app/components/SongCard'
import React from 'react'

const Discover = (props: {topArtists: ITopArtist[], topSongs: ITopSong[]}) => {
    const { topSongs, topArtists } = props;
    
  return (
     <main className='overflow-y-auto flex flex-col text-white pt-20 md:pt-0'>
      <div>
        <h1 className="text-xl md:text-2xl font-bold">Your Top Songs</h1>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-y-2 mt-3">
          {topSongs && topSongs.map(song=>(
            <SongCard key={song.uri} song={song} />
          ))}
        </div>
      </div>
      <div className="mt-12">
        <h1 className="text-xl md:text-2xl font-bold">Your Top Artists</h1>
        <div className="grid grid-cols-4 md:grid-cols-6 gap-y-2 mt-3">
          {topArtists && topArtists.map(artist=>(
            <ArtistCard key={artist.uri} artist={artist} />
          ))}
        </div>
      </div>
    </main> 
  )
}

export default Discover
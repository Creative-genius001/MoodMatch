// import React from 'react'
import { FolderHeart } from 'lucide-react';
import { Button } from './ui/button'
import moment from 'moment';
import { useStore } from '../store/store';
import { Card } from './CardGradient';
// import { ArrowLeft, Play } from 'lucide-react'
// import Link from 'next/link'

const GeneratedPlaylist = () => {

  const { playlist, regeneratePlaylist, addSongsToSpotifyPlaylist } = useStore();
  
  let formattedDate = playlist?.generatedAt
  formattedDate = moment(formattedDate).format('DD/MM/YYYY')

  return (
    <Card className='w-1/2 mx-auto mt-12 p-8'>
        <div className='text-center'>
            <h3 className='text-3xl font-bold text-white mb-2'>{playlist?.playlistName}</h3>
            <p className='text-muted'>{playlist?.playlistDescription}</p>
        </div>
        <div className="flex w-full items-center justify-center gap-2 text-sm opacity-75 mt-3">
                
                <span className=" text-white">
                  {playlist?.genre}
                </span>
                <span>•</span>
                <span>{playlist?.numberOfTracks} tracks</span>
                <span>•</span>
                <span>Created at {formattedDate}</span>
        </div>
        <div className='flex flex-col mt-6'>
            {playlist?.songs.map(track => (
                <span className='mb-2' key={track.spotifyURI}>{track.name} - {track.artist}</span>
            ))}
        </div>

        <div className="grid grid-cols-2 items-center gap-4 mt-6">
            <Button onClick={addSongsToSpotifyPlaylist} variant="hero" size="lg" className="font-semibold">
                <FolderHeart className='w-5 h-5' />
                Save to Spotify
            </Button>
            <Button onClick={regeneratePlaylist} variant="neon">
              Regenerate Playlist
            </Button>
        </div>

    </Card>
  )
}

export default GeneratedPlaylist
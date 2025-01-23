import React from 'react'
import GeneratePlaylistForm from '../Form/GeneratePlaylistForm'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { useStore } from '@/app/store/store'
import { Button } from '../ui/button'
import { FaSpotify } from "react-icons/fa";

const GeneratePlaylistPage = () => {

  const { playlist, playlistName, playlistDescription, addSongsToSpotifyPlaylsit } = useStore();

  return (
    <div className='flex flex-col w-[40%] mx-auto justify-center items-center '>
        <div className='text-sm text-dark50 bg-blue50 px-4 py-2 rounded-[2rem] mb-2'><span className='font-bold'>100,000</span> playlists generated so far</div>
        <div className='flex flex-col justify-center items-center'>
            <h1 className='font-bold text-[3rem] text-center leading-[1.1]'>Get Your Perfect Playlist Using AI</h1>
            <p className='mt-3 text-lg font-medium text-gray-800'>Curate the best playlist based on your current mood.</p>
        </div>
        <div className='mt-8 w-[90%]'>
            <GeneratePlaylistForm />
        </div>
        {(playlist != null) && (
          <div className='mt-8 w-[90%]'>
          <Card className='w-full pt-4 bg-[#ffffff77]'>
            <CardHeader>
              <CardTitle className='text-2xl'>{playlistName}</CardTitle>
              <CardDescription className='text-md leading-tight'> {playlistDescription}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className='flex flex-col justify-start'>
                {playlist.map((song, index) => {
                  return (
                    <span key={index}>{song.name} - {song.artist}</span>
                  )
                })}
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={()=> {
                console.log('clicked')
                addSongsToSpotifyPlaylsit()
                }}
                className="w-full text-[#1ECF5F] bg-black flex py-6">
                <FaSpotify />
                <span className='ml-3'>Add playlist to spotify</span>
              </Button>
            </CardFooter>
          </Card>
        </div>
        )}
    </div>
  )
}

export default  GeneratePlaylistPage

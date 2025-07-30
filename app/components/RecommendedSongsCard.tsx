import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { FaSpotify } from 'react-icons/fa'
import { Button } from './ui/button'
import { PlaylistProp, useStore } from '@/app/store/store'

type RecommendedSongsCardProp = {
    playlistData: PlaylistProp | null;
    connectToSpotify: ()=> void;
}

  

const RecommendedSongsCard = ( { playlistData }: RecommendedSongsCardProp ) => {

  const { adding, addSongsToSpotifyPlaylsit } = useStore();

  return (
    <>
      <div className='mt-8 w-[90%]'>
          <Card className='w-full pt-4 bg-[#ffffff77]'>
            <CardHeader>
              <CardTitle className='text-2xl'>{playlistData?.playlistName}</CardTitle>
              <CardDescription className='text-md leading-tight'> {playlistData?.playlistDescription}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className='flex flex-col justify-start'>
                {playlistData?.songs?.map((song, index) => {
                  return (
                    <span key={index}>{song.name} - {song.artist}</span>
                  )
                })}
              </div>
            </CardContent>
            <CardFooter>
              {adding ? <Button size='lg' className='w-full mt-4 py-6' disabled><div className='loader'></div> </Button> : (
                 <Button onClick={addSongsToSpotifyPlaylsit}
                className="w-full text-[#1ECF5F] bg-black flex py-6">
                <FaSpotify />
                <span className='ml-3'>Add playlist to spotify</span>
              </Button>
              )}
            </CardFooter>
          </Card>
        </div>
    </>
  )
}


export default RecommendedSongsCard
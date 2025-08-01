import React from 'react'
import { Button } from './ui/button'
import { CircleX, Headphones } from 'lucide-react'
import { spotifyAuth } from '@/api/spotify'
import { Card } from './CardGradient'

const ConnectSpotifyAlert = (prop: { setSpotifyModalActive: (arg0: boolean) => void }) => {
  return (
    <div onClick={() => prop.setSpotifyModalActive(false)}  className='h-full w-full fixed flex justify-center items-center top-0 left-0 bg-darkTransparent z-[100]'>
        <Card onClick={(e) => e.stopPropagation()} className='w-[90%] md:w-1/4 px-5 py-10'>
            <CircleX onClick={() => prop.setSpotifyModalActive(false)} className='absolute w-5 h-5 top-5 right-4 text-muted' />
            <h2 className='text-2xl font-bold mb-3'>Connect Spotify</h2>
            <p className='text-base text-muted'>MoodMatch needs to connect to your Spotify account. The connection is secure and we would never store your personal data</p>
            <Button onClick={()=> spotifyAuth()} variant="hero" size="lg" className="text-lg w-full mt-8 px-8 py-6">
                <Headphones className="w-6 h-6" />
                Connect Spotify
            </Button>
        </Card>
    </div>
  )
}

export default ConnectSpotifyAlert
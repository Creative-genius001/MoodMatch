import React from 'react'
import { Card } from './CardGradient'
import { CircleX, Headphones } from 'lucide-react'
import { Button } from './ui/button'
import Link from 'next/link'
import { useStore } from '../store/store'

const ListenInSpotifyAlert = () => {

const { playlistLink, setListenOnSpotifyModal } = useStore();
  
return (
   <div onClick={() => setListenOnSpotifyModal(false)}  className='h-full w-full fixed flex justify-center items-center top-0 left-0 bg-darkTransparent z-[100]'>
        <Card onClick={(e) => e.stopPropagation()} className='w-[90%] md:w-1/4 px-5 py-10 '>
            <CircleX onClick={() =>setListenOnSpotifyModal(false)} className='absolute w-5 h-5 top-5 right-4 text-muted cursor-pointer' />
            <h2 className='text-2xl font-bold mb-3'>Go To Spotify</h2>
            <p className='text-base text-muted'>Listen to your curated playlist on spotify now!</p>
            <Link href={playlistLink === "" || playlistLink == null ? "/" : playlistLink} target='_blank' >
                <Button variant="hero" size="lg" className="text-lg w-full mt-8 px-8 py-6">
                    <Headphones className="w-6 h-6" />
                    Listen in Spotify
                </Button>
            </Link>
        </Card>
    </div>
  )
}

export default ListenInSpotifyAlert
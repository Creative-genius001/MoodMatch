import React from 'react'
import { Card } from './ui/card'
import { useStore } from '@/app/store/store'
import { FaSpotify } from "react-icons/fa";
import { spotifyAuth } from '@/api/spotify';
import { Button } from './ui/button';
import { MdOutlineCancel } from "react-icons/md";

const ConnectSpotifyModal = () => {
    const { setSpotifyModalActive } = useStore();


    const ConnectToSpotify = () => {
        spotifyAuth()
    }

  return (
    <div className='fixed h-[100%] w-[100%] top-0 left-0 z-[1000] bg-[#2020209d] flex justify-center items-center'>
        <Card className='w-[300px] h-auto px-4 py-8 relative'>
            <MdOutlineCancel onClick={() =>{ 
                localStorage.removeItem("recommended-playlist");
                setSpotifyModalActive(false)}
                } 
                className='absolute right-4 top-4 text-[1.5rem] text-[#3c3c3c] cursor-pointer ' />
            <div className='flex flex-col justify-center items-center '>
                <FaSpotify className='text-[5rem] mb-4 text-[#1ECF5F]' />
                <h3 className='font-bold text-lg leading-[1.1rem] text-center mb-6'>MoodMatch wants to connect to your Spotify account</h3>
            </div>
            <div>
                <Button className='w-full' onClick={ConnectToSpotify}>Connect</Button>
            </div>
        </Card>
    </div>
  )
}

export default ConnectSpotifyModal
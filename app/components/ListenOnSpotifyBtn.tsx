import React from 'react'
import { Button } from './ui/button'
import { FaSpotify } from 'react-icons/fa'

const ListenOnSpotifyBtn = () => {
  return (
    <div className='mt-6'>
        <Button className='bg-white py-8 text-black w-full hover:bg-white hover:scale-105 transition-all duration-300 ease-in'> 
            <FaSpotify />
            <span className='text-base font-semibold ml-4 '>Listen on Spotify</span>
        </Button>
    </div>
  )
}

export default ListenOnSpotifyBtn
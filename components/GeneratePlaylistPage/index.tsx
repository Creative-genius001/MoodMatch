import React from 'react'
import GeneratePlaylistForm from '../Form/GeneratePlaylistForm'

const GeneratePlaylistPage = () => {
  return (
    <div className='flex flex-col w-[40%] mx-auto justify-center items-center '>
        <div className='text-sm text-dark50 bg-blue50 px-4 py-2 rounded-[2rem] mb-2'><span className='font-bold'>100,000</span> playlists generated so far</div>
        <div>
            <h1 className='font-bold text-[3rem] text-center leading-[1.27]'>Generate your New Mood Playlist using AI</h1>
        </div>
        <div className='mt-8 w-[90%]'>
            <GeneratePlaylistForm />
        </div>
    </div>
  )
}

export default  GeneratePlaylistPage

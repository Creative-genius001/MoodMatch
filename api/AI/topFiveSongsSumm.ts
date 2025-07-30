import React from 'react'
import GeneratePlaylistForm from '../Form/GeneratePlaylistForm'
import { PlaylistProp, useStore } from '@/app/store/store'
import RecommendedSongsCard from '../RecommendedSongsCard'
import getLocalStorage from '@/utils/getLocalStorage'
import ListenOnSpotifyBtn from '../ListenOnSpotifyBtn'


const TopFiveSongsSummary = () => {

  const { playlist, addSongsToSpotifyPlaylsit, spotifyId } = useStore();
  const [savedPlaylist, setSavedPlaylist] = React.useState<PlaylistProp| null>(null);

  React.useEffect(()=> {
    const storedPlaylist = getLocalStorage('recommended-playlist');
    setSavedPlaylist(storedPlaylist);
  },[])


  const handleAddToSpotify = async()=> {
        addSongsToSpotifyPlaylsit();
  }

  return (
    <div className='flex flex-col sm:w-full px-6 lg:px-0 lg:w-[40%] mx-auto justify-center items-center '>
        <div className='text-sm text-dark50 bg-blue50 px-4 py-2 rounded-[2rem] mb-2'><span className='font-bold'>100,000</span> playlists generated so far</div>
        <div className='flex flex-col justify-center items-center'>
            <h1 className='font-bold sm:text-[5rem] lg:text-[3rem] text-center leading-[1.1]'>Get Your Perfect Playlist Using AI</h1>
            <p className='mt-3 text-lg font-medium text-gray-800'>Curate the best playlist based on your current mood.</p>
        </div>
        <div className='mt-8 w-[90%]'>
            <GeneratePlaylistForm />
            {spotifyId && <ListenOnSpotifyBtn />}
        </div>
        {(playlist || savedPlaylist) && <RecommendedSongsCard playlistData={savedPlaylist ? savedPlaylist : playlist} connectToSpotify={handleAddToSpotify} />}
    </div>
  )
}

export default  TopFiveSongsSummary

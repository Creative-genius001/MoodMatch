import { FolderHeart, X } from 'lucide-react';
import { Button } from './ui/button'
import moment from 'moment';
import { useStore } from '../store/store';
import { Card } from './CardGradient';
import LoadingScreen from './LoadingScreen';


const GeneratedPlaylist = () => {

  const { playlist, regeneratePlaylist, addSongsToSpotifyPlaylist, closeGeneratedPlaylist, loading } = useStore();
  
  let formattedDate = playlist?.generatedAt
  formattedDate = moment(formattedDate).format('DD/MM/YYYY')

  return (
    <div className='pt-10 pb-8'>
    {loading && <LoadingScreen />}
      <Card className='w-[95%] md:w-1/2 mx-auto mt-12 py-8 px-4 md:p-8 '>
      <span onClick={()=> closeGeneratedPlaylist()} className='absolute top-5 right-4 text-muted flex items-center cursor-pointer'><p>Close</p> <X className='w-5 h-5 ' /></span>
        <div className='text-left'>
            <h3 className='text-2xl font-bold text-white mb-2'>{playlist?.title}</h3>
            <p className='text-muted'>{playlist?.description}</p>
        </div>
        <div className="flex w-full items-left justify-left gap-2 text-sm opacity-75 mt-3">
                
                <span className=" text-brightGreen">
                  {playlist?.genre}
                </span>
                <span>•</span>
                <span className='text-[#d7ae34]'>{playlist?.numberOfTracks} tracks</span>
                <span>•</span>
                <span className='text-[#d734c4]'>Created at {formattedDate}</span>
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
    </div>
  )
}

export default GeneratedPlaylist
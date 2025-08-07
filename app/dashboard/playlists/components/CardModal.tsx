import { Button } from "@/app/components/ui/button";
import { Card } from "@/app/components/ui/card";
import { IPlaylist } from "@/app/types/type";
import { FolderHeart } from "lucide-react";
import moment from "moment";
import Link from "next/link";

type CardModalProps = {
  playlist: IPlaylist;
  onClose: () => void;
};

const CardModal = ({ playlist, onClose }: CardModalProps) => {

    let formattedDate = playlist.generatedAt
    formattedDate = moment(formattedDate).format('DD/MM/YYYY')

  return (
    <div onClick={onClose} className="absolute top-0 left-0 z-[100] w-full min-h-screen flex justify-center items-center backdrop-blur-md px-4 ">
        <Card className="w-full md:w-[500px] h-[400px] bg-[#ffffff09] p-4 overflow-y-scroll [&::-webkit-scrollbar]:w-2
        [&::-webkit-scrollbar-track]:rounded-full
        [&::-webkit-scrollbar-track]:bg-gray-100
        [&::-webkit-scrollbar-thumb]:rounded-full
        [&::-webkit-scrollbar-thumb]:bg-gray-300
        dark:[&::-webkit-scrollbar-track]:bg-neutral-700
        dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
        <div className='text-left'>
            <h3 className='text-2xl font-bold text-white mb-2'>{playlist?.title}</h3>
            <p className='text-muted'>{playlist?.description}</p>
        </div>
        <div className="flex w-full items-left justify-left gap-2 text-sm opacity-75 mt-3 text-white">
                
                <span className=" text-brightGreen">
                  {playlist?.genre}
                </span>
                <span>•</span>
                <span className='text-[#d7ae34]'>{playlist?.numberOfTracks} tracks</span>
                <span>•</span>
                <span className='text-[#d734c4]'>Created at {formattedDate}</span>
        </div>
        <div className='flex flex-col mt-6 text-white'>
            {playlist.songs.map(track => (
                <span className='mb-2' key={track.uri}>{track.title} - {track.artist}</span>
            ))}
        </div>
        
        <Link href={playlist.href} target="_blank">
            <Button variant="hero" size="lg" className="font-semibold w-full mt-8">
                    <FolderHeart className='w-5 h-5' />
                    LIsten in Spotify
            </Button>
        </Link>
        </Card>
    </div>
  );
};

export default CardModal;

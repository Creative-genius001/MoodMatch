'use client'

import { Card } from "@/app/components/ui/card";
import { useStore } from "@/app/store/store";

const Page = () => {

  const { generatedPlaylist } = useStore();

  return (
    <main className='overflow-y-auto flex flex-col text-white'>
        <h1 className="text-2xl font-bold">Your Playlists</h1>
        <div className="mt-3">
            {generatedPlaylist && generatedPlaylist.map((playlist)=> (
                <Card key={playlist.snapshotId} className="w-[400px] h-[180px] bg-[#ffffff09] p-4 cursor-pointer">
                    <div>
                        <h2 className="text-2xl text-white font-semibold leading-tight truncate">{playlist.title}</h2>
                        <p className="text-muted mt-4">{playlist.description}</p>
                    </div>
                </Card>
            ))}
        </div>
    </main>
  )
}

export default Page
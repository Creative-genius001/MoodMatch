import { Card } from '@/app/components/CardGradient'
import { IPlaylist } from '@/app/types/type'
import React from 'react'

const PlaylistPage = (props: {playlists: IPlaylist[]}) => {
    const {playlists}= props;
  return (
    <main className='overflow-y-auto flex flex-col text-white pt-20 md:pt-0'>
        <h1 className="text-xl md:text-2xl font-bold mb-3">Your Playlists</h1>
        <div className="mt-3 flex flex-col md:flex-row gap-3">
            {playlists.map((playlist)=> (
                <Card key={playlist.snapshotId} className="w-full md:w-[400px] h-[100px] bg-[#ffffff09] p-4 cursor-pointer">
                    <div>
                        <h2 className="text-lg md:text-xl text-white font-semibold leading-tight truncate">{playlist.title}</h2>
                        <p className="text-muted mt-2 text-base truncate">{playlist.description}</p>
                    </div>
                </Card>
            ))}
        </div>
    </main>
  )
}

export default PlaylistPage
import React from 'react'
import { Card } from './ui/card'
import Image from 'next/image'
import { ITopSong } from '@/api/spotify/types/types'

const SongCard = (prop: {song: ITopSong}) => {
  const { name, artist, image  } = prop.song;
  return (
    <Card className='w-[120px] md:w-[190px] h-[200px] md:h-[250px] p-2 bg-transparent hover:bg-[#ffffff09] border-none'>
      <div>
        <Image
          src={image}
          width={300}
          height={500}
          alt={name} 
          className='rounded-xl'
        />
      </div>
      <div className='text-white mt-3'>
        <h3 className='truncate font-medium'>{name}</h3>
        <p className='truncate text-muted text-sm'>{artist}</p>
      </div>
    </Card>
  )
}

export default SongCard
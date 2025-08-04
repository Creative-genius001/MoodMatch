import { ITopArtist } from '@/api/spotify/types/types';
import React from 'react'
import { Card } from './ui/card';
import Image from 'next/image'

const ArtistCard = (prop: {artist: ITopArtist}) => {
  const { name , image  } = prop.artist;
  return (
    <Card className='w-[190px] h-[200px] p-3 bg-transparent hover:bg-[#ffffff09] border-none'>
      <div className='h-[130px] rounded-xl overflow-hidden  bg-center bg-cover'>
        <Image
          src={image}
          width={300}
          height={300}
          alt={name} 
          className='rounded-xl'
        />
      </div>
      <div className='text-white mt-3'>
        <h3 className='truncate font-medium'>{name}</h3>
      </div>
    </Card>
  )
}

export default ArtistCard
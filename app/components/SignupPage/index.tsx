'use client'

import { spotifyAuth } from '@/api/spotify';


const SignUp = () => {

return (
    <div>
        <button onClick={spotifyAuth} className='bg-blue-500 px-4 py-3'>Login to SPotify</button>
    </div>
  )
}

export default SignUp
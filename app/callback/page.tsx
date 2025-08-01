'use client'
import { Suspense } from 'react'
import Callback from '../components/Callback'

const Page = () => {

return (
    <div className="main-div pb-20">
        <div className='h-screen w-screen'>
          <Suspense>
            <Callback />
          </Suspense>
        </div>
    </div>
  )
}

export default Page
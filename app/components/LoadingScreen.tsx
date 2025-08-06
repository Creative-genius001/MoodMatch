import React from 'react'

const LoadingScreen = () => {
  return (
    <div className='h-screen w-full  flex justify-center items-center bg-darkTransparent z-[100]'>
        <div className="loader"></div>
    </div>
  )
}

export default LoadingScreen
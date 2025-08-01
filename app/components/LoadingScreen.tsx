import React from 'react'

const LoadingScreen = () => {
  return (
    <div className='h-full w-full fixed flex justify-center items-center top-0 left-0 bg-darkTransparent z-[100]'>
        <div className="loader"></div>
    </div>
  )
}

export default LoadingScreen
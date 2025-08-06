import React from 'react'

const ErrorScreen = (props: {message: string}) => {
  return (
    <div className='text-white w-full min-h-[90vh] flex justify-center items-center'>
        <div className='flex flex-col items-center justify-center'>
            <h1 className='text-4xl font-bold mb-2'>Whoops!!</h1>
            <p className='text-muted text-center'>{props.message}</p>
        </div>
    </div>
  )
}

export default ErrorScreen
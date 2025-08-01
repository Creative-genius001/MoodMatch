'use client'

const Footer = () => {
  return (
    <div className='flex flex-col md:flex-row w-full justify-center items-center py-6 bg-dark50 border border-t-2'>
      <p className='text-[0.8rem] md:text-sm text-white md:mr-12'> © {new Date().getFullYear()} MoodMatch. All rights reserved</p>
      <p className='text-[0.8rem] md:text-sm text-white mt-3 md:mt-0'>Powered by: <span className='font-bold'>MoodMatch AI</span></p>
    </div>
  )
}

export default Footer
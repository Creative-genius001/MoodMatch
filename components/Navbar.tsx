'use client'

import { SiGithub } from "react-icons/si";
import Link from "next/link"

export const Navbar = () => {
  return (
    <div className='w-full h-[90px] px-4 flex justify-around items-center '>
        <div className='logo'>
            <Link href='/'>
                <span className='text-2xl font-semibold cursor-pointer'>MoodMatch</span>
            </Link>
        </div>
        <div className='shadow-md w-auto px-4 h-12 flex items-center justify-center rounded-[1rem] cursor-pointer'>
            <SiGithub />
            <span className='ml-3 font-medium'>Star on GIthub</span>
        </div>
    </div>
  )
}

import { Github, Linkedin, Twitter, X } from 'lucide-react'
import React from 'react'

export const Footer = () => {
  return (
    <div className='flex items-center justify-center text-center text-white py-10 flex-col gap-6 border-t border-gray-800'>
        <h1>Let's Work Together</h1>
        <p className='lg:text-7xl text-2xl font-bold leading-3'>gabokekeemmanuel@gmail.com</p>

        <div className='flex gap-5 mt-8'>
            <a href=""></a><Linkedin className=' p-2 bg-gray-800 w-10 h-10 rounded-xl text-gray-400 hover:text-white transition-colors'/>
            <Twitter className=' p-2 bg-gray-800 w-10 h-10 rounded-xl text-gray-400 hover:text-white transition-colors'/>
            <Github className=' p-2 bg-gray-800 w-10 h-10 rounded-xl text-gray-400 hover:text-white transition-colors'/>
        </div>
    </div>
  )
}

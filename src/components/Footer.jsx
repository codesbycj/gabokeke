import { Github, Linkedin, Twitter } from 'lucide-react'
import React from 'react'

export const Footer = () => {
  return (
    <footer className='flex items-center justify-center text-center text-white py-8 sm:py-10 px-4 flex-col gap-4 sm:gap-6 border-t border-gray-800'>
        <h1 className='text-sm sm:text-base'>Let's Work Together</h1>
        <p className='text-lg sm:text-2xl md:text-4xl lg:text-7xl font-bold break-all sm:break-normal'>gabokekeemmanuel@gmail.com</p>

        <div className='flex gap-4 sm:gap-5 mt-4 sm:mt-8'>
            <a href="https://www.linkedin.com/in/emmanuel-gabokeke" target='_blank'><Linkedin className='p-2 bg-gray-800 w-10 h-10 sm:w-12 sm:h-12 rounded-xl text-gray-400 hover:text-white transition-colors'/></a>
            <a href="https://x.com/codesbycj" target='_blank'><Twitter className='p-2 bg-gray-800 w-10 h-10 sm:w-12 sm:h-12 rounded-xl text-gray-400 hover:text-white transition-colors'/></a>
            <a href="https://github.com/codesbycj" target='_blank'><Github className='p-2 bg-gray-800 w-10 h-10 sm:w-12 sm:h-12 rounded-xl text-gray-400 hover:text-white transition-colors'/></a>
        </div>
    </footer>
  )
}

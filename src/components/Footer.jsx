import React from 'react'

export const Footer = () => {
  return (
    <footer className='text-center text-gray-400 text-[11px] sm:text-sm md:text-base font-medium py-6 sm:py-8 px-4 border-t border-gray-800' role="contentinfo">
      <p>&copy; {new Date().getFullYear()} - Gabokeke Emmanuel, Software Developer & Engineer.</p>
    </footer>
  )
}

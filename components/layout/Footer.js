import React from 'react'
import Image from 'next/image'
import { LuTwitter, LuGithub, LuLinkedin } from 'react-icons/lu'

const Footer = () => {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  const versionAndFolder = process.env.NEXT_PUBLIC_VERSION_AND_FOLDER
  return (
    <footer className='rounded-lg shadow m-4'>
      <div className='w-full max-w-screen-xl mx-auto p-4 md:py-8'>
        <div className='sm:flex sm:items-center sm:justify-between'>
          <a 
            href='https://github.com/Abhigyan-Sh' 
            target='_blank' 
            rel='noopener noreferrer'
            className='flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse'
          >
            <Image 
              src={`https://res.cloudinary.com/${cloudName}/image/upload/${versionAndFolder}/sample_uxibnj.jpg`} 
              alt='Creators Pixelated-art Pic' 
              className='rounded-3xl'
              width={72} 
              height={72}
            />
            <span className='self-center text-2xl font-semibold whitespace-nowrap dark:text-white'>the Creator {' '}</span>
          </a>
          <ul className='flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400 gap-5'>
            <li>
              <a 
                href='https://twitter.com/pryansh_' 
                className='hover:underline me-4 md:me-6'><LuTwitter fontSize={32} /></a>
            </li>
            <li>
              <a 
                href='https://github.com/Abhigyan-Sh/' 
                className='hover:underline me-4 md:me-6'><LuGithub fontSize={32} /></a>
            </li>
            <li>
              <a 
                href='www.linkedin.com/in/abhigyan-shukla-057345252' 
                className='hover:underline me-4 md:me-6'><LuLinkedin fontSize={32} /></a>
            </li>
          </ul>
        </div>
        <hr className='mt-4 border-gray-200 sm:mx-auto dark:border-gray-700' />
      </div>
    </footer>
  )
}

export default Footer
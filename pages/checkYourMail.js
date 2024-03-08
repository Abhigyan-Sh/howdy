import React from 'react'

const CheckYourMail = () => {
  return (
    <div className='w-full h-screen flex flex-col justify-center items-center bg-black text-slate-200 divide-y tracking-wider'>
      <p className='text-lg mb-2'>
        we sent something in your mailbox &#x1F640;, verify your mail-id &#x26a1; 
      </p>
      <span className='text-xs'>you can close this page</span>
    </div>
  )
}

export default CheckYourMail
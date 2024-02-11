import React from 'react'
import Image from 'next/image'

const Avatar = ({ src, width, height, alt, className_ring, className_img }) => {
  return (
    <div className={`w-fit h-fit border-4 rounded-full border-slate-600 flex justify-center items-center ${className_ring}`}>
      <Image
        src={src} 
        width={width || 40} 
        height={height || 40} 
        className={`rounded-full ${className_img}`}
        // className={`bg-rose-400 w-${width || 8} h-${height || 8} rounded-full`}
        alt={alt || "your profile pic"}
      />
    </div>
  );
};

export default Avatar
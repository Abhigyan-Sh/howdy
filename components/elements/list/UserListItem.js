import React from 'react'
import Avatar from '../../ui/Avatar'

const UserListItem = ({ key_prop, user, onClick, className }) => {
  return (
    <button 
      key={key_prop} 
      onClick={onClick} 
      className={`w-full bg-zinc-200 flex flex-row justify-start items-center gap-3 p-2 rounded-lg my-2 cursor-pointer border-2 border-gray-200 hover:bg-gray-100 ${className}`}
    >
      {/* pic */}
      <Avatar 
        src={user.pic} 
        width={35} 
        height={35} 
        className_ring={"border-2"} />
      {/* username and email */}
      <div className='flex flex-col justify-center items-start'>
        <p className="font-bold text-gray-800 text-sm sm:text-base">
            {user.username}</p>
        <p className="text-xs sm:text-sm">
            <span className="font-bold text-gray-600">email: </span>{user.email}</p>
      </div>
    </button>
  )
}

export default UserListItem
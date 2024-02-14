import React from 'react'
import Avatar from './Avatar'

const UserListItem = ({ key_prop, user, onClick, w }) => {
  return (
    <button 
      key={key_prop} 
      onClick={onClick} 
      className={`bg-zinc-200 ${w ? w : "w-full"} flex flex-row justify-start items-center gap-3 p-2 rounded-lg my-2 cursor-pointer border-2 border-gray-200 hover:bg-gray-100`}
    >
      {/* pic */}
      <Avatar 
        src={user.pic} 
        width={35} 
        height={35} 
        className_ring={"border-2"} />
      {/* username and email */}
      <div className='flex flex-col justify-center items-start'>
        <p className="font-bold text-gray-800">
            {user.username}</p>
        <p className="">
            <span className="font-bold text-gray-600">email: </span>{user.email}</p>
      </div>
    </button>
  )
}

export default UserListItem
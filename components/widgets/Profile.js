import React from 'react'
import Avatar from '../ui/Avatar'

const Profile = ({ user, height, width, alt }) => {
  return (
    <>
      <h1 className="inline-block text-center text-3xl">
      {user.username}</h1>

      <Avatar
        src={user.pic} 
        width={width ? width : 150} 
        height={height ? height : 150} 
        alt={alt ? alt : "your profile pic"} 
      />

      <div>
        <p><span className='font-bold'>Email: </span>{user.email}</p>
      </div>
    </>
  )
}

export default Profile
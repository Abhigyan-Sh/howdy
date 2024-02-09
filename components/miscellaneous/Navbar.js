import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { Input } from '@mui/base/Input'
import SearchIcon from '@mui/icons-material/Search'
import Person3Icon from '@mui/icons-material/Person3'
import { Stack, Divider, Button, Menu, MenuItem } from '@mui/material'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive'
import Avatar from '../../components/Avatar'
import CustomSearch from '../CustomSearch'
import ProfileModal from '../ProfileModal'
import { chatState } from '../../context/ChatProvider'

const Navbar = () => {
  const router = useRouter()
  const { user, setUser } = chatState()
  /* -------dropdown------- */ 
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => 
    setAnchorEl(event.currentTarget)
  const handleClose = () => 
    setAnchorEl(null)
  
  /* -------modal------- */ 
  const [ isOpen, closeModal ] = useState(false)
  const handleModal = () => 
    closeModal(true)

  const logoutHandler = () => {
    localStorage.removeItem("userInfo")
    router.push('/')
  }
  return (
    <>
      <Stack 
        className='w-full h-14 px-6 bg-zinc-200' 
        direction="row" 
        justifyContent="space-between" 
        alignItems="center" 
        divider={<Divider orientation="horizontal" flexItem />} 
        spacing={2}
      >
        <div className='flex flex-row justify-between items-center w-6/12'>
          <CustomSearch 
            placeholder="Search for a friend.." 
            override={"font-bold text-neutral-800"} />
            
          <p className='text-xl font-bold text-gray-800'>howdy</p>
        </div>

        <div className='flex flex-row justify-between items-center gap-2'>
          {/* -------notifications------- */}
          notification bell
          {/* -------account button------- */}
          <Button
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
            <Person3Icon className='text-black' />
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={
              () => {
                handleClose()
                handleModal()
              }}>
                Profile
            </MenuItem>
            <MenuItem onClick={
              () => {
                handleClose()
                logoutHandler()
              }}>
                Logout
            </MenuItem>
          </Menu>
        </div>
      </Stack>
      {/* -------modal------- */}
      {isOpen && (
        <ProfileModal onClose={() => closeModal(false)}>
          {/* Profile name */}
          <h1 className="inline-block text-center text-3xl">
            {user.username}</h1>
          {/* Profile Photo */}
          <Avatar
            src={user.pic}
            width={150}
            height={150}
            alt="your profile pic" 
          />
          {/* Profile email */}
          <div>
            <p><span className='font-bold'>Email: </span>{user.email}</p>
          </div>
        </ProfileModal>
      )}
    </>
  )
}

export default Navbar
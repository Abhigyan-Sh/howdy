import React, { useState } from 'react'
import { useRouter } from 'next/router'
import SearchIcon from '@mui/icons-material/Search'
import Person3Icon from '@mui/icons-material/Person3'
import { Button, Menu, MenuItem } from '@mui/material'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive'
import { chatState } from '../../context/ChatProvider'
import { removeUserInfoAndRedirect } from '../../utils/removeUserInfoAndRedirect'
import SideDrawer from '../layout/SideDrawer'
import ProfileModal from '../widgets/Modal'
import Profile from '../widgets/Profile'
import UserSearchAndSelect from '../UserSearchAndSelect'

const Navbar = () => {
  const router = useRouter()
  const { user } = chatState()
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

  /* -------drawer------- */ 
  const [ isDrawerOpen, setIsDrawerOpen ] = useState(false)
  const [searchFocused, setSearchFocused ] = useState(false)
  const handleDrawer = () => {
    setSearchFocused(!searchFocused) // set or remove autoFocus from search Input when SideDrawer is opened
    setIsDrawerOpen(!isDrawerOpen)
  }
  return (
    <>
      <div className='w-full h-14 px-6 bg-zinc-200 flex flex-row justify-between items-center gap-2'>
        <div className='flex flex-row justify-between items-center w-6/12'>
          {/* Friend Search Button and Application Name */}
          <button 
            className='flex flex-row bg-rose-80 justify-between items-center p-2 gap-2 border border-gray-400 rounded-lg font-bold text-neutral-700'
            onClick={handleDrawer}>
              <SearchIcon />
              <p>Search for a friend..</p>
          </button>
          {/* Application Name */}
          <p className='text-xl font-bold text-gray-800'>howdy</p>
        </div>
        {/* Notification Bell and Profile Icon */}
        <div className='flex flex-row justify-between items-center gap-2'>
          {/* -------Notification Bell------- */}
          notification bell
          {/* -------Profile Icon------- */}
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
                removeUserInfoAndRedirect(router)
              }}>
                Logout
            </MenuItem>
          </Menu>
        </div>
      </div>
      {/* -------Modal------- */}
      {isOpen && (
        <ProfileModal 
          onClose={() => closeModal(false)} 
          modalOverlay={true} 
          w='w-4/12' 
          // h='h-3/6' 
        >
          <Profile user={user} />
        </ProfileModal>
      )}
      {/* -------SideDrawer------- */}
      <SideDrawer 
        isOpen={isDrawerOpen} 
        setIsOpen={handleDrawer} 
        header="Search for a friend.." 
      >
        <UserSearchAndSelect searchFocused={searchFocused} setIsOpen={handleDrawer} />
      </SideDrawer>
    </>
  )
}

export default Navbar
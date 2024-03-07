import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { IoMdPerson } from 'react-icons/io'
import { Button, Menu, MenuItem } from '@mui/material'
import { chatState } from '../../context/ChatProvider'
import { removeUserInfoAndRedirect } from '../../utils/removeUserInfoAndRedirect'
import ProfileModal from '../widgets/Modal'
import Profile from '../widgets/modal/Profile'

const NavBarItem = ({ title }) => (
  <li className={`mx-2 cursor-pointer flex flex-col justify-center items-center text-lg hover:text-gray-50`}>
    {title}
  </li>
)

const PaymentNavbar = () => {
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
  return (
    <>
      <div className='w-full flex flex-row justify-between items-center p-4'>
        {/* route to home page */}
        <div className='flex flex-row items-center justify-between text-white'>
          <Link href='/chats'>
            <img src='/logo.png' alt='logo' className='w-8 cursor-pointer' />
          </Link>
          <NavBarItem title='howdy' />
        </div>
        {/* middle header */}
        <ul className='text-white hidden md:flex'>
          {['Payments', '&', '\uD83E\uDD84', 'Wallets'].map((item, index) => (
            <NavBarItem key={item + index} title={item} />
          ))}
        </ul>
        <div className='flex flex-row justify-between items-center gap-2'>
          {/* -------Profile Icon------- */}
          <Button
            id='basic-button'
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup='true'
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
            <IoMdPerson className='text-white' fontSize={22} />
          </Button>
          <Menu
            id='basic-menu'
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
            <MenuItem onClick={
              () => {
                handleClose()
                router.push('/payments')
              }}>
                Payments
            </MenuItem>
          </Menu>
        </div>
      </div>
      {/* -------Modal------- */}
      {isOpen && (
        <ProfileModal 
          onClose={() => closeModal(false)} 
          modalOverlay={true} 
          w='w-11/12 h-3/6 md:w-8/12 md:h-4/6 lg:w-4/12 lg:h-3/6' 
        >
          <Profile user={user} />
        </ProfileModal>
      )}
    </>
  )
}

export default PaymentNavbar
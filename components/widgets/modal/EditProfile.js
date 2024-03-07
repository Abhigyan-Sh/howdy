import React, { useRef } from 'react'
import { RxUpdate } from 'react-icons/rx'
import { chatState } from '../../../context/ChatProvider'
import { useSnackbar } from '../../../context/SnackbarToast'
import { isValidEthereumAddress } from '../../../utils/transactions/isValidEthereumAddress'
import { Input } from '../../elements/Input'
import Button from '../../elements/Button'
import Avatar from '../../ui/Avatar'

const EditProfile = ({ user, height, width, alt }) => {
  const { setUser } = chatState()
  const { showSnackbar } = useSnackbar()
  const ethereumAddressRef = useRef(user.blockchain)

  console.log(user)
  const handleEthereumAddress = () => {
    const ethereum_address = ethereumAddressRef.current.value

    if(!isValidEthereumAddress(ethereum_address)) {
      showSnackbar({
        message: 'invalid ethereum address', 
        severity: 'warning', 
      })
      return
    }

    fetch('/api/payments/updateaddress', {
      method: 'POST',
      body: JSON.stringify({
        'userAddress' : ethereum_address
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        'Authorization': `Bearer ${user.token}`
      }
    })
    .then(response => response.json())
    .then(data => {
      if(data.statusCode && [400, 404, 405, 500].includes(data.statusCode)) {
        showSnackbar({
          message: data.error, 
          severity: 'error', 
        })
      } else if(data.statusCode === 200) {
        showSnackbar({
          message: data.message, 
          severity: 'success', 
        })
        user.address = ethereum_address
        setUser(user)
        localStorage.setItem('userInfo', JSON.stringify(user))
      }
    })
    .catch(error => {
      showSnackbar({
        message: `error occurred while parsing ${error.message}`, 
        severity: 'error', 
      })
      console.log(error)
    })
  }
  return (
    <>
      <h1 className='inline-block text-center text-3xl'>{user.username}</h1>

      <Avatar
        src={user.pic} 
        width={width ? width : 150} 
        height={height ? height : 150} 
        alt={alt ? alt : 'your profile pic'} />

      <div className='w-full flex flex-col items-center gap-2'>
        <p><span className='font-bold'>email: </span>{user.email}</p>
        <div className='w-full flex gap-1'>
          <Input 
            ref={ethereumAddressRef} 
            placeholder='0x1a2b3c...' 
            coverClass='w-full' />
          <Button 
            text='' 
            type='text' 
            className='h-full'
            onClick={handleEthereumAddress} 
            icon={RxUpdate}
            iconProps={{ size:20 }} />
        </div>
      </div>
    </>
  )
}

export default EditProfile
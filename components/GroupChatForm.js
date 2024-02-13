import React, { useState } from 'react'
import { chatState } from '../context/ChatProvider'
import { searchUser } from '../utils/searchUser'
import Input from '../components/InputField/Input'
import Button from '../components/Button'
import { setToastVisible }  from '../components/ui/SnackbarToast'
import UserListItem from './ui/UserListItem'
import UserBadgeItem from './ui/UserBadgeItem'
import SnackbarToast from './ui/SnackbarToast'
import ChatLoading from './ui/ChatLoading'

const GroupChatForm = () => {
  const { user } = chatState()
  const [ isLoading, setLoading ] = useState(false)
  const [typingTimeout, setTypingTimeout] = useState(0)
  // -------modal-------
  const [ search, setSearch ] = useState('')
  const [ searchResult, setSearchResult ] = useState([])
  const [ groupChatName, setGroupChatName ] = useState('')
  const [ selectedUsers, setSelectedUsers ] = useState([])
  // -------toast-------
  const [ message, setMessage ] = useState([])
  const [ severity, setSeverity ] = useState('')
  const [ isToastOpen, onToastClose ] = useState([])

  const handleToast = () => {
    onToastClose(false)
  }

  const handleSearch = (e) => {
    setLoading(true)
    setSearch(e.target.value)

    if (typingTimeout) {
      clearTimeout(typingTimeout)
    }
    setTypingTimeout(setTimeout(() => {
      searchUser({ 
        user, 
        search, 
        setMessage, 
        setSeverity, 
        onToastClose, 
        setSearchResult, 
        setLoading
      })
    }, 300)) // delay between last keypress and search performed using API (in milliseconds)
  }
  const handleGroup = (userToAdd) => {
    if(selectedUsers.includes(userToAdd)) {
      setToastVisible({
        _message: "User has been added already", 
        _severity: "warning", 
        setMessage: setMessage, 
        setSeverity: setSeverity, 
        onOpen: onToastClose
      })
      return
    }
    setSelectedUsers([...selectedUsers, userToAdd])
  }
//   console.log(search)
//   console.log(groupChatName)
//   console.log(searchResult)
//   console.log(isToastOpen)
  return (
    <>
      <div className='w-7/12 flex flex-col justify-center items-end'>
        <Input 
          id="groupName-id" 
          type="text" 
          placeholder="group Chat name" 
          value={groupChatName} 
          onChange={(e) => {setGroupChatName(e.target.value)}} />
        <Input 
          id="usernameOrEmail-id" 
          type="text" 
          icon={true} 
          value={search} 
          onChange={handleSearch} />
          
        {selectedUsers.slice(0, 5).map((selectedUser, index) => (
          <UserBadgeItem index={index} text={selectedUser.username} />
        ))}

        {isLoading ? (
          <ChatLoading count={4} />
        ) : (
          <div className="divide-y divide-dashed mt-6">
            {searchResult?.map((searchedUser, index) => (
              <UserListItem 
                key={searchedUser._id} 
                key_prop={searchedUser._id} 
                user={searchedUser} 
                handleClick={() => handleGroup(searchedUser)} />
            ))}
            {!searchResult.length && search && (
              <div className="w-full flex justify-center">
                <p>----no results----</p>
              </div>
            )}
          </div>
        )}
        <Button text='Create Chat' className='mt-2' onClick={() => {}} />
      </div>
      {/* -------toast------- */}
      <SnackbarToast
        // key={"key-00"} 
        message={message} 
        open={isToastOpen} 
        onClose={handleToast} 
        transition="SlideTransition" 
        delay={5000} 
        vertical="bottom" 
        horizontal="center" 
        severity={severity} 
        variant="filled"
        sx={{ width: '100%' }} 
        actionNumber={1} />
    </>
  )
}

export default GroupChatForm
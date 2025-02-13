import React, { useState } from 'react'
import ClimbingBoxLoader from 'react-spinners/ClimbingBoxLoader'
import { chatState, useSnackbar } from '@context/index'
import { searchUser } from '@utils/searchUser'
import { Input, Button, UserListItem } from '@components/elements'
import UserBadgeItem from '@components/ui/UserBadgeItem'
import ChatLoading from '@components/widgets/ChatLoading'

const GroupChatForm = ({ onClose }) => {
  const { showSnackbar } = useSnackbar()

  const { user, chats, setChats } = chatState()
  const [ isLoading, setLoading ] = useState(false)
  const [ isSpinner, setSpinner ] = useState(false)
  const [ typingTimeout, setTypingTimeout ] = useState(0)

  const numberOfBadgeItem = 9
  const numberOfUserItem = 4
  const cssOverride = {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
  
  // -------modal-------
  const [ search, setSearch ] = useState('')
  const [ searchResult, setSearchResult ] = useState([])
  const [ groupChatName, setGroupChatName ] = useState('')
  const [ selectedUsers, setSelectedUsers ] = useState([])

  const handleSearch = (e) => {
    setLoading(true)
    const newSearch = e.target.value
    setSearch(newSearch)

    if (typingTimeout) {
      clearTimeout(typingTimeout)
    }
    setTypingTimeout(setTimeout(() => {
      searchUser({ 
        user, 
        search : newSearch, 
        showSnackbar, 
        setSearchResult, 
        setLoading
      })
    }, 300)) // delay between last keypress and search performed using API (in milliseconds)
  }
  const handleGroup = (userToAdd) => {
    if(selectedUsers.includes(userToAdd)) {
      showSnackbar({
        message: "User has been added already", 
        severity: "warning", 
      })
      return
    }
    setSelectedUsers([userToAdd, ...selectedUsers])
  }
  const handleDelete = (userToDelete) => {
    setSelectedUsers(
      selectedUsers.filter(
        (selectedUser) => (selectedUser._id != userToDelete._id)
      ))
  }
  const createGroupChat = () => {
    if (!groupChatName || !selectedUsers) {
      showSnackbar({
        message: "Please provide all the Fields", 
        severity: "warning", 
      })
      return
    }
    setSearch('')
    setSearchResult([])
    setSpinner(true)
    
    return new Promise((resolve, reject) => {
      fetch('/api/chat/group', {
        method: 'POST',
        body: JSON.stringify({
          "name": groupChatName,
          "users": selectedUsers
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          'Authorization': `Bearer ${user.token}`
        }
      })
      .then(response => {
        if (!response.ok) {
          showSnackbar({
            message: `Error Occurred: ${response.statusText}`, 
            severity: "error", 
          })
          // throw new Error(`Failed to create group chat ${response.statusText}`)
        }
        return response.json()
      })
      .then(data => {
        setChats([data, ...chats])
        onClose()
        showSnackbar({
          message: "Created New Group Chat", 
          severity: "success", 
        })
        resolve(data)
      })
      .catch(error => {
        showSnackbar({
          message: `Error occurred while creating group chat: ${error.message}`, 
          severity: "error", 
        })
        reject(error)
      })
      .finally(() => {
        setSpinner(false)
      })
    })
  }
  return (
    <>
      <div className='flex flex-col justify-between items-center w-full h-full'>
        <div className='w-full h-full flex flex-col items-center'>
          <Input 
            id="groupName-id" 
            type="text" 
            placeholder="group Chat name" 
            coverClass="w-11/12 md:w-10/12 lg:w-8/12 mb-2" 
            value={groupChatName} 
            onChange={(e) => {setGroupChatName(e.target.value)}} />
          <Input 
            id="usernameOrEmail-id" 
            type="text" 
            icon={true} 
            coverClass="w-11/12 md:w-10/12 lg:w-8/12 mb-2" 
            value={search} 
            onChange={handleSearch} />

          <div className='w-full flex flex-row items-end flex-wrap p-2'>
            {selectedUsers.slice(0, numberOfBadgeItem).map((selectedUser, index) => (
              <UserBadgeItem 
                key={index + selectedUser?._id} 
                key_prop={index + selectedUser?._id}
                index={index} 
                text={selectedUser?.username} 
                onClick={() => handleDelete(selectedUser)} />
              ))}
            {(selectedUsers.length > numberOfBadgeItem) 
              && <p className='font-bold text-xs text-slate-700 mb-1'>...more</p>}
          </div>

          {isLoading ? (
            <div className='flex flex-col items-center h-full w-full'>
              <ChatLoading 
                count={numberOfUserItem} 
                diameter={'h-8 w-8'}
                w_upper={'w-14 sm:w-20'} 
                w_lower={'w-48 sm:w-64'} 
                margin_top={'mt-0'}
              />
            </div>
          ) : (
            <div className="divide-y divide-dashed flex flex-col items-center">
              {searchResult.slice(0, numberOfUserItem).map((searchedUser, index) => (
                <UserListItem 
                  key={searchedUser._id} 
                  key_prop={searchedUser._id} 
                  user={searchedUser} 
                  onClick={() => handleGroup(searchedUser)}
                  className='w-64 sm:w-80'
                />
              ))}
              {!searchResult.length && search && (
                <div className="w-full flex justify-center font-bold text-slate-700 mb-2">
                  <p>----no results----</p>
                </div>
              )}
            </div>
          )}
          
          <ClimbingBoxLoader 
            color='#0f172a' 
            loading={isSpinner} 
            cssOverride={cssOverride} 
            size={26} 
            speedMultiplier={1} 
            aria-label="Loading Spinner" />
        </div>
        <Button 
          text='Create Chat' 
          type='alternative' 
          className='mt-2' 
          onClick={() => createGroupChat()} />
      </div>
    </>
  )
}

export default GroupChatForm
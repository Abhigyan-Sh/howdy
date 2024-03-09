import React, { useState } from 'react'
import ClimbingBoxLoader from 'react-spinners/ClimbingBoxLoader'
import { chatState, useSnackbar } from '@context/index'
import { isAdmin } from '@utils/chatLogics/isAdmin'
import { searchUser } from '@utils/searchUser'
import { extractIds } from '@utils/mongoDB/extractIds'
import { Input, Button, UserListItem } from '@components/elements/index'
import UserBadgeItem from '@components/ui/UserBadgeItem'
import ChatLoading from '@components/widgets/ChatLoading'

const GroupChatInfo = ({ chatGroup, fetchAgain, setFetchAgain }) => {
  const numberOfBadgeItem = 9
  const numberOfUserItem = 3
  const cssOverride = {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }

  const { user } = chatState()
  const { showSnackbar } = useSnackbar()

  const [ isLoading, setLoading ] = useState(false) // Controls the display of skeleton UI to indicate loading user components
  const [ isSpinner, setSpinner ] = useState(false) // Controls the visibility of a spinner for API requests
  const [ typingTimeout, setTypingTimeout ] = useState(0)
  // -------group chat, search and selected users-------
  const [ groupChatName, setGroupChatName ] = useState(chatGroup?.chatName)
  const [ search, setSearch ] = useState("")
  const [ searchResults, setSearchResults ] = useState([])
  const [ selectedUsers, setSelectedUsers ] = useState(chatGroup?.users)

  // -------update groupChat name | search users | add Or remove users to/from group | leave group
  const handleDelete = (userToDelete) => {
    if(!isAdmin({ user, groupAdmin: chatGroup?.groupAdmin })) {
      showSnackbar({
        message: "Only Admin can remove other members", 
        severity: "info", 
      })
      return
    }
    setSelectedUsers(
      selectedUsers.filter(
        (chatMember) => (chatMember._id != userToDelete._id)
      ))
  }
  const updateGroupChatName = () => {
    if(!isAdmin({ user, groupAdmin: chatGroup?.groupAdmin })) {
      showSnackbar({
        message: "Only Admin can modify chat name", 
        severity: "info", 
      })
      return
    }
    if (!groupChatName || !selectedUsers) {
      showSnackbar({
        message: "Please provide all the Fields", 
        severity: "warning", 
      })
      return
    }
    setSearch('')
    setSearchResults([])
    setSpinner(true)
    
    return new Promise((resolve, reject) => {
      fetch('/api/chat/rename', {
        method: 'PUT',
        body: JSON.stringify({
          "chatId": chatGroup?._id, 
          "chatName": groupChatName
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          'Authorization': `Bearer ${user.token}`
        }
      })
      .then(response => response.json())
      .then(data => {
        if(data.statusCode === 400 || data.statusCode === 500) {
          showSnackbar({
            message: `Error ${data.statusCode}: ${data?.error}`, 
            severity: "error", 
          })
        } else if (data.statusCode === 200) {
          showSnackbar({
            message: data.data, 
            severity: "success", 
          })
        }
        setFetchAgain(!fetchAgain)
        resolve(data)
      })
      .catch(error => {
        showSnackbar({
          message: `Error occurred while updating group chat name: ${error.message}`, 
          severity: "error", 
        })
        reject(error)
      })
      .finally(() => {
        setSpinner(false)
      })
    })
  }
  const handleSearch = (e) => {
    if(!isAdmin({ user, groupAdmin: chatGroup?.groupAdmin })) {
      showSnackbar({
        message: "Only Admin can add other members", 
        severity: "info", 
      })
      return
    }
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
        setSearchResult: setSearchResults, 
        setLoading
      })
    }, 300)) // delay between last keypress and search performed using API (in milliseconds)
  }
  const updateUsers = (verifyForAdmin, updatedSelectedUsers) => {
    if(verifyForAdmin && !isAdmin({ user, groupAdmin: chatGroup?.groupAdmin })) {
      showSnackbar({
        message: "Only Admin can add other members", 
        severity: "info", 
      })
      return
    }
    setSearch('')
    setSearchResults([])
    setSpinner(true)
    
    return new Promise((resolve, reject) => {
      fetch('/api/chat/updatemembers', {
        method: 'PUT',
        body: JSON.stringify({
          "chatId": chatGroup?._id, 
          "userIds": updatedSelectedUsers ? extractIds(updatedSelectedUsers) : extractIds(selectedUsers)
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
            message: `Error ${data.statusCode}: ${data?.error}`, 
            severity: "error", 
          })
        } else if (data.statusCode === 200) {
          showSnackbar({
            message: data.message, 
            severity: "success", 
          })
        }
        setFetchAgain(!fetchAgain)
        resolve(data)
      })
      .catch(error => {
        showSnackbar({
          message: `Error occurred while updating users in group: ${error.message}`, 
          severity: "error", 
        })
        reject(error)
      })
      .finally(() => {
        setSpinner(false)
      })
    })
  }
  const handleGroup = (userToAdd) => {
    if(!isAdmin({ user, groupAdmin: chatGroup?.groupAdmin })) {
      showSnackbar({
        message: "Only Admin can add other members", 
        severity: "info", 
      })
      return
    }
    if(extractIds(selectedUsers).includes(userToAdd._id)) {
      showSnackbar({
        message: "User has been added already", 
        severity: "warning", 
      })
      return
    }
    setSelectedUsers([userToAdd, ...selectedUsers])
  }
  const leaveGroup = () => {
    /* @dev: as in React, state updates via useState() setters are asynchronously applied 
    only after the current function completes its execution and in cases where you expect its 
    updated state to be used within same function then you find that its not been updated yet and 
    that causes problem and so there are three possible workarounds to it:
      1) useEffect() , here it can't be used though
      2) pass in as parameter to the f(n) directly [using this one]
      3) use a callback inside setter function [didn't work]
        // setSelectedUsers(prevSelectedUsers => (
          // prevSelectedUsers.filter((chatMember) => (chatMember._id !== user._id))
        // )) */
    const updatedSelectedUsers = selectedUsers.filter((chatMember) => (chatMember._id !== user._id))
    setSelectedUsers(updatedSelectedUsers)
    updateUsers(false, updatedSelectedUsers)
    handleToast()
  }
  return (
    <>
      <div className='flex flex-col justify-start items-center w-full h-full'>
        <p className='text-xl md:text-2xl font-semibold mb-4'>{chatGroup?.chatName}</p>
        <div className='w-full flex flex-row items-end flex-wrap p-2 mb-4'>
          {selectedUsers.slice(0, numberOfBadgeItem).map((groupMember, index) => (
            <UserBadgeItem 
              key={index + groupMember?._id} 
              key_prop={index + groupMember?._id} 
              index={index} 
              text={groupMember?.username} 
              onClick={() => handleDelete(groupMember)} />
            ))}
          {(selectedUsers.length > numberOfBadgeItem) 
             && <p className='font-bold text-xs text-slate-700 mb-1'>...more</p>}
        </div>
  
        <div className='w-full px-2'>
          <div className='flex md:flex-row flex-col justify-between items-center w-full mb-2'>
            <Input 
              id="groupName-id" 
              type="text" 
              placeholder="modify Chat name" 
              coverClass="w-11/12 md:w-10/12 lg:w-8/12 mb-1 md:mb-0 mr-2" 
              // coverWidth="w-4/6" 
              value={groupChatName} 
              onChange={(e) => {setGroupChatName(e.target.value)}} />
            <Button 
              text="update" 
              onClick={updateGroupChatName} 
              className="w-2/6" />
          </div>
          <div className='flex md:flex-row flex-col justify-between items-center w-full mb-2'>
            <Input 
              id="usernameOrEmail-id" 
              type="text" 
              icon={true} 
              placeholder="add Another user to group" 
              coverClass="w-11/12 md:w-10/12 lg:w-8/12 mb-1 md:mb-0 mr-2" 
              // coverWidth="w-4/6" 
              value={search} 
              onChange={handleSearch} />
            <Button 
              text="update users" 
              onClick={() => updateUsers(true)} 
              type="success" 
              className="w-2/6" />
          </div>
        </div>
      </div>
      
      {isLoading ? (
        <div className='flex flex-col items-center'>
          <ChatLoading 
            count={numberOfUserItem} 
            diameter={'h-8 w-8'} 
            w_upper={'w-14 sm:w-20'} 
            w_lower={'w-48 sm:w-64'} 
            margin_top={'mt-0'} />
        </div>
      ) : (
        <div className="w-full divide-y divide-dashed flex flex-col items-center">
          {searchResults.slice(0, numberOfUserItem).map((searchedUser, index) => (
            <UserListItem 
              key={searchedUser._id} 
              key_prop={searchedUser._id} 
              user={searchedUser} 
              onClick={() => handleGroup(searchedUser)}
              className='w-64 sm:w-80' />
          ))}
          {!searchResults.length && search && (
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
        size={22} 
        speedMultiplier={1} 
        aria-label="Loading Spinner" />
        
      <Button text='Leave Group' type="danger" onClick={leaveGroup} />
    </>
  )
}

export default GroupChatInfo
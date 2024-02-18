import React, { useState } from 'react'
import ClimbingBoxLoader from 'react-spinners/ClimbingBoxLoader'
import { chatState } from '../../context/ChatProvider'
import { isAdmin } from '../../utils/isAdmin'
import { searchUser } from '../../utils/searchUser'
import { extractIds } from '../../utils/extractIds'
import Input from '../InputField/Input'
import Button from '../Button'
import UserBadgeItem from '../ui/UserBadgeItem'
import UserListItem from '../ui/UserListItem'
import ChatLoading from '../ui/ChatLoading'
import { setToastVisible }  from '../ui/SnackbarToast'
import SnackbarToast from '../ui/SnackbarToast'

const GroupChatInfo = ({ chatGroup, fetchAgain, setFetchAgain }) => {
  const numberOfBadgeItem = 9
  const numberOfUserItem = 4
  const cssOverride = {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
  const { user } = chatState()
  const [ isLoading, setLoading ] = useState(false) // Controls the display of skeleton UI to indicate loading user components
  const [ isSpinner, setSpinner ] = useState(false) // Controls the visibility of a spinner for API requests
  const [ typingTimeout, setTypingTimeout ] = useState(0)
  // -------group chat, search and selected users-------
  const [ groupChatName, setGroupChatName ] = useState(chatGroup?.chatName)
  const [ search, setSearch ] = useState("")
  const [ searchResults, setSearchResults ] = useState([])
  const [ selectedUsers, setSelectedUsers ] = useState(chatGroup?.users)
  // -------toast-------
  const [ message, setMessage ] = useState([])
  const [ severity, setSeverity ] = useState('')
  const [ isToastOpen, onToastClose ] = useState(false)
  
  const handleToast = () => {
    onToastClose(false)
  }

  // -------update groupChat name | search users | add Or remove users to/from group | leave group
  const handleDelete = (userToDelete) => {
    if(!isAdmin({ user, groupAdmin: chatGroup?.groupAdmin })) {
      setToastVisible({
        _message: "Only Admin can remove other members", 
        _severity: "info", 
        setMessage: setMessage, 
        setSeverity: setSeverity, 
        onOpen: onToastClose
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
      setToastVisible({
        _message: "Only Admin can modify chat name", 
        _severity: "info", 
        setMessage: setMessage, 
        setSeverity: setSeverity, 
        onOpen: onToastClose
      })
      return
    }
    if (!groupChatName || !selectedUsers) {
      setToastVisible({
        _message: "Please provide all the Fields", 
        _severity: "info", 
        setMessage: setMessage, 
        setSeverity: setSeverity, 
        onOpen: onToastClose
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
          setToastVisible({
            _message: `Error ${data.statusCode}: ${data?.error}`, 
            _severity: "error", 
            setMessage: setMessage, 
            setSeverity: setSeverity, 
            onOpen: onToastClose
          })
        } else if (data.statusCode === 200) {
          setToastVisible({
            _message: data.data, 
            _severity: "success", 
            setMessage: setMessage, 
            setSeverity: setSeverity, 
            onOpen: onToastClose
          })
        }
        setFetchAgain(!fetchAgain)
        resolve(data)
      })
      .catch(error => {
        setToastVisible({
          _message: `Error occurred while updating group chat name: ${error.message}`, 
          _severity: "error", 
          setMessage: setMessage, 
          setSeverity: setSeverity, 
          onOpen: onToastClose
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
      setToastVisible({
        _message: "Only Admin can add other members", 
        _severity: "info", 
        setMessage: setMessage, 
        setSeverity: setSeverity, 
        onOpen: onToastClose
      })
      return
    }
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
        setSearchResult: setSearchResults, 
        setLoading
      })
    }, 300)) // delay between last keypress and search performed using API (in milliseconds)
  }
  const updateUsers = (verifyForAdmin, updatedSelectedUsers) => {
    if(verifyForAdmin && !isAdmin({ user, groupAdmin: chatGroup?.groupAdmin })) {
      setToastVisible({
        _message: "Only Admin can add other members", 
        _severity: "info", 
        setMessage: setMessage, 
        setSeverity: setSeverity, 
        onOpen: onToastClose
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
          setToastVisible({
            _message: `Error ${data.statusCode}: ${data?.error}`, 
            _severity: "error", 
            setMessage: setMessage, 
            setSeverity: setSeverity, 
            onOpen: onToastClose
          })
        } else if (data.statusCode === 200) {
          setToastVisible({
            _message: data.message, 
            _severity: "success", 
            setMessage: setMessage, 
            setSeverity: setSeverity, 
            onOpen: onToastClose
          })
        }
        setFetchAgain(!fetchAgain)
        resolve(data)
      })
      .catch(error => {
        setToastVisible({
          _message: `Error occurred while updating users in group: ${error.message}`, 
          _severity: "error", 
          setMessage: setMessage, 
          setSeverity: setSeverity, 
          onOpen: onToastClose
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
      setToastVisible({
        _message: "Only Admin can add other members", 
        _severity: "info", 
        setMessage: setMessage, 
        setSeverity: setSeverity, 
        onOpen: onToastClose
      })
      return
    }
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
      <p className='text-2xl font-semibold'>{chatGroup?.chatName}</p>
      <div className='w-full flex flex-row items-end flex-wrap p-2'>
        {selectedUsers.slice(0, numberOfBadgeItem).map((groupMember, index) => (
          <UserBadgeItem 
            key={index + groupMember?._id} 
            index={index} 
            text={groupMember?.username} 
            onClick={() => handleDelete(groupMember)} />
          ))}
        {(selectedUsers.length > numberOfBadgeItem) 
           && <p className='font-bold text-xs text-slate-700 mb-1'>...more</p>}
      </div>

      <div className='w-full px-2'>
        <div className='flex flex-row justify-between items-center w-full'>
          <Input 
            id="groupName-id" 
            type="text" 
            placeholder="modify Chat name" 
            coverClass="w-4/6" 
            // coverWidth="w-4/6" 
            value={groupChatName} 
            onChange={(e) => {setGroupChatName(e.target.value)}} />
          <Button 
            text="update" 
            onClick={updateGroupChatName} 
            className="w-2/6" />
        </div>
        <div className='flex flex-row justify-between items-center w-full'>
          <Input 
            id="usernameOrEmail-id" 
            type="text" 
            icon={true} 
            placeholder="add Another user to group" 
            coverClass="w-4/6" 
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
      
      {isLoading ? (
        <div className='flex flex-col items-center'>
          <ChatLoading 
            count={numberOfUserItem} 
            diameter={'h-9 w-9'} 
            w_upper={'w-24'} 
            w_lower={'w-80'} 
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
              className='w-96' />
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

      {/* -------toast------- */}
      <SnackbarToast
        // key={"key-00"} 
        message={message} 
        open={isToastOpen} 
        onClose={handleToast} 
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

export default GroupChatInfo
import React, { useState } from 'react'
import { chatState } from '../../context/ChatProvider'
import { searchUser } from '../../utils/searchUser'
import SnackbarToast, { setToastVisible }  from '../widgets/SnackbarToast'
import UserListItem from '../elements/list/UserListItem'
import CustomSearch from '../elements/CustomSearch'
import ChatLoading from '../widgets/ChatLoading'

const UserSearchAndSelect = ({ searchFocused, setIsOpen }) => {
  /* -------search------- */
  const { user, chats, setChats, selectedChat, setSelectedChat } = chatState()
  const [ search, setSearch ] = useState('')
  const [ searchResult, setSearchResult ] = useState([])
  const [ isLoading, setLoading ] = useState(false)
  const [typingTimeout, setTypingTimeout] = useState(0)

  /* -------toast------- */
  const [ severity, setSeverity ] = useState('')
  const [ message, setMessage ] = useState('')
  const [ isToastOpen, onToastClose ] = useState(false)
  
  const handleToast = () => {
    onToastClose(false)
  }

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
        setMessage, 
        setSeverity, 
        onToastClose, 
        setSearchResult, 
        setLoading
      })
    }, 300)) // delay between last keypress and search performed using API (in milliseconds)
  }
  const handleChatClick = (userId) => {
    /* -------Access Chat------- */ 
    try {
      fetch('/api/chat/', {
        method: 'POST', 
        body: JSON.stringify({ userId }), 
        headers: {
          'Content-type': 'application/json; charset=UTF-8', 
          Authorization: `Bearer ${user.token}`
        }
      })
        .then(data => data.json())
        .then(response => {
          if(! chats?.find((chat) => {chat?._id === response?._id})) setChats([response, ...chats])
          setSelectedChat(response)
          setIsOpen() // close the SideDrawer
          setSearch('')
          setSearchResult([])
          setSeverity('') // reset toast prop
          setMessage('') // reset toast prop
        })
      } catch (err) {
        setToastVisible({
          _message: "Error Occurred ! " + err.message, 
          _severity: "error", 
          setMessage: setMessage, 
          setSeverity: setSeverity, 
          onOpen: onClose
        })
      }
  }
  return (
    <>
      <CustomSearch 
        placeholder="Search for a friend.." 
        noMargin={true} 
        inputClass={"font-bold text-neutral-800"} 
        autoFocus={searchFocused}
        value={search}
        onChange={handleSearch} />

        {isLoading ? (
          <ChatLoading count={4} />
        ) : (
          <div className="divide-y divide-dashed mt-6">
            {searchResult?.map((searchedUser, index) => (
              <UserListItem 
                key={searchedUser._id}
                key_prop={searchedUser._id} 
                user={searchedUser}
                onClick={() => handleChatClick(searchedUser._id)} />
            ))}
            {!searchResult.length && (
                <div className="w-full flex justify-center">
                <p>----no results----</p>
                </div>
            )}
          </div>
        )}
      {/* -------Toast------- */}
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

export default UserSearchAndSelect
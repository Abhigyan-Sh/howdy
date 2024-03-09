import React, { useState } from 'react'
import { chatState, useSnackbar } from '@context/index'
import { searchUser } from '@utils/searchUser'
import { UserListItem, CustomSearch } from '@components/elements/index'
import ChatLoading from '@components/widgets/ChatLoading'

const UserSearchAndSelect = ({ searchFocused, setIsOpen }) => {
  /* -------search------- */
  const { user, chats, setChats, setSelectedChat } = chatState()
  const { showSnackbar } = useSnackbar()

  const [ search, setSearch ] = useState('')
  const [ searchResult, setSearchResult ] = useState([])
  const [ isLoading, setLoading ] = useState(false)
  const [typingTimeout, setTypingTimeout] = useState(0)

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
        if(! chats?.find((chat) => (chat?._id === response?._id))) {
          setChats([response, ...chats])
        }
        setSelectedChat(response)
        setIsOpen() // close the SideDrawer
        setSearch('')
        setSearchResult([])
      })
    } catch (err) {
      showSnackbar({
        message: `Error Occurred ! ${err.message}`, 
        severity: "error", 
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
            {searchResult?.map((searchedUser, _) => (
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
    </>
  )
}

export default UserSearchAndSelect
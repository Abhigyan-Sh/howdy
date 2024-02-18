import React, { useState, useEffect, useRef } from 'react'
import ClimbingBoxLoader from 'react-spinners/ClimbingBoxLoader'
import { chatState } from '../../context/ChatProvider'
import { formatUpdatedAt } from '../../utils/formatUpdatedAt'
import { isSentByLoggedInUser, isConsecutiveSender } from '../../utils/chatLogics'
import { setToastVisible } from '../widgets/SnackbarToast'
import Message from '../ui/Message'

const ScrollableChat = ({ 
  fetchedMessages, 
  setFetchedMessages, 
  setToastMessage, 
  setSeverity, 
  onToastClose, 
  }) => {
    const cssOverride = {
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }
    const containerRef = useRef(null)
    const { user, selectedChat } = chatState()
    const [ isSpinner, setSpinner ] = useState(false)
  
    const fetchMesssages = async() => {
      setSpinner(true)
      return new Promise((resolve, reject) => {
        fetch(`/api/message/${selectedChat._id}`, {
          method: 'GET',
          headers: {
            'Content-type': 'application/json; charset=UTF-8'
          }
        })
        .then(response => response.json())
        .then(data => {
          if(data.statusCode && [400, 404, 405, 500].includes(data.statusCode)) {
            setToastVisible({
              _message: `Error ${data.statusCode}: ${data?.error}`, 
              _severity: "error", 
              setMessage: setToastMessage, 
              setSeverity: setSeverity, 
              onOpen: onToastClose
            })
          } else if (data.statusCode === 200) {
            setFetchedMessages(data.messages)
          }
          resolve(data)
        })
        .catch(error => {
          setToastVisible({
            _message: `Error occurred while updating users in group: ${error.message}`, 
            _severity: "error", 
            setMessage: setToastMessage, 
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
    useEffect(() => {
      fetchMesssages()
    }, [selectedChat])

    useEffect(() => {
      // scroll to the bottom of the container when the component mounts
      if (containerRef.current) {
        containerRef.current.scrollTop = containerRef.current.scrollHeight;
      }
    }, [fetchedMessages])
    
    return (
      <>
        <div ref={containerRef} className='w-full h-[35.5rem] p-2 overflow-y-auto'>
          {fetchedMessages?.map((message, index) => (
            <div className={`w-full flex flex-row items-center ${isSentByLoggedInUser(message, user) ? "justify-end" : "justify-start"} my-3`}>
              <Message 
                key={message._id + index}
                key_prop={message._id + index}
                src={message.sender.pic} 
                alt="sender's pic" 
                sender={message.sender.username} 
                time={formatUpdatedAt(message.updatedAt)} 
                content={message.content} 
                isConsecutiveSender={isConsecutiveSender(fetchedMessages, index)} 
                isSentByLoggedInUser={isSentByLoggedInUser(message, user)} />
            </div>
          ))}
          <ClimbingBoxLoader 
            color='#0f172a' 
            loading={isSpinner} 
            cssOverride={cssOverride} 
            size={26} 
            speedMultiplier={1} 
            aria-label="Loading Spinner" />
        </div>
      </>
    )
}

export default ScrollableChat
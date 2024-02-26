import React, { useEffect, useRef } from 'react'
import ClimbingBoxLoader from 'react-spinners/ClimbingBoxLoader'
import { chatState } from '../../context/ChatProvider'
import { isSentByLoggedInUser, isConsecutiveSender } from '../../utils/chatLogics'
import Message from '../ui/Message'

const ScrollableChat = ({ fetchedMessages, isSpinner }) => {
    const cssOverride = {
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }
    const containerRef = useRef(null)
    const { user } = chatState()
    
    useEffect(() => {
      // scroll to the bottom of the container when the component mounts
      if (containerRef.current) {
        containerRef.current.scrollTop = containerRef.current.scrollHeight;
      }
    }, [fetchedMessages])
    
    return (
      <div ref={containerRef} className='w-full h-[35.5rem] p-2 overflow-y-auto'>
        {fetchedMessages?.map((message, index) => (
          <div 
            key={message._id + index}
            className={`w-full flex flex-row items-center ${isSentByLoggedInUser(message, user) ? "justify-end" : "justify-start"} my-3`}>
              <Message 
                message={message}
                alt="sender's pic" 
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
    )
}

export default ScrollableChat
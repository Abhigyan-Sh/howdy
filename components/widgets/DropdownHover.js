import React, { useState, useRef, useEffect } from 'react'
import { chatState } from '@context/index'
import NotificationItem from '@components/elements/list/NotificationItem'

const DropdownHover = ({ children, items }) => {
  const { notification, setNotification, setSelectedChat } = chatState()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const handleCloseDropdown = (item) => {
    setNotification(
      notification.filter(
        (notify) => (notify._id !== item._id)
      )
    )
    setSelectedChat(item)
    setIsOpen(false)
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('click', handleClickOutside)

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
        onClick={handleToggleDropdown}
      >
        {children}
        <svg className="h-4 w-4 ml-2" viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M10 12l-6-6 1.5-1.5L10 9l4.5-4.5L16 6l-6 6z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {isOpen && (
        <div className="z-40 absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg">
          <ul className='divide-y divide-dashed'>
            {items.map((item, index) => (
              <li 
                key={index}
                className="py-2 px-4 text-gray-800 hover:bg-gray-200 cursor-pointer"
                onClick={() => {
                  handleCloseDropdown(item) // Close the dropdown when an item is clicked
                }}
              >
                {/* {console.log(item)} */}
                {/* @dev:: causing trouble */}
                <NotificationItem notify={item} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default DropdownHover
import React, { useState, useRef, useEffect } from 'react'
// import SearchIcon from '@mui/icons-material/Search'

const CustomSearch = ({ 
  placeholder, 
  noMargin, 
  inputClass, 
  autoFocus, 
  value, 
  onChange 
}) => {
  const [visibility, setVisibility] = useState(true)
  const inputRef = useRef(null) // Creating a reference to the input element

  useEffect(() => {
    // Check if autoFocus is true and inputRef.current is defined
    if (autoFocus && inputRef.current) {
      // Focus the input element
      inputRef.current.focus()
    }
  }, [autoFocus]) // Run this effect whenever autoFocus changes

  const handleInputFocus = () => setVisibility(false)
  const handleInputBlur = () => setVisibility(true)

  return (
    <div className={`relative my-4 ${noMargin && "my-0"}`}>
      {/* {visibility && <SearchIcon className='absolute top-3 left-3 text-gray-500' />} */}
      <input
        ref={inputRef} // Assigning the ref to the input element
        type="search" 
        value={value} 
        onChange={onChange} 
        // className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
        className={`block w-full px-4 py-3 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 ${inputClass}`}
        placeholder={placeholder} 
        onFocus={handleInputFocus} 
        onBlur={handleInputBlur}
      />
    </div>
  )
}

export default CustomSearch
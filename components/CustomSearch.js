import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';

const CustomSearch = ({placeholder, override}) => {
  const [ visibility, setVisibility ] = useState(true);
  const handleInputFocus = () => setVisibility(false);
  const handleInputBlur = () => setVisibility(true);
  return (
    <div className="relative">
      {visibility && <SearchIcon className='absolute top-3 left-3 text-gray-500'/>}
      <input 
        type="search" 
        // className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
        className={`block w-full px-4 py-3 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 ${override}`}
        placeholder={placeholder}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
      />
    </div>
  )
}

export default CustomSearch;
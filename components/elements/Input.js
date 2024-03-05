import React, { forwardRef } from 'react'
/* @dev:: structure for using forwardRef() hook 
const Input = ( {} ) => {}
const Input = forwardRef = ( ({}, ref) => { ...ref={ref}... } ) */

/* @dev:: id and {...register()} are required ⚠️ fields */

const Input = forwardRef(({ id, label, icon, coverClass, className, ...rest }, ref) => {
  return (
    <div className={`block ${coverClass}`}>
      {label && (
        <label 
          for={id} 
          className="block mb-2 text-sm font-medium text-gray-900">
          {/* className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> */}
          {label} </label>
      )}
      <div className="flex">
        {icon && (
          <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
            <svg 
              className="w-4 h-4 text-gray-500 dark:text-gray-400" 
              aria-hidden="true" 
              xmlns="http://www.w3.org/2000/svg" 
              fill="currentColor" 
              viewBox="0 0 20 20">
                <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
            </svg>
          </span>
        )}

        <input 
          id={id} 
          ref={ref} 
          className={`bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${!icon ? "rounded-lg" : "rounded-none rounded-e-lg"} ${className}`} 
          placeholder={
            rest?.placeholder 
            ? rest.placeholder
            : (rest?.type==="text" 
                ? "Jane Doe" 
                : rest?.type==="email" 
                && "janedoe@gmail.com" )
          }
          {...rest} />
      </div>
    </div>
  )
})

const InputPay = ({ placeholder, name, type, value, handleChange }) => (
  <input
    placeholder={placeholder}
    type={type}
    step="0.0001"
    value={value}
    onChange={(e) => handleChange(e, name)}
    className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
  />
)

export { Input, InputPay }
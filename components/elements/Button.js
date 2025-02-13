import React from 'react'

const Button = ({ text, type, className, onClick, icon: Icon, iconProps }) => {
  const buttonStyles = {
    default: "py-1.5 sm:py-2.5 px-2 sm:px-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800", 
    primary: "py-1.5 sm:py-2.5 px-2 sm:px-5 focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm  dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900", 
    secondary: "py-1.5 sm:py-2.5 px-2 sm:px-5 focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm  dark:focus:ring-yellow-900", 
    alternative: "py-1.5 sm:py-2.5 px-2 sm:px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700", 
    success: "py-1.5 sm:py-2.5 px-2 sm:px-5 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm  dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800", 
    danger: "py-1.5 sm:py-2.5 px-2 sm:px-5 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm  dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900", 
    dark: "py-1.5 sm:py-2.5 px-2 sm:px-5 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm  dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700", 
    light: "py-1.5 sm:py-2.5 px-2 sm:px-5 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm  dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700", 
  }
  const buttonStyle = buttonStyles[type] || buttonStyles.default

  return (
    <button 
      type='button' 
      className={`h-fit w-fit ${buttonStyle} ${className}`}
      onClick={onClick}>
        <div className={`flex flex-row items-center justify-between text-xs sm:text-sm ${text && Icon && "gap-2"}`}>
          <p> {text} </p> {Icon && <Icon {...iconProps} />}
        </div>
    </button>
  )
}

export default Button
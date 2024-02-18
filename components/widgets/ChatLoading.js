import React from 'react'

const ChatLoading = ({ count, diameter, w_upper, w_lower, margin_top }) => {
  return (
    <div 
      role="status" 
      className={`p-2 ${margin_top ? margin_top : 'mt-6'} space-y-4 divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-700 dark:border-gray-700`}
    >
      {[...Array(count)].map((_, index) => (
        <div key={index} className="flex items-center justify-start pt-6">
          <div className={`${diameter ? diameter: 'h-6 w-6'} bg-gray-300 rounded-full dark:bg-gray-600 mr-4`}></div>
          <div>
            <div className={`h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 ${w_upper ? w_upper : 'w-24'} mb-2.5`}></div>
            <div className={`${w_lower ? w_lower : 'w-32'} h-2 bg-gray-200 rounded-full dark:bg-gray-700`}></div>
          </div>
        </div>
      ))}
      <span className="sr-only">Loading...</span>
    </div>
  )
}

export default ChatLoading

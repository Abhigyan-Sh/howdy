

const Message = ({ src, alt, className, sender, time, content, isConsecutiveSender, isSentByLoggedInUser }) => (
  <div className="flex items-start gap-2.5">
    {(!isSentByLoggedInUser && !isConsecutiveSender) ? (
      <img 
        className="w-8 h-8 rounded-full" 
        src={src} 
        alt={alt} />
    ) : (
      <div className="w-12"></div>
    )}
    <div className="flex flex-col gap-1 w-full max-w-[320px]">
    {!isSentByLoggedInUser && !isConsecutiveSender && (
      <span className="text-sm font-semibold text-gray-900 dark:text-white">
          {sender}</span>
    )}
      <div className={`flex flex-col leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700 ${isSentByLoggedInUser && "bg-emerald-700 dark:bg-emerald-700"} ${className}`}>
        <p className="text-sm font-normal text-gray-900 dark:text-white"> 
          {content}</p>
      </div>
      <div className="flex items-center space-x-2 rtl:space-x-reverse text-xs">
        <span className="font-normal text-gray-500 dark:text-gray-400">
          Delivered</span>
        <span className="font-normal text-gray-500 dark:text-gray-400">
            {time}</span>
      </div>
    </div>

    <button 
      id="dropdownMenuIconButton" 
      className="inline-flex self-center items-center p-1 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-800 dark:focus:ring-gray-600" 
      type="button">
        <svg 
          className="w-2 h-2 text-gray-500 dark:text-gray-400" 
          aria-hidden="true" 
          xmlns="http://www.w3.org/2000/svg" 
          fill="currentColor" 
          viewBox="0 0 4 15"
        >
          <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"/>
        </svg>
    </button>
  </div>
)

export default Message
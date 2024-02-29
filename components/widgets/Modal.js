import React, { useEffect, useRef } from 'react'
import { IoMdClose } from 'react-icons/io'

// const Modal = (props) => {
const Modal = ({ children, onClose, header, modalOverlay, w, h, className, closeIcon = true }) => {
  const modalRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [onClose])
  return (
    <div className={`fixed inset-0 z-50 flex justify-center items-center ${modalOverlay && "bg-gray-900 bg-opacity-50"}`}>
      <div className={`${w} ${h} bg-white rounded-xl shadow-custom flex flex-col p-6 z-20`} ref={modalRef}>
          {/* Close button */}
          {closeIcon && (
          <div className="flex justify-end">
            <button 
              className="bg-transparent border-0 text-2xl pointer-cursor"
              onClick={onClose}
              >
                <IoMdClose /> 
            </button>
          </div>)}
          <div className={`relative flex flex-col justify-between items-center gap-5 w-full h-full ${className}`}>
            {header && <p className='text-2xl text-slate-900 font-bold'>
              {header} </p>}
            {children}
          </div>
      </div>
    </div>
  )
}

export default Modal
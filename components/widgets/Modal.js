import React, { useEffect, useRef } from 'react'
import CloseIcon from '@mui/icons-material/Close'

// const Modal = (props) => {
const Modal = ({children, onClose}) => {
  const modalRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);
  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-gray-900 bg-opacity-50">
      <div className="w-4/12 h-4/12 bg-white rounded-xl shadow-custom flex flex-col p-6 z-20" ref={modalRef}>
          {/* Close button */}
          <div className="flex justify-end">
              <button 
                className="bg-transparent border-0 text-2xl pointer-cursor"
                onClick={onClose}
                >
                  <CloseIcon /> 
              </button>
          </div>
          <div className='flex flex-col justify-between items-center gap-5'>
            {children}
          </div>
      </div>
    </div>
  );
};

export default Modal;
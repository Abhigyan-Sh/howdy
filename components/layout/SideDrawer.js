import React from 'react'
import { IoMdClose } from 'react-icons/io'

const SideDrawer = ({ children, isOpen, setIsOpen, header, className }) => {
  return (
    <main
      className={
        " fixed overflow-hidden z-10 bg-gray-900 bg-opacity-25 inset-0 transform ease-in-out " +
        (isOpen
          ? " transition-opacity opacity-100 duration-500 translate-x-0  "
          : " transition-all delay-500 opacity-0 translate-x-full  ")
      }
    >
      <section
        className={
          // " w-screen max-w-lg left-0 absolute bg-white h-full shadow-xl delay-400 duration-500 ease-in-out transition-all transform  " +
          " w-[90%] sm:w-7/12 md:w-4/12 lg:w-3/12 left-0 absolute bg-white h-full shadow-xl delay-400 duration-500 ease-in-out transition-all transform  " +
          (isOpen ? " translate-x-0 " : " -translate-x-96 ")
        }
      >
        {/* <article className="relative w-screen max-w-lg pb-10 flex flex-col space-y-6 overflow-y-scroll h-full"> */}
        <article className="relative w-full h-full p-6 gap-2 flex flex-col justify-start items-start divide-y-2 divide-dashed overflow-y-scroll">
          <div className="w-full flex justify-between items-center">
            <p className="w-full font-bold text-lg">{header}</p>
            <button 
              className="bg-transparent border-0 text-2xl pointer-cursor sm:hidden block"
              onClick={setIsOpen}
              >
                <IoMdClose /> 
            </button>
          </div>
          <div className={`w-full pt-6 overflow-y-auto scrollbar-hide ${className}`}>
            {children}
          </div>
        </article>
      </section>
      <section
        className=" w-screen h-full cursor-pointer "
        onClick={setIsOpen}
      ></section>
    </main>
  )
}

export default SideDrawer
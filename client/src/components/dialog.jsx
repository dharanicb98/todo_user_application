import React, { useEffect } from "react";
import { createPortal } from "react-dom";

function Dialog({  isOpen = false,  closeModal,  children,  createClick, title = '', height='',width=''}) {

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "inherit";
    }
    return () => {
      document.body.style.overflow = "inherit";
    };
  }, [isOpen]);


  if (!isOpen) return null;

  return createPortal(
    <div onClick={closeModal} className={`fixed p-4  z-[10px] top-0 left-0 h-full w-full flex items-center justify-center  bg-[#6B6B6B] bg-opacity-50 `}>
      <div  onClick={(e) => e.stopPropagation()} className={` !bg-[#ffffff] z-[20px] max-h-[calc(100vh-50px)]  relative w-[400px] py-6 px-2 rounded-lg shadow-lg ${height} ${width}`} >
       <div className="flex items-center justify-end"> 
       <div onClick={closeModal}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-8 h-8 cursor-pointer`}>
            <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
       </div>
        </div>
        <div className="overflow-y-auto h-full no-scrollbar dark-scrollbar ">
          <h1 className="text-center text-2xl mb-3  font-semibold ">
            { (createClick === 'CREATE' ? <span>Create </span> : createClick === 'UPDATE' ? <span>Update </span> : <span>Delete</span>)} {" "} 
            {title}
          </h1>
          {children}
        </div>
      </div>
    </div>,
    document.querySelector("#modal")
  );
}

export default Dialog;

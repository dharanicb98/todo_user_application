import React from "react";
import {useLocation, useNavigate} from 'react-router-dom';


const Header = () => {
  const navigate = useNavigate()

  const location = useLocation();
  const isActive = (path) => location.pathname === path;
  
  return (
    <header className="bg-white shadow-md h-[70px] w-[100%] z-[10] flex justify-between items-center px-[20px] fixed top-0 left-0 right-0 shadow-sm">
      <h1 onClick={() => navigate('/')} className="font-medium text-xl italic cursor-pointer">TargetGrid</h1>
      <div className="flex items-center gap-x-2">
        <span onClick={() => navigate('/')} className={`cursor-pointer ${isActive('/') ? 'font-bold' : ''}`}>Task 1</span>
        <span onClick={() => navigate('/task-2')} className={`cursor-pointer ${isActive('/task-2') ? 'font-bold' : ''}`}>Task 2</span>
      </div>
    </header>
  );
};

export default Header;

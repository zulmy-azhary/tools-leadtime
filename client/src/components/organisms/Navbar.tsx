import React from "react";
import { useLocation } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { BsFillBellFill } from "react-icons/bs";
import { Toggle } from "../atoms";

const Navbar: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname.split("").slice(1).join("");

  return (
    <header className="flex justify-between items-center">
      <div className="text-indigo-500 dark:text-teal-400">
        <div className="flex items-center gap-x-2 text-sm opacity-75">
          <AiOutlineHome className="text-lg" />
          <span>/</span>
          <span className="capitalize">{currentPath}</span>
        </div>
        <p className="capitalize text-lg tracking-wide mt-1 font-medium">{currentPath}</p>
      </div>
      <ul className="flex items-center gap-x-5">
        <Toggle />
        <div className="w-9 h-9 bg-cardLight dark:bg-cardDark border-[1px] border-indigo-500 dark:border-teal-400 rounded-full cursor-pointer"></div>
        <BsFillBellFill className="text-xl cursor-pointer text-indigo-500 dark:text-teal-400" />
      </ul>
    </header>
  );
};

export default Navbar;

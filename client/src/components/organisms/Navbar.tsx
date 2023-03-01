import React from "react";
import { useLocation } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { BsFillBellFill } from "react-icons/bs";
import { Toggle } from "../atoms";

const Navbar: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname.split("").slice(1).join("");

  return (
    <header className="flex items-center justify-between">
      <div className="text-indigo-500 dark:text-teal-400">
        <div className="flex items-center gap-x-2 text-sm opacity-75">
          <AiOutlineHome className="text-lg" />
          <span>/</span>
          <span className="capitalize">{currentPath}</span>
        </div>
        <p className="mt-1 text-lg font-medium capitalize tracking-wide">{currentPath}</p>
      </div>
      <ul className="flex items-center gap-x-5">
        <Toggle />
        <div className="bg-cardLight dark:bg-cardDark h-9 w-9 cursor-pointer rounded-full border-[1px] border-indigo-500 dark:border-teal-400"></div>
        <BsFillBellFill className="cursor-pointer text-xl text-indigo-500 dark:text-teal-400" />
      </ul>
    </header>
  );
};

export default Navbar;

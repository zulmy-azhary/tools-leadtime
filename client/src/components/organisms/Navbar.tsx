import React from "react";
import { useLocation } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { BsFillBellFill } from "react-icons/bs";
import { Toggle } from "../atoms";
import { useAuth } from "../../context";
import Avatar from "react-avatar";

const Navbar: React.FC = () => {
  const { user } = useAuth();
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
        <Avatar
          name={user?.fullName}
          className="!text-bgLight dark:!text-bgDark rounded-full !bg-indigo-500 dark:!bg-teal-400"
          size="35"
          maxInitials={2}
        />
        <BsFillBellFill className="cursor-pointer text-xl text-indigo-500 dark:text-teal-400" />
      </ul>
    </header>
  );
};

export default Navbar;

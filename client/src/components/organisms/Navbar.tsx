import React from "react";
import { useLocation } from "react-router-dom";
import { BsFillBellFill } from "react-icons/bs";
import { Avatar, Breadcrumb, Toggle } from "../atoms";
import { useAuth } from "../../context";

const Navbar: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname.split("/").slice(1);
  const { user } = useAuth();

  return (
    <nav className="flex items-center justify-between py-5">
      <div>
        <Breadcrumb paths={currentPath} />
      </div>
      <ul className="flex items-center gap-x-5">
        <Toggle />
        <Avatar
          name={user?.fullName}
          className="bg-blue-500 font-semibold text-white dark:bg-teal-400 dark:text-slate-900"
        />
        <BsFillBellFill className="cursor-pointer text-xl text-slate-600 dark:text-teal-400" />
      </ul>
    </nav>
  );
};

export default Navbar;

import React from "react";
import { useLocation } from "react-router-dom";
import { BsFillBellFill } from "react-icons/bs";
import { Avatar, Breadcrumb } from "../atoms";
import { useAuth } from "../../context";

const Navbar: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname.split("/").slice(1);
  const { user } = useAuth();

  return (
    <nav className="flex items-center justify-between py-5">
      <div className="text-slate-600">
        <Breadcrumb paths={currentPath} />
      </div>
      <ul className="flex items-center gap-x-5">
        <Avatar name={user?.fullName} className="bg-blue-500 font-semibold text-white" />
        <BsFillBellFill className="cursor-pointer text-xl text-slate-600" />
      </ul>
    </nav>
  );
};

export default Navbar;

import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context";
import { toast } from "react-hot-toast";
import { AiOutlinePoweroff } from "react-icons/ai";
import { SidebarList } from "../molecules";
import { TbPolygon } from "react-icons/tb";

const Sidebar: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const onLogout = () => {
    // Should create route from backend for logout
    logout();
    toast.success("You are logout.");
    navigate("/");
  };

  return (
    <div className="hidden h-full flex-col justify-between py-8 md:flex md:w-48 lg:w-52 xl:w-56 fixed top-0 left-6 lg:left-12 xl:left-16">
      <div className="flex flex-col gap-y-10">
        <div className="uppercase flex items-center gap-x-2 text-indigo-500 dark:text-teal-400 font-semibold lg:text-lg xl:text-xl self-center">
          <TbPolygon className="text-3xl xl:text-4xl" /> Tools Leadtime
        </div>
        <span className="w-full h-[1px] bg-gradient-to-r from-indigo-500/0 dark:from-teal-400/0 via-indigo-500 dark:via-teal-400"></span>
        <SidebarList />
      </div>
      <button
        className="text-bgLight dark:text-bgDark bg-indigo-500 dark:bg-teal-400 rounded-md shadow-sm text-start px-6 py-3 flex items-center gap-x-4 font-semibold"
        onClick={onLogout}
      >
        <div className="p-2 bg-bgLight dark:bg-bgDark rounded-md">
          <AiOutlinePoweroff className="text-lg text-indigo-500 dark:text-teal-400" />
        </div>
        Logout
      </button>
    </div>
  );
};

export default Sidebar;

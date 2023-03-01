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
    <div className="fixed top-0 left-6 hidden h-full flex-col justify-between py-8 md:flex md:w-48 lg:left-12 lg:w-52 xl:left-16 xl:w-56">
      <div className="flex flex-col gap-y-10">
        <div className="flex items-center gap-x-2 self-center font-semibold uppercase text-indigo-500 dark:text-teal-400 lg:text-lg xl:text-xl">
          <TbPolygon className="text-3xl xl:text-4xl" /> Tools Leadtime
        </div>
        <span className="h-[1px] w-full bg-gradient-to-r from-indigo-500/0 via-indigo-500 dark:from-teal-400/0 dark:via-teal-400"></span>
        <SidebarList />
      </div>
      <button
        className="text-bgLight dark:text-bgDark flex items-center gap-x-4 rounded-md bg-indigo-500 px-6 py-3 text-start font-semibold shadow-sm dark:bg-teal-400"
        onClick={onLogout}
      >
        <div className="bg-bgLight dark:bg-bgDark rounded-md p-2">
          <AiOutlinePoweroff className="text-lg text-indigo-500 dark:text-teal-400" />
        </div>
        Logout
      </button>
    </div>
  );
};

export default Sidebar;

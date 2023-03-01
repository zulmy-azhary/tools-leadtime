import React from "react";
import { NavLink } from "react-router-dom";
import { MdOutlineWindow } from "react-icons/md";
import { HiUsers } from "react-icons/hi";

const SidebarList: React.FC = () => {
  return (
    <ul className="flex flex-col gap-y-6 text-sm font-medium tracking-wide">
      {navLinks.map(({ to, title, icon: Icon }, idx) => (
        <NavLink
          key={idx}
          to={to}
          className={({ isActive }) =>
            isActive
              ? "bg-cardLight dark:bg-cardDark group rounded-md text-indigo-500 shadow-sm dark:text-teal-400"
              : undefined
          }
        >
          <div className="flex items-center gap-x-4 px-6 py-3 text-indigo-500 dark:text-teal-400">
            <div className="bg-cardLight dark:bg-cardDark group-visited:text-bgLight dark:group-visited:text-bgDark rounded-md p-2 group-visited:bg-indigo-500 dark:group-visited:bg-teal-400">
              <Icon className="text-lg" />
            </div>
            {title}
          </div>
        </NavLink>
      ))}
    </ul>
  );
};
const navLinks = [
  {
    to: "/dashboard",
    title: "Dashboard",
    icon: MdOutlineWindow
  },
  {
    to: "/karyawan",
    title: "Karyawan",
    icon: HiUsers
  }
];

export default SidebarList;

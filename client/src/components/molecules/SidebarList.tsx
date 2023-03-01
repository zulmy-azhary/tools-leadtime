import React from "react";
import { MdOutlineWindow } from "react-icons/md";
import { HiUsers } from "react-icons/hi";
import { NavLink } from "../atoms";

const SidebarList: React.FC = () => {
  return (
    <ul className="flex flex-col gap-y-6 text-sm font-medium tracking-wide">
      {navItems.map(({ to, icon, title }, idx) => (
        <NavLink key={idx} to={to} icon={icon}>
          {title}
        </NavLink>
      ))}
    </ul>
  );
};
const navItems = [
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

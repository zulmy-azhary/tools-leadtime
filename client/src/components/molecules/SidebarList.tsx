import React from "react";
import { IoGrid, IoPulse, IoCarSport, IoPeople, IoPerson } from "react-icons/Io5";
import { NavLink } from "../atoms";

const SidebarList: React.FC = () => {
  return (
    <>
      <ul className="flex flex-col gap-y-2 font-medium tracking-wide">
        <span className="mb-2 text-xs font-bold uppercase">menu</span>
        {navItem.menu.map(({ to, icon, title }, idx) => (
          <NavLink key={idx} to={to} icon={icon}>
            {title}
          </NavLink>
        ))}
      </ul>
      <ul className="flex flex-col gap-y-2 text-sm font-medium tracking-wide">
        <span className="mb-2 text-xs font-bold uppercase">data</span>
        {navItem.data.map(({ to, icon, title }, idx) => (
          <NavLink key={idx} to={to} icon={icon}>
            {title}
          </NavLink>
        ))}
      </ul>
    </>
  );
};
const navItem = {
  menu: [
    {
      to: "/dashboard",
      title: "Dashboard",
      icon: IoGrid
    },
    {
      to: "/flowproses",
      title: "Flow Proses",
      icon: IoPulse
    },
    {
      to: "/teamvendor",
      title: "Team Vendor",
      icon: IoPeople
    }
  ],
  data: [
    {
      to: "unit",
      title: "Unit",
      icon: IoCarSport
    },
    {
      to: "/karyawan",
      title: "Karyawan",
      icon: IoPerson
    }
  ]
};

export default SidebarList;

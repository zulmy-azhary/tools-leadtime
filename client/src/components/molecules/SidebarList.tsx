import React from "react";
import { IoGrid, IoPulse, IoCarSport, IoPeople, IoPerson } from "react-icons/io5";
import { NavLink } from "../atoms";

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
  onClosed: () => false | void;
}

const SidebarList: React.FC<Props> = props => {
  const { onClosed } = props;
  return (
    <>
      <ul className="flex flex-col gap-y-2 font-medium tracking-wide">
        <span className="mb-2 text-xs font-bold uppercase">menu</span>
        {navItem.menu.map(({ to, icon, title }, idx) => (
          <NavLink key={idx} to={to} icon={icon} onClick={onClosed}>
            {title}
          </NavLink>
        ))}
      </ul>
      <ul className="flex flex-col gap-y-2 font-medium tracking-wide">
        <span className="mb-2 text-xs font-bold uppercase">data</span>
        {navItem.data.map(({ to, icon, title }, idx) => (
          <NavLink key={idx} to={to} icon={icon} onClick={onClosed}>
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

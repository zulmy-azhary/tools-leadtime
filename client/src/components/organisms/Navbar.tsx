import React from "react";
import { useLocation } from "react-router-dom";
import { BsFillBellFill } from "react-icons/bs";
import { Avatar, Breadcrumb, Button, Toggle } from "../atoms";
import { useAuth } from "../../context";
import { useMediaQuery } from "../../hooks";
import { IoMenu } from "react-icons/io5";

interface Props {
  sidebarToggle?: () => void;
}

const Navbar: React.FC<Props> = props => {
  const { sidebarToggle } = props;
  const location = useLocation();
  const isNotebook = useMediaQuery("(max-width: 1024px)");
  const currentPath = location.pathname.split("/").slice(1);
  const { user } = useAuth();

  return (
    <nav className="flex items-center justify-between py-5">
      <div>{isNotebook ? <Button onClick={sidebarToggle} icon={IoMenu} /> : <Breadcrumb paths={currentPath} />}</div>
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

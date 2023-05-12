import React from "react";
import { useLocation } from "react-router-dom";
import { BsFillBellFill } from "react-icons/bs";
import { Avatar, Breadcrumb, Button, Toggle } from "../atoms";
import { useAuth } from "../../context";
import { IoMenu } from "react-icons/io5";

interface Props {
  toggle?: () => void;
  isLaptop: boolean;
}

const Navbar: React.FC<Props> = props => {
  const { toggle, isLaptop } = props;
  const location = useLocation();
  const currentPath = location.pathname.split("/").slice(1);
  const { user } = useAuth();

  return (
    <nav className="flex items-center justify-between py-5">
      <div>{isLaptop ? <Breadcrumb paths={currentPath} /> : <Button onClick={toggle} icon={IoMenu} />}</div>
      <ul className="flex items-center gap-x-5">
        <Toggle />
        <Avatar name={user?.fullName} className="bg-primary font-semibold text-white" />
        <BsFillBellFill className="dark:text-primary cursor-pointer text-xl text-slate-600" />
      </ul>
    </nav>
  );
};

export default Navbar;

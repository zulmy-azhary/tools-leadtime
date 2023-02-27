import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context";
import { toast } from "react-hot-toast";

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
    <aside className="bg-cardDark hidden h-full w-full flex-col justify-between py-12 px-5 md:col-span-4 md:flex lg:col-span-3 xl:col-span-2">
      <div className="flex flex-col gap-y-4">
        {navLinks.map(({ to, title }, idx) => (
          <NavLink key={idx} to={to} className={({ isActive }) => (isActive ? "text-teal-400" : undefined)}>
            {title}
          </NavLink>
        ))}
      </div>
      <button className="text-start" onClick={onLogout}>
        Logout
      </button>
    </aside>
  );
};

const navLinks = [
  {
    to: "/dashboard",
    title: "Dashboard"
  },
  {
    to: "/employees",
    title: "Karyawan"
  }
];

export default Sidebar;

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
    <aside className="hidden md:col-span-4 lg:col-span-3 xl:col-span-2 bg-cardDark w-full h-full md:flex flex-col justify-between py-12 px-5">
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

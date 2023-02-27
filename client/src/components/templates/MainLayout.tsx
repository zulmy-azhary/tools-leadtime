import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

const MainLayout: React.FC = () => {
  if (Cookies.get("accessToken")) {
    return <Navigate to={"/dashboard"} />;
  }
  return (
    <main className="min-h-screen grid grid-cols-1 lg:grid-cols-5 place-items-center w-full pt-20 lg:py-0">
      <Outlet />
    </main>
  );
};

export default MainLayout;

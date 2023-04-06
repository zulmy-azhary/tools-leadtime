import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

const MainLayout: React.FC = () => {
  if (Cookies.get("accessToken")) {
    return <Navigate to={"/dashboard"} />;
  }

  return (
    <main className="grid min-h-screen w-full grid-cols-1 place-items-center pt-20 lg:grid-cols-5 lg:py-0">
      <Outlet />
    </main>
  );
};

export default MainLayout;

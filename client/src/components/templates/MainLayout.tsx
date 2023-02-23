import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout: React.FC = () => {
  return (
    <main className="min-h-screen grid grid-cols-1 lg:grid-cols-5 place-items-center w-full py-20 lg:py-0">
      <Outlet />
    </main>
  );
};

export default AuthLayout;

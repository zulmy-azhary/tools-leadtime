import React from "react";
import { Sidebar, Navbar } from ".";

const ProtectedContainer: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Sidebar />
      <main className="ml-[300px] flex min-h-screen grow flex-col gap-y-5 px-8 pb-12">
        <Navbar />
        <section className="grid gap-y-16">{children}</section>
      </main>
    </>
  );
};

export default ProtectedContainer;

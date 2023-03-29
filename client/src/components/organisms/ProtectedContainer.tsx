import React from "react";
import { Sidebar, Navbar } from ".";

const ProtectedContainer: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <main className="flex min-h-screen w-full">
      <Sidebar />
      <section className="ml-[300px] flex min-h-screen grow flex-col gap-y-5 px-8">
        <Navbar />
        {children}
      </section>
    </main>
  );
};

export default ProtectedContainer;

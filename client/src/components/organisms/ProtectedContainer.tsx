import React from "react";
import { Sidebar, Navbar } from ".";

const ProtectedContainer: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <main className="flex min-h-screen w-full gap-x-6 px-6 lg:gap-x-12 lg:px-12 xl:gap-x-16 xl:px-16">
      <aside className="relative md:basis-48 lg:basis-52 xl:basis-56">
        <Sidebar />
      </aside>
      <section className="col-span-full flex h-[2000px] min-h-screen grow flex-col py-5 md:col-span-8 lg:col-span-9 xl:col-span-10">
        <Navbar />
        {children}
      </section>
    </main>
  );
};

export default ProtectedContainer;

import React, { useEffect } from "react";
import { Sidebar, Navbar } from ".";
import { useMediaQuery, useToggle } from "../../hooks";
import clsx from "clsx";

const ProtectedContainer: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [isOpen, toggle, setIsOpen] = useToggle();
  const isNotebook = useMediaQuery("(max-width: 1024px)");

  useEffect(() => {
    if (isNotebook) setIsOpen(false);
    return () => setIsOpen(true);
  }, [isNotebook]);
  return (
    <>
      <Sidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <main className={clsx("flex min-h-screen flex-col gap-y-5 px-8 pb-12", isNotebook ? "ml-[0px]" : "ml-[300px]")}>
        <Navbar sidebarToggle={toggle} />
        <section className="grid gap-y-16">{children}</section>
      </main>
    </>
  );
};

export default ProtectedContainer;

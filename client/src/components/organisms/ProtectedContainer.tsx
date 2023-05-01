import React, { useEffect } from "react";
import { Sidebar, Navbar } from ".";
import { useMediaQuery, useToggle } from "../../hooks";
import clsx from "clsx";

const ProtectedContainer: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [isOpen, toggle, setOpen] = useToggle(true);
  const isLaptop = useMediaQuery("(min-width: 1024px)");

  useEffect(() => {
    setOpen(!!isLaptop);
  }, [isLaptop]);

  return (
    <>
      <Sidebar isOpen={isOpen} setOpen={setOpen} isLaptop={isLaptop} />
      <main
        className={clsx(
          "flex min-h-screen flex-col gap-y-5 px-8 pb-12 after:absolute after:duration-500",
          isLaptop ? "ml-[300px]" : "ml-[0px]",
          isOpen && !isLaptop
            ? "after:inset-0 after:bg-slate-800/30 dark:after:bg-slate-800/50"
            : "after:bg-transparent"
        )}
      >
        <Navbar toggle={toggle} isLaptop={isLaptop} />
        <section className="grid gap-y-16">{children}</section>
      </main>
    </>
  );
};

export default ProtectedContainer;

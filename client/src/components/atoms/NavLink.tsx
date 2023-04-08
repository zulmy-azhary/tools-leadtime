import clsx from "clsx";
import React from "react";
import type { IconType } from "react-icons/lib";
import { NavLink as BaseNavLink, type NavLinkProps } from "react-router-dom";

interface Props extends React.PropsWithChildren<NavLinkProps> {
  icon: IconType;
}

const NavLink: React.ForwardRefRenderFunction<HTMLAnchorElement, Props> = (props, ref) => {
  const { to, icon: Icon, children, className, ...rest } = props;

  return (
    <BaseNavLink ref={ref} to={to} {...rest}>
      {({ isActive }) => (
        <div
          className={clsx(
            "flex items-center gap-x-4 rounded p-[10px] text-sm",
            isActive && "bg-blue-500/30 text-blue-500 dark:bg-teal-400/30 dark:text-teal-400"
          )}
        >
          <div
            className={clsx(
              "rounded p-2",
              isActive
                ? "bg-blue-500 text-white drop-shadow-none dark:bg-teal-400 dark:text-slate-900"
                : "bg-white shadow-md dark:bg-slate-900"
            )}
          >
            <Icon className="text-lg" />
          </div>
          <span>{children}</span>
        </div>
      )}
    </BaseNavLink>
  );
};

export default React.forwardRef(NavLink);

import React from "react";
import type { IconType } from "react-icons/lib";
import { NavLink as BaseNavLink, type NavLinkProps } from "react-router-dom";

interface Props extends React.PropsWithChildren<NavLinkProps> {
  icon: IconType;
}

const NavLink: React.ForwardRefRenderFunction<HTMLAnchorElement, Props> = (props, ref) => {
  const { to, icon: Icon, children, className, ...rest } = props;

  return (
    <BaseNavLink
      ref={ref}
      to={to}
      className={({ isActive }) =>
        [
          className,
          isActive
            ? "bg-cardLight dark:bg-cardDark group rounded-md text-indigo-500 shadow-sm dark:text-teal-400"
            : "opacity-50"
        ]
          .filter(Boolean)
          .join(" ")
      }
      {...rest}
    >
      <div className="flex items-center gap-x-4 px-6 py-3 text-indigo-500 dark:text-teal-400">
        <div className="bg-cardLight dark:bg-cardDark group-visited:text-bgLight dark:group-visited:text-bgDark rounded-md p-2 group-visited:bg-indigo-500 dark:group-visited:bg-teal-400">
          <Icon className="text-lg" />
        </div>
        <span>{children}</span>
      </div>
    </BaseNavLink>
  );
};

export default React.forwardRef(NavLink);

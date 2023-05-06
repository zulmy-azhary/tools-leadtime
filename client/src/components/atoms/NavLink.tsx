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
            "flex items-center gap-x-4 rounded-md p-2 text-sm font-medium",
            "text-typo-light dark:text-typo-dark",
            isActive && "bg-primary/30 !text-primary"
          )}
        >
          <div
            className={clsx(
              "rounded p-2",
              isActive
                ? "bg-primary text-typo-white drop-shadow-none"
                : "bg-card-bg-light dark:bg-field-bg-dark"
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

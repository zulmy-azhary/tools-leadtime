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
            "text-typo-light dark:text-typo-dark flex items-center gap-x-4 rounded p-2 text-sm font-medium",
            isActive && "bg-primary/30 !text-primary"
          )}
        >
          <div
            className={clsx(
              "bg-card-bg-light border-button-bd-light dark:bg-button-bg-dark dark:border-button-bd-dark rounded border-[1.6px] p-2 shadow-md shadow-gray-200 dark:shadow-gray-900",
              isActive && "!bg-primary !text-typo-white !border-primary !shadow-none"
            )}
          >
            <Icon className="text-lg" />
          </div>
          <span className="font-semibold">{children}</span>
        </div>
      )}
    </BaseNavLink>
  );
};

export default React.forwardRef(NavLink);

import clsx from "clsx";
import React from "react";
import { FaUserAlt } from "react-icons/fa";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  name?: string;
}

const trimmedName = (name?: string) => {
  if (!name) return <FaUserAlt />;
  const result = name
    .split(" ")
    .filter((_, idx: number) => idx <= 1)
    .map((item: string) => item.charAt(0))
    .join("");

  return result;
};
const Avatar: React.FC<Props> = props => {
  const { name, className, ...rest } = props;
  const res = trimmedName(name);
  return (
    <div
      className={clsx("grid cursor-pointer select-none place-items-center rounded-full", className)}
      {...rest}
      title={name}
    >
      <span>{res}</span>
    </div>
  );
};

export default Avatar;

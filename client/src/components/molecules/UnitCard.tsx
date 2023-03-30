import React from "react";
import { Heading, Text } from "../atoms";
import clsx from "clsx";
import type { IconType } from "react-icons/lib";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  unitValue: number;
  subTitle: string;
  icon: IconType;
}

const UnitCard: React.FC<Props> = props => {
  const { title, unitValue, className, subTitle, icon: Icon, ...rest } = props;
  return (
    <div
      className={clsx(
        "flex select-none items-center justify-between overflow-hidden rounded-lg bg-white p-5 shadow-lg",
        className
      )}
      {...rest}
    >
      <div className="flex flex-col">
        <Text className="text-lg font-semibold text-slate-600">{title}</Text>
        <Heading className="text-5xl font-semibold text-slate-600">{unitValue}</Heading>
        <Text className="text-sm font-medium text-slate-500">{subTitle}</Text>
      </div>
      <figure className={clsx("rounded-md bg-blue-500/30 p-3.5 text-2xl text-blue-500")}>
        <Icon />
      </figure>
    </div>
  );
};

export default UnitCard;

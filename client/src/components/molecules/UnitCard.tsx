import React from "react";
import { Heading, IconWrapper, Text } from "../atoms";
import clsx from "clsx";
import { IoBuild } from "react-icons/io5";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  unitValue: number;
}

const UnitCard: React.FC<Props> = props => {
  const { title, unitValue, className, ...rest } = props;
  return (
    <div
      className={clsx(
        "bg-cardLight dark:bg-cardDark flex items-center justify-between rounded-md p-5 shadow-sm",
        className
      )}
      {...rest}
    >
      <div>
        <Text className="text-lg font-semibold">{title}</Text>
        <Heading className="text-5xl font-semibold">{unitValue}</Heading>
        <Text className="text-xs font-medium">Proses Unit</Text>
      </div>
      <IconWrapper icon={<IoBuild className="text-2xl text-indigo-500 dark:text-teal-400" />} />
    </div>
  );
};

export default UnitCard;

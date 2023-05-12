import React from "react";
import { Card, Heading, IconWrapper, Text } from "../atoms";
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
    <Card className={clsx("flex items-center justify-between overflow-hidden p-5", className)} {...rest}>
      <div className="flex flex-col gap-1">
        <Text className="text-lg font-semibold">{title}</Text>
        <Heading className="text-4xl font-semibold">{unitValue}</Heading>
        <Text className="text-sm font-medium">{subTitle}</Text>
      </div>
      <IconWrapper>
        <Icon />
      </IconWrapper>
    </Card>
  );
};

export default UnitCard;

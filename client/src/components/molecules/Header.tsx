import React from "react";
import clsx from "clsx";
import { Heading, Text } from "../atoms";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  headerTitle: string;
  description: string;
}

const Headers: React.FC<Props> = props => {
  const { headerTitle, description, className, ...rest } = props;
  return (
    <div className={clsx(className)} {...rest}>
      <Heading className="text-3xl font-bold">{headerTitle}</Heading>
      <Text className="font-medium opacity-75">{description}</Text>
    </div>
  );
};

export default Headers;

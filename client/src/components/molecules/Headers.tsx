import React from "react";
import clsx from "clsx";
import { Heading, Text } from "../atoms";

interface Props {
  headerTitle: string;
  description: string;
  className?: string;
}

const Headers: React.FC<Props> = props => {
  const { headerTitle, description, className } = props;
  return (
    <div className={clsx(className)}>
      <Heading className="text-3xl font-semibold">{headerTitle}</Heading>
      <Text className="text-slate-600">{description}</Text>
    </div>
  );
};

export default Headers;

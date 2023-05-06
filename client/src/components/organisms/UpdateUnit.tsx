import React from "react";
import withModal from "../../HOC/withModal";
import type { TUnitData } from "../../types";
import clsx from "clsx";
import { IoAdd } from "react-icons/io5";
import { Button } from "../atoms";

interface Props {
  dataUnit: TUnitData;
  onToggle?: () => void;
}

const UpdateUnit: React.FC<Props> = props => {
  const { dataUnit, onToggle } = props;
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // eslint-disable-next-line no-console
    console.log(dataUnit);
    (onToggle as () => void)();
  };

  return (
    <form onSubmit={onSubmit} className={clsx("grid grid-cols-4 gap-4")}>
      <Button
        type="submit"
        icon={IoAdd}
        className={clsx("col-span-full bg-teal-500 p-3 text-sm text-white dark:text-slate-900")}
      >
        Submit
      </Button>
    </form>
  );
};

export default withModal(UpdateUnit);

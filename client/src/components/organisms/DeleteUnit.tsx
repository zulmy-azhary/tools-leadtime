import React from "react";
import type { TResponse, TUnitData } from "../../types";
import { useMutation, useQueryClient } from "react-query";
import withModal from "../../HOC/withModal";
import { Button } from "../atoms";
import { deleteUnitById } from "../../api/unit";
import type { AxiosResponse } from "axios";
import { toast } from "react-hot-toast";

interface Props {
  dataUnit: Pick<TUnitData, "_id" | "workOrder">;
  onToggle?: () => void;
}

const DeleteUnit: React.FC<Props> = props => {
  const { dataUnit, onToggle } = props;
  const queryClient = useQueryClient();

  const { mutate: mutateDeleteUnit } = useMutation({
    mutationFn: deleteUnitById,
    onSuccess: (res: AxiosResponse<TResponse>) => {
      toast.success(res.data.message);
      queryClient.invalidateQueries(["unit", "getAll"]);
      (onToggle as () => void)();
    }
  });

  const handleDelete = () => {
    mutateDeleteUnit(dataUnit._id);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-y-12">
      <div className="flex flex-col gap-y-0.5 text-center">
        <p>Are you sure you want to delete this unit?</p>
        <span className="text-lg font-semibold text-blue-500 dark:text-teal-400">{dataUnit.workOrder}</span>
        <p>
          This action <strong>cannot</strong> be undone.
        </p>
      </div>
      <div className="flex w-full justify-center gap-x-6">
        <Button onClick={handleDelete} className="bg-red-500 px-3 py-2 text-sm text-slate-800 dark:text-blue-200">
          Delete
        </Button>
        <Button onClick={onToggle} className="bg-gray-300 px-3 py-2 text-sm dark:bg-slate-800">
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default withModal(DeleteUnit);

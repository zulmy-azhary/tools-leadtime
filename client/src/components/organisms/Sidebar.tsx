import React from "react";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context";
import { toast } from "react-hot-toast";
import { SidebarList } from "../molecules";
import { useMutation } from "react-query";
import type { AxiosError, AxiosResponse } from "axios";
import { logout } from "../../api/auth";
import type { TResponse } from "../../types";
import { Button, Heading } from "../atoms";
import { useMediaQuery } from "../../hooks";
import { IoClose } from "react-icons/io5";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<Props> = props => {
  const { isOpen, onClose } = props;
  const isNotebook = useMediaQuery("(max-width: 1024px)");
  const { user, logout: handleLogout } = useAuth();
  const navigate = useNavigate();

  const { mutate: mutateLogout } = useMutation({
    mutationFn: logout,
    onSuccess: (res: AxiosResponse<TResponse>) => {
      toast.success(res.data.message);
      handleLogout();
      navigate("/");
    },
    onError: err => {
      toast.error((err as AxiosError<TResponse>).response?.data.message as string);
    }
  });

  // Handle logout
  const onLogout = () => {
    mutateLogout(user?.nik as string);
  };

  return (
    <aside
      className={clsx(
        "bg-bgLight fixed inset-y-0 z-10 flex flex-col justify-between overflow-hidden dark:bg-slate-800",
        isOpen ? "w-[300px] px-6 pb-6" : "w-0 p-0"
      )}
    >
      <div className="flex flex-col gap-y-5">
        <div className="flex items-center py-7">
          <Heading
            className={clsx(
              "grow text-xl font-semibold uppercase tracking-[0.25em]",
              isNotebook ? "text-left" : "text-center"
            )}
          >
            Kalla Toyota
          </Heading>
          {isNotebook && (
            <Button
              icon={IoClose}
              onClick={onClose}
              className={clsx(
                "border-[1.6px] p-1 text-sm",
                "bg-gray-50 dark:bg-gray-800",
                "border-gray-200 dark:border-gray-700",
                "text-gray-600 dark:text-gray-400"
              )}
            />
          )}
        </div>
        <SidebarList />
      </div>
      <Button
        onClick={onLogout}
        className="w-full bg-blue-500 py-3 text-sm text-white dark:bg-teal-400 dark:text-slate-900"
      >
        Logout
      </Button>
    </aside>
  );
};

export default Sidebar;

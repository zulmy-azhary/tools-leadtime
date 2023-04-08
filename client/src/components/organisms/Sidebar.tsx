import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context";
import { toast } from "react-hot-toast";
import { SidebarList } from "../molecules";
import { useMutation } from "react-query";
import type { AxiosError, AxiosResponse } from "axios";
import { logout } from "../../api/auth";
import type { TResponse } from "../../types";
import { Button } from "../atoms";

const Sidebar: React.FC = () => {
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
    <aside className="fixed inset-y-0 flex w-[300px] flex-col justify-between px-6 pb-6">
      <div className="flex flex-col gap-y-5">
        <div className="py-7 text-center text-xl font-semibold uppercase tracking-[0.25em]">Kalla Toyota</div>
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

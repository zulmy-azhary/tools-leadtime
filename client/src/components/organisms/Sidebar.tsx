import React, { useCallback } from "react";
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
import { IoClose } from "react-icons/io5";
import { useOnClickOutside } from "../../hooks";

interface Props {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isLaptop: boolean;
}

const Sidebar: React.FC<Props> = props => {
  const { isOpen, setOpen, isLaptop } = props;
  const { user, logout: handleLogout } = useAuth();
  const navigate = useNavigate();
  const onClosed = useCallback(() => !isLaptop && setOpen(false), [isLaptop]);
  const sidebarRef = useOnClickOutside(isOpen, onClosed);

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
      ref={sidebarRef}
      className={clsx(
        "bg-base-light dark:bg-base-dark fixed inset-y-0 z-10 flex w-[300px] flex-col justify-between overflow-hidden px-6 pb-6 transition-all duration-500",
        isOpen ? "left-0" : "-left-full"
      )}
    >
      <div className="flex flex-col gap-y-5">
        <div className="flex items-center py-7">
          <Heading
            className={clsx(
              "grow text-lg font-semibold uppercase tracking-[0.125em] lg:text-xl lg:tracking-[0.25em]",
              isLaptop ? "text-center" : "text-left"
            )}
          >
            Kalla Toyota
          </Heading>
          {!isLaptop && (
            <Button
              icon={IoClose}
              onClick={() => setOpen(false)}
              className="bg-button-bg-light dark:bg-button-bg-dark text-typo-light dark:text-typo-dark border-button-bd-light dark:border-button-bd-dark border-[1.6px] p-1 text-sm"
            />
          )}
        </div>
        <SidebarList onClosed={onClosed} />
      </div>
      <Button onClick={onLogout} className="bg-primary text-typo-white w-full py-3 text-sm">
        Logout
      </Button>
    </aside>
  );
};

export default Sidebar;

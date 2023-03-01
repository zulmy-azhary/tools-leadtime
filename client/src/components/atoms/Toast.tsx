import React from "react";
import { IoMdClose } from "react-icons/io";
import { FiCheck } from "react-icons/fi";
import { AiOutlineStop } from "react-icons/ai";
import clsx from "clsx";
import { toast as toastFn, ToastBar, type Toast as TToast } from "react-hot-toast";

interface Props {
  toast: TToast;
}

const Toast: React.FC<Props> = props => {
  const { toast } = props;

  return (
    <ToastBar
      toast={toast}
      style={{
        display: "flex",
        alignItems: "center"
      }}
      position="bottom-left"
    >
      {({ message }) => (
        <>
          <div
            className={clsx(
              "text-bgLight dark:text-bgDark inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-500 dark:bg-teal-400"
            )}
          >
            {toast.type === "success" && <FiCheck />}
            {toast.type === "error" && <AiOutlineStop />}
          </div>
          <span className="ml-3 text-sm font-normal text-indigo-500 dark:text-teal-400">{message}</span>
          {toast.type !== "loading" && (
            <button type="button" className="ml-auto" onClick={() => toastFn.dismiss(toast.id)}>
              <IoMdClose className="h-5 w-5 text-indigo-500 dark:text-teal-400" />
            </button>
          )}
        </>
      )}
    </ToastBar>
  );
};

export default Toast;

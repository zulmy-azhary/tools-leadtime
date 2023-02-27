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
        alignItems: "center",
        backgroundColor: "var(--bgDark)",
        color: "var(--primaryTextDark)"
      }}
      position="bottom-left"
    >
      {({ message }) => (
        <>
          <div
            className={clsx(
              "inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-500",
              toast.type === "success" && "dark:text-primaryTextDark dark:bg-blue-800",
              toast.type === "error" && "dark:bg-red-600 dark:text-black"
            )}
          >
            {toast.type === "success" && <FiCheck />}
            {toast.type === "error" && <AiOutlineStop />}
          </div>
          <span className="ml-3 text-sm font-normal">{message}</span>
          {toast.type !== "loading" && (
            <button type="button" className="ml-auto" onClick={() => toastFn.dismiss(toast.id)}>
              <IoMdClose className="text-primaryTextDark h-5 w-5" />
            </button>
          )}
        </>
      )}
    </ToastBar>
  );
};

export default Toast;

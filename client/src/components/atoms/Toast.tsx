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
              "inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-blue-500 bg-blue-100 rounded-lg",
              toast.type === "success" && "dark:bg-blue-800 dark:text-primaryTextDark",
              toast.type === "error" && "dark:bg-red-600 dark:text-black"
            )}
          >
            {toast.type === "success" && <FiCheck />}
            {toast.type === "error" && <AiOutlineStop />}
          </div>
          <p className="ml-3 text-sm font-normal">{message}</p>
          {toast.type !== "loading" && (
            <button type="button" className="ml-auto" onClick={() => toastFn.dismiss(toast.id)}>
              <IoMdClose className="w-5 h-5 text-primaryTextDark" />
            </button>
          )}
        </>
      )}
    </ToastBar>
  );
};

export default Toast;

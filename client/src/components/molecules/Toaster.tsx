import React from "react";
import { Toaster as BaseToaster, type Toast } from "react-hot-toast";
import { Toast as CustomToast } from "../atoms";

const Toaster: React.FC = () => {
  return (
    <BaseToaster
      position="bottom-left"
      reverseOrder={false}
      toastOptions={{
        className: "rounded-lg shadow-md max-w-xs w-full bg-bgLight dark:bg-bgDark",
        success: {
          duration: 5000
        }
      }}
    >
      {(toast: Toast) => <CustomToast toast={toast} />}
    </BaseToaster>
  );
};

export default Toaster;

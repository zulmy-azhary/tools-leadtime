import React, { Suspense } from "react";
import { Login } from "./components/pages";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Loading, Toast as CustomToast } from "./components/atoms";
import { type Toast, Toaster } from "react-hot-toast";

const Register = React.lazy(async () => await import("./components/pages").then(comp => ({ default: comp.Register })));

const App: React.FC = () => {
  return (
    <>
      <div className="flex flex-col gap-y-8 justify-center items-center min-h-screen bg-bgLight text-primaryTextLight dark:bg-bgDark dark:text-primaryTextDark">
        <BrowserRouter>
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="*" element={<Login />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </div>
      <Toaster
        position="bottom-left"
        reverseOrder={false}
        toastOptions={{
          className: "rounded-lg shadow dark:text-primaryTextDark dark:bg-bgDark max-w-xs w-full"
        }}
      >
        {(toast: Toast) => <CustomToast toast={toast} />}
      </Toaster>
    </>
  );
};

export default App;

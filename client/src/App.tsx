import React, { Suspense } from "react";
import { Custom404, Login } from "./components/pages";
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom";
import { Loading, Toast as CustomToast } from "./components/atoms";
import { type Toast, Toaster } from "react-hot-toast";
import { MainLayout } from "./components/templates";

const Register = React.lazy(async () => await import("./components/pages").then(comp => ({ default: comp.Register })));

const App: React.FC = () => {
  return (
    <>
      <div className="flex flex-col gap-y-8 justify-center items-center min-h-screen bg-bgLight text-primaryTextLight dark:bg-bgDark dark:text-primaryTextDark">
        <Suspense fallback={<Loading />}>
          <RouterProvider router={router} />
        </Suspense>
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

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<MainLayout />}>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<Custom404 />} />
    </Route>
  )
);

export default App;

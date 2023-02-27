import React, { Suspense } from "react";
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom";
import { Loading, Toast as CustomToast } from "./components/atoms";
import { MainLayout, ProtectedLayout } from "./components/templates";
import { Login } from "./components/pages";
import { type Toast, Toaster } from "react-hot-toast";
import { AuthProvider } from "./context";

const Register = React.lazy(async () => await import("./components/pages").then(comp => ({ default: comp.Register })));
const Custom404 = React.lazy(
  async () => await import("./components/pages").then(comp => ({ default: comp.Custom404 }))
);

// Protected Pages
const Home = React.lazy(async () => await import("./components/pages").then(comp => ({ default: comp.Home })));
const Employees = React.lazy(
  async () => await import("./components/pages").then(comp => ({ default: comp.Employees }))
);

const App: React.FC = () => {
  return (
    <AuthProvider>
      <div className="flex flex-col gap-y-8 justify-center items-center min-h-screen bg-bgLight text-primaryTextLight dark:bg-bgDark dark:text-primaryTextDark">
        <Suspense fallback={<Loading />}>
          <RouterProvider router={router} />
        </Suspense>
      </div>
      <Toaster
        position="bottom-left"
        reverseOrder={false}
        toastOptions={{
          className: "rounded-lg shadow dark:text-primaryTextDark dark:bg-bgDark max-w-xs w-full",
          success: {
            duration: 5000
          }
        }}
      >
        {(toast: Toast) => <CustomToast toast={toast} />}
      </Toaster>
    </AuthProvider>
  );
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Custom404 />} />
      </Route>
      <Route element={<ProtectedLayout />}>
        <Route path="/dashboard" element={<Home />} />
        <Route path="/employees" element={<Employees />} />
      </Route>
    </>
  )
);

export default App;

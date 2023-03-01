import React, { Suspense } from "react";
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom";
import { Loading } from "./components/atoms";
import { MainLayout, ProtectedLayout } from "./components/templates";
import { Login } from "./components/pages";
import { AuthProvider } from "./context";
import { Toaster } from "./components/molecules";

const Register = React.lazy(async () => await import("./components/pages").then(comp => ({ default: comp.Register })));
const Custom404 = React.lazy(
  async () => await import("./components/pages").then(comp => ({ default: comp.Custom404 }))
);

// Protected Pages
const Dashboard = React.lazy(
  async () => await import("./components/pages").then(comp => ({ default: comp.Dashboard }))
);
const Employees = React.lazy(
  async () => await import("./components/pages").then(comp => ({ default: comp.Employees }))
);

const App: React.FC = () => {
  return (
    <AuthProvider>
      <div className="bg-bgLight dark:bg-bgDark flex min-h-screen flex-col items-center justify-center gap-y-8 text-slate-600 transition-colors dark:text-blue-200">
        <Suspense fallback={<Loading />}>
          <RouterProvider router={router} />
        </Suspense>
      </div>
      <Toaster />
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
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/karyawan" element={<Employees />} />
      </Route>
    </>
  )
);

export default App;

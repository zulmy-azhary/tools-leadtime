import React, { Suspense } from "react";
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom";
import { Loading } from "./components/atoms";
import { MainLayout } from "./components/templates";
import { AuthProvider } from "./context";
import { Toaster } from "./components/molecules";
import { FlowProcess, TeamVendor } from "./components/pages";

const Login = React.lazy(async () => await import("./components/pages").then(comp => ({ default: comp.Login })));
const Register = React.lazy(async () => await import("./components/pages").then(comp => ({ default: comp.Register })));
const Custom404 = React.lazy(
  async () => await import("./components/pages").then(comp => ({ default: comp.Custom404 }))
);

const ProtectedLayout = React.lazy(
  async () => await import("./components/templates").then(comp => ({ default: comp.ProtectedLayout }))
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
    <>
      <div className="bg-bgLight dark:bg-bgDark flex min-h-screen flex-col items-center justify-center gap-y-8 text-slate-600 transition-colors dark:text-blue-200">
        <Suspense fallback={<Loading />}>
          <RouterProvider router={router} />
        </Suspense>
      </div>
      <Toaster />
    </>
  );
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
      <Route
        element={
          <AuthProvider>
            <ProtectedLayout />
          </AuthProvider>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/karyawan" element={<Employees />} />
        <Route path="/flowproses" element={<FlowProcess />} />
        <Route path="/teamvendor" element={<TeamVendor />} />
        <Route path="*" element={<Custom404 />} />
      </Route>
    </>
  )
);

export default App;

import React, { Suspense } from "react";
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom";
import { Loading } from "./components/atoms";
import { MainLayout } from "./components/templates";
import { AuthProvider } from "./context";
import { Toaster } from "./components/molecules";

const Login = React.lazy(async () => await import("./components/pages").then(({ Login }) => ({ default: Login })));
const Register = React.lazy(
  async () => await import("./components/pages").then(({ Register }) => ({ default: Register }))
);
const Custom404 = React.lazy(
  async () => await import("./components/pages").then(({ Custom404 }) => ({ default: Custom404 }))
);

const ProtectedLayout = React.lazy(
  async () => await import("./components/templates").then(({ ProtectedLayout }) => ({ default: ProtectedLayout }))
);

// Protected Pages
const Dashboard = React.lazy(
  async () => await import("./components/pages").then(({ Dashboard }) => ({ default: Dashboard }))
);
const Employees = React.lazy(
  async () => await import("./components/pages").then(({ Employees }) => ({ default: Employees }))
);
const FlowProcess = React.lazy(
  async () => await import("./components/pages").then(({ FlowProcess }) => ({ default: FlowProcess }))
);
const TeamVendor = React.lazy(
  async () => await import("./components/pages").then(({ TeamVendor }) => ({ default: TeamVendor }))
);
const DataUnit = React.lazy(
  async () => await import("./components/pages").then(({ DataUnit }) => ({ default: DataUnit }))
);

const App: React.FC = () => {
  return (
    <>
      <div className="bg-base-light text-typo-light dark:bg-base-dark dark:text-typo-dark min-h-screen transition-colors">
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
        <Route path="/unit" element={<DataUnit />} />
        <Route path="*" element={<Custom404 />} />
      </Route>
    </>
  )
);

export default App;

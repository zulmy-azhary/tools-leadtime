import React, { Suspense } from "react";
import { Login } from "./components/pages";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Loading } from "./components/atoms";

const Register = React.lazy(async () => await import("./components/pages").then(comp => ({ default: comp.Register })));

const App: React.FC = () => {
  return (
    <div className="flex flex-col gap-y-8 justify-center items-center min-h-screen">
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
  );
};

export default App;

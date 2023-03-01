import React, { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { getMe } from "../../api/auth";
import { toast } from "react-hot-toast";
import type { AxiosError } from "axios";
import type { TResponse, TUserProfile } from "../../types";
import Cookies from "js-cookie";
import { Navbar, Sidebar } from "../organisms";
import { parseJwt } from "../../helpers/jwt";
import { useAuth } from "../../context";

const ProtectedLayout: React.FC = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const { isLoading } = useQuery({
    queryKey: ["user", "getMe"],
    queryFn: getMe,
    onError: err => {
      toast.error((err as AxiosError<TResponse>).response?.data.message as string);
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
      navigate("/");
    }
  });

  useEffect(() => {
    const currentUser = parseJwt(Cookies.get("accessToken") as string)?._doc as TUserProfile;
    setUser(currentUser);
  }, []);

  if (!Cookies.get("accessToken")) {
    Cookies.remove("refreshToken");
    return <Navigate to="/" />;
  }

  if (isLoading) {
    return <div>Please wait...</div>;
  }

  return (
    <main className="min-h-screen w-full flex px-6 lg:px-12 xl:px-16 gap-x-6 lg:gap-x-12 xl:gap-x-16">
      <aside className="md:basis-48 lg:basis-52 xl:basis-56 relative">
        <Sidebar />
      </aside>
      <section className="min-h-screen h-[2000px] col-span-full md:col-span-8 lg:col-span-9 xl:col-span-10 grow py-5 flex flex-col">
        <Navbar />
        <Outlet />
      </section>
    </main>
  );
};

export default ProtectedLayout;

import React from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { getMe } from "../../api/auth";
import { toast } from "react-hot-toast";
import type { AxiosError } from "axios";
import type { TResponse, TUserProfile } from "../../types";
import Cookies from "js-cookie";
import { ProtectedContainer } from "../organisms";
import { parseJwt } from "../../helpers/jwt";
import { useAuth } from "../../context";

const ProtectedLayout: React.FC = () => {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const { isLoading } = useQuery({
    queryKey: ["user", "getMe"],
    queryFn: getMe,
    onSuccess: () => {
      const jwtParsed = parseJwt<TUserProfile>(Cookies.get("accessToken") as string);
      const currentUser = jwtParsed._doc;
      setUser(currentUser);
    },
    onError: err => {
      toast.error((err as AxiosError<TResponse>).response?.data.message as string);
      Cookies.remove("accessToken");
      navigate("/");
    }
  });

  if (!Cookies.get("accessToken")) {
    return <Navigate to="/" />;
  }

  if (isLoading) {
    return <div className="grid h-screen place-items-center">Please wait...</div>;
  }

  return (
    <ProtectedContainer>
      <Outlet />
    </ProtectedContainer>
  );
};

export default ProtectedLayout;

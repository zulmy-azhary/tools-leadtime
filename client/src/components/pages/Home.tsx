import React from "react";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import { useAuth } from "../../context";
import { useMutation } from "react-query";
import { refreshToken } from "../../api/auth";
import type { TResponse, TToken } from "../../types";
import { toast } from "react-hot-toast";
import type { AxiosError } from "axios";
import Cookies from "js-cookie";

const Home: React.FC = () => {
  useDocumentTitle("Home");
  const { user } = useAuth();
  const { mutate } = useMutation({
    mutationFn: refreshToken,
    onSuccess: res => {
      Cookies.set("accessToken", (res.data.data as Pick<TToken, "accessToken">).accessToken);
      toast.success(res.data.message);
    },
    onError: err => {
      toast.error((err as AxiosError<TResponse>).response?.data.message as string);
    }
  });

  const onClick = () => {
    const refreshToken = Cookies.get("refreshToken") as string;
    mutate({ refreshToken });
  };

  return (
    <div className="flex flex-col items-center gap-y-12">
      <div className="text-center">
        <p className="flex items-center gap-x-1 text-xl">
          Hi
          <span className="text-teal-400">
            {user?.firstName} {user?.lastName}
          </span>
          ! Welcome back
        </p>
        <p>NIK: {user?.nik}</p>
        <p>Role: {user?.role}</p>
      </div>
      <h2>Home Page</h2>
      <div className="flex justify-evenly w-full">
        <button className={"px-5 py-2 bg-cardDark/60 hover:bg-cardDark rounded-sm"} onClick={onClick}>
          Refresh Token
        </button>
      </div>
    </div>
  );
};

export default Home;

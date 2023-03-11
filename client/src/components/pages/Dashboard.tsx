import React from "react";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import { useAuth } from "../../context";

const Home: React.FC = () => {
  useDocumentTitle("Dashboard");
  const { user } = useAuth();

  //! Refresh token, don't remove
  // const { mutate } = useMutation({
  //   mutationFn: refreshToken,
  //   onSuccess: res => {
  //     Cookies.set("accessToken", (res.data.data as Pick<TToken, "accessToken">).accessToken);
  //     toast.success(res.data.message);
  //   },
  //   onError: err => {
  //     toast.error((err as AxiosError<TResponse>).response?.data.message as string);
  //   }
  // });
  // const onClick = () => {
  //   const refreshToken = Cookies.get("refreshToken") as string;
  //   mutate({ refreshToken });
  // };

  return (
    <div className="flex flex-col items-center gap-y-12">
      <div className="text-center">
        <p className="flex items-center gap-x-1 text-xl">
          Hi
          <span className="text-indigo-500 dark:text-teal-400">{user?.fullName}</span>! Welcome back
        </p>
        <p>NIK: {user?.nik}</p>
        <p>Role: {user?.role}</p>
      </div>
    </div>
  );
};

export default Home;

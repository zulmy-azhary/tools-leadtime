import React from "react";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import { useAuth } from "../../context";
import { OnlineUserCard } from "../molecules";

const Home: React.FC = () => {
  useDocumentTitle("Dashboard");
  const { user, onlineUsers } = useAuth();

  //! Refresh token, don't remove
  // const { mutate } = useMutation({
  //   mutationFn: refreshToken,
  //   onSuccess: res => {
  //     Cookies.set("accessToken", (res.data.data as Token).accessToken);
  //     toast.success(res.data.message);
  //   },
  //   onError: err => {
  //     toast.error((err as AxiosError<TResponse>).response?.data.message as string);
  //   }
  // });
  // const onClick = () => {
  //   mutate();
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
      {/* <button onClick={onClick}>Refresh Token</button> */}
      <div className="">
        <h3>Online Users</h3>
        {onlineUsers.length ? (
          <div className="flex flex-col gap-y-3">
            {onlineUsers.map((user, idx) => (
              <OnlineUserCard user={user} key={idx} />
            ))}
          </div>
        ) : (
          <p>No user online.</p>
        )}
      </div>
    </div>
  );
};

export default Home;

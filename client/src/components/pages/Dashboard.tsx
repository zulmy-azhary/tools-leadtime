import React from "react";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";

const Home: React.FC = () => {
  useDocumentTitle("Dashboard");

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

  return <h2 className="grow text-center">Dashboard Page</h2>;
};

export default Home;

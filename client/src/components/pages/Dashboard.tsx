import React from "react";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import { UnitCard } from "../molecules";

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

  return (
    <section>
      <div className="grid grid-cols-12 gap-6">
        <UnitCard className="col-span-3" title="Ketokan" unitValue={0} />
        <UnitCard className="col-span-3" title="Removal" unitValue={0} />
        <UnitCard className="col-span-3" title="Putty" unitValue={0} />
        <UnitCard className="col-span-3" title="Epoxy" unitValue={0} />
        <UnitCard className="col-span-3" title="Masking" unitValue={0} />
        <UnitCard className="col-span-3" title="Spraying" unitValue={0} />
        <UnitCard className="col-span-3" title="Assembling" unitValue={0} />
        <UnitCard className="col-span-3" title="Polishing" unitValue={0} />
      </div>
    </section>
  );
};

export default Home;

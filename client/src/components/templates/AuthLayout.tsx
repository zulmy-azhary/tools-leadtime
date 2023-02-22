import React from "react";

interface Props {
  url: string;
  headerTitle: string;
  description: string;
}

const AuthLayout: React.FC<React.PropsWithChildren<Props>> = props => {
  const { url, headerTitle, description, children } = props;
  return (
    <main className="min-h-screen grid grid-cols-1 lg:grid-cols-5 place-items-center w-full py-20 lg:py-0">
      <div className="w-full bg-cardDark p-4 md:p-6 lg:p-8 xl:p-12 flex flex-col justify-center items-center gap-y-3 col-span-2 h-full">
        <div className="mb-5 xl:max-w-lg text-center">
          <h1 className="text-3xl">{headerTitle}</h1>
          <p className="text-sm mt-3 text-primaryTextDark/60">{description}</p>
        </div>
        {children}
      </div>
      <div className="col-span-3 order-first lg:order-last">
        <img
          src={`/assets/background/${url}.svg`}
          alt={"Image Banner"}
          className="md:max-w-2xl lg:max-w-xl xl:max-w-3xl 2xl:max-w-4xl"
        />
      </div>
    </main>
  );
};

export default AuthLayout;

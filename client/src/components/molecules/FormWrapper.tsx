import React from "react";

interface Props {
  headerTitle: string;
  description: string;
}

const FormWrapper: React.FC<React.PropsWithChildren<Props>> = props => {
  const { headerTitle, description, children } = props;
  return (
    <div className="w-full bg-cardLight dark:bg-cardDark p-4 md:p-6 lg:p-8 xl:p-12 flex flex-col justify-center items-center gap-y-3 col-span-2 h-full">
      <div className="mb-5 xl:max-w-lg text-center">
        <h1 className="text-3xl font-semibold">{headerTitle}</h1>
        <p className="text-sm mt-3 text-primaryTextLight/75 dark:text-primaryTextDark/60">{description}</p>
      </div>
      {children}
    </div>
  );
};

export default FormWrapper;

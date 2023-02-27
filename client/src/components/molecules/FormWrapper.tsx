import React from "react";

interface Props {
  headerTitle: string;
  description: string;
}

const FormWrapper: React.FC<React.PropsWithChildren<Props>> = props => {
  const { headerTitle, description, children } = props;
  return (
    <div className="bg-cardLight dark:bg-cardDark col-span-2 flex h-full w-full flex-col items-center justify-center gap-y-3 p-4 md:p-6 lg:p-8 xl:p-12">
      <div className="mb-5 text-center xl:max-w-lg">
        <h1 className="text-3xl font-semibold">{headerTitle}</h1>
        <p className="text-primaryTextLight/75 dark:text-primaryTextDark/60 mt-3 text-sm">{description}</p>
      </div>
      {children}
    </div>
  );
};

export default FormWrapper;

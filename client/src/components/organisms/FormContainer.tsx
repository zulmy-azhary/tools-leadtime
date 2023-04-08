import React from "react";
import { ContentWrapper, ImageWrapper, Headers } from "../molecules";

interface Props {
  src: string;
  headerTitle: string;
  description: string;
}

const FormContainer: React.FC<React.PropsWithChildren<Props>> = props => {
  const { src, headerTitle, description, children } = props;
  return (
    <>
      <ContentWrapper className="col-span-2 !flex h-full w-full !flex-col items-center justify-center gap-y-3 bg-white p-4 dark:bg-slate-900 md:p-6 lg:p-8 xl:p-12">
        <Headers
          headerTitle={headerTitle}
          description={description}
          className="flex flex-col gap-2 text-center"
        ></Headers>
        {children}
      </ContentWrapper>
      <ImageWrapper src={src} />
    </>
  );
};

export default FormContainer;

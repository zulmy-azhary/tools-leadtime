import React from "react";
import { FormWrapper, ImageWrapper } from "../molecules";
import { Toggle } from "../atoms";

interface Props {
  src: string;
  headerTitle: string;
  description: string;
}

const FormContainer: React.FC<React.PropsWithChildren<Props>> = props => {
  const { src, headerTitle, description, children } = props;
  return (
    <>
      <FormWrapper headerTitle={headerTitle} description={description}>
        {children}
        <Toggle className="mt-5" />
      </FormWrapper>
      <ImageWrapper src={src} />
    </>
  );
};

export default FormContainer;

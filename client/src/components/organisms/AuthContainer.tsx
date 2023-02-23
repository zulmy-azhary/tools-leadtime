import React from "react";
import { FormWrapper, ImageWrapper } from "../molecules";

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
      </FormWrapper>
      <ImageWrapper src={src} />
    </>
  );
};

export default FormContainer;

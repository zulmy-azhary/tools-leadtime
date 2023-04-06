import React from "react";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import { FormContainer, RegisterForm } from "../organisms";
import { LinkToPage } from "../molecules";

const Register: React.FC = () => {
  useDocumentTitle("Register");

  return (
    <FormContainer
      src="/assets/background/register-banner.svg"
      headerTitle="Register"
      description="Register your account by filling out the form below, make sure the data you enter is correct."
    >
      <RegisterForm />
      <LinkToPage desc="Already have an account?" to="/" className="justify-center">
        Login
      </LinkToPage>
    </FormContainer>
  );
};

export default Register;

import React from "react";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import { AuthContainer } from "../organisms";
import { LinkToPage, RegisterForm } from "../molecules";

const Register: React.FC = () => {
  useDocumentTitle("Register");

  return (
    <AuthContainer
      src="/assets/background/register-banner.svg"
      headerTitle="Register"
      description="Register your account by filling out the form below, make sure the data you enter is correct."
    >
      <RegisterForm />
      <LinkToPage desc="Already have an account?" to="/">
        Login
      </LinkToPage>
    </AuthContainer>
  );
};

export default Register;

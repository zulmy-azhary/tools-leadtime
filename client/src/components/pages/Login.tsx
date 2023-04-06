import React from "react";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import { FormContainer, LoginForm } from "../organisms";
import { LinkToPage } from "../molecules";

const Login: React.FC = () => {
  useDocumentTitle("Login");

  return (
    <FormContainer
      src="/assets/background/login-banner.svg"
      headerTitle="Login"
      description="Welcome back! Please fill out the form below before logging in to the website."
    >
      <LoginForm />
      <LinkToPage desc="Don't have an account?" to="/register" className="justify-center">
        Register
      </LinkToPage>
    </FormContainer>
  );
};

export default Login;

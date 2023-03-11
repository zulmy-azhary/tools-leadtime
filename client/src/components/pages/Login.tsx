import React from "react";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import { MainContainer } from "../organisms";
import { LinkToPage, LoginForm } from "../molecules";

const Login: React.FC = () => {
  useDocumentTitle("Login");

  return (
    <MainContainer
      src="/assets/background/login-banner.svg"
      headerTitle="Login"
      description="Welcome back! Please fill out the form below before logging in to the website."
    >
      <LoginForm />
      <LinkToPage desc="Don't have an account?" to="/register">
        Register
      </LinkToPage>
    </MainContainer>
  );
};

export default Login;

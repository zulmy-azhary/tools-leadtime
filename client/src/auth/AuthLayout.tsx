import React from 'react';

const AuthLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <main className="min-h-screen grid grid-cols-5 place-items-center w-full">{children}</main>;
};

export default AuthLayout;

import React from 'react';
import clsx from 'clsx';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button: React.FC<React.PropsWithChildren<Props>> = ({ children, className, ...rest }) => {
  return (
    <button className={clsx('bg-gray-500 px-5 py-2 disabled:bg-gray-700', className)} {...rest}>
      {children}
    </button>
  );
};

export default Button;

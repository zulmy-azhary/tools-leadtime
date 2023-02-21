import clsx from 'clsx';
import React from 'react';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
}

const InputForm: React.ForwardRefRenderFunction<HTMLDivElement, Props> = (props, forwardRef) => {
  const { name, label, className, ...rest } = props;

  return (
    <div className={clsx('flex flex-col h-fit', className)} ref={forwardRef}>
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        className="border-[1px] border-black text-black px-5 py-3 outline-none text-sm"
        {...rest}
      />
    </div>
  );
};

export default React.forwardRef(InputForm);

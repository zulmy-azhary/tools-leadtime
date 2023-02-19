import React from 'react'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string
  label: string
}

const InputForm: React.ForwardRefRenderFunction<HTMLInputElement, Props> = (props, ref) => {
  const { id, label, ...rest } = props

  return (
    <div className="flex flex-col">
      <label htmlFor={id}>{label}</label>
      <input id={id} name={id} className="border-[1px] border-black text-black px-3 py-2 outline-none" {...rest} />
    </div>
  )
}

export default React.forwardRef(InputForm)

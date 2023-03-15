import React, { type ButtonHTMLAttributes } from 'react'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  solid?: boolean
}

const Button: React.FC<Props> = ({ children, solid, ...props }) => {
  const className = solid === true
    ? 'bg-primary text-white hover:bg-transparent'
    : 'hover:bg-primary'
  return (
    <button
      className={`font-bold border-1 px-4 py-2 border-primary transition-colors ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button

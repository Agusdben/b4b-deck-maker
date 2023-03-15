import React, { useState } from 'react'

interface Props {
  type: 'text' | 'password' | 'email'
  name: string
  required: boolean
  placeholder: string
  error?: string
  value: string
  label: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const InputText: React.FC<Props> = ({
  type,
  name,
  required,
  placeholder,
  error = '',
  value,
  label,
  onChange
}) => {
  const [focused, setFocused] = useState<boolean>(false)

  const wasClicked = (): void => {
    setFocused(true)
  }

  return (
    <div className='flex flex-col gap-1 w-full'>
      <label htmlFor={label} className='capitalize'>{label}{required ? '*' : ''}</label>
      <input
        id={label}
        className='bg-transparent px-4 py-2 outline-none peer border-1 border-primary'
        autoComplete='off'
        value={value}
        placeholder={placeholder}
        name={name}
        type={type}
        required={required}
        onChange={onChange}
        onBlur={wasClicked}
      />
      {
        error !== '' && focused && <small className={'peer-invalid:block peer-valid:hidden'}>{error}</small>
      }
    </div>
  )
}

export default InputText

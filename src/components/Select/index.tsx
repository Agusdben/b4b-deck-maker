import React from 'react'

interface Props {
  values: string[]
  value: string
  label: string
  onChange: (evt: React.ChangeEvent<HTMLSelectElement>) => void
}

const Select: React.FC<Props> = ({ values, onChange, label, value }) => {
  return (
    <label className='flex flex-col'>
      <p className='text-white'>{label}</p>
      <select value={value} defaultValue={label} onChange={onChange} className='bg-black text-white outline-none border-1 border-primary'>
      {
        values.map(val => <option key={val} value={val} className='text-primary bg-black'>{val}</option>)
      }
    </select>
    </label>
  )
}

export default Select

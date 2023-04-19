/* eslint-disable react/prop-types */
import React from 'react'

export const Input = ({ label, placeholder, type, bg, value, onChange }) => {
  return (
        <div className='text-sm w-full'>
            <label className='text-border font-semibold'>{label}</label>
            <input required type={type} placeholder={placeholder} className={`w-full text-sm mt-2 p-4 border border-border rounded text-white ${bg ? 'bg-main' : 'bg-dry'} `} value={value} onChange={onChange} />
        </div>
  )
}

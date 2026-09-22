import React from 'react'
import { memo } from 'react'

export const InputBox = memo(({label, placeholder, onChange}) => {
  return (
    <div>
        <div className="text-sm font-medium text-left py-2">
            {label}
        </div>
        <input onChange={onChange} placeholder={placeholder} type="text" className="w-full px-2 py-1 border rounded border-slate-200"/>
    </div>
  )
})

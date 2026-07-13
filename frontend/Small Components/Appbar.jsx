import React from 'react'

const Appbar = ({name}) => {
  return (
    <div className="h-16 bg-white shadow flex items-center justify-between px-6">
      <div className="text-2xl font-bold text-blue-600">
        RamBharose
      </div>
      <div className="flex items-center gap-4">
        <span className="text-gray-700 font-medium">
          Hello, {name}
        </span>

        <div className="h-10 w-10 rounded-full bg-slate-300 flex items-center justify-center">
          <span className="text-lg font-semibold text-gray-700">
            {name?.charAt(0).toUpperCase()}
          </span>
        </div>
      </div>
    </div>
  )
}

export default Appbar
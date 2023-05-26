import React from 'react'

const DropDownList = ({ disabled, startOption, setOption, options }) => {

  return (
    <div className="inline-block gap-x-2">
      <label>
        <span className="sr-only">Size</span>
        <select
          className="text-sm mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-300 focus:ring focus:ring-red-200 focus:ring-opacity-50 disabled:bg-gray-200"
          disabled={disabled}
          value={startOption}
          onChange={e => {
            setOption(e.target.value)
          }}
        >
          {options.map((s,i) => (
            <option key={i} value={s}>
                {s}
            </option>
          ))}
        </select>
      </label>
    </div>
  )
}

export default DropDownList

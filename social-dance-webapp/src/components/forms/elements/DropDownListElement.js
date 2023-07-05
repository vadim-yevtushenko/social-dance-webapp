import React, {useEffect, useState} from 'react'

const DropDownListElement = ({ disabled=false, startOption, setOption, options , font}) => {
    // const [value, setValue] = useState(startOption)
    //
    // useEffect(() => {
    //     setValue(setOption)
    // }, [startOption])

  return (
    <div className="inline-block gap-x-2">
      <label>
        <span className="sr-only">Size</span>
        <select
          className={`text-sm mt-1 block w-full rounded-md bg-white/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 ` +
              `focus-within:ring-inset focus-within:ring-indigo-500 ${font}`}
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

export default DropDownListElement

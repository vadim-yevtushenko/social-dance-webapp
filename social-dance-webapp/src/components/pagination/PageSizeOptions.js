import React from 'react'

const PageSizeOptions = ({ disabled, pageSize, setPageSize }) => {
  const pageSizeOptions = [5, 10, 20, 50]

  return (
    <div className="inline-block gap-x-2">
      <label>
        <span className="sr-only">Size</span>
        <select
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-300 focus:ring focus:ring-red-200 focus:ring-opacity-50 disabled:bg-gray-200"
          disabled={disabled}
          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value))
          }}
        >
          {pageSizeOptions.map(s => (
            <option key={s} value={s}>
                Show {s}
            </option>
          ))}
        </select>
      </label>
    </div>
  )
}

export default PageSizeOptions

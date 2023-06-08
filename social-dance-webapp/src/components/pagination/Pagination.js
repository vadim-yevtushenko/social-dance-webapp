import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import DropDownList from "../forms/DropDownList";
import {useValues} from "../../hooks/useValues";

export default function Pagination({page, size, total, setPage, setSize}) {

    const {pageSizeOptions} = useValues()

    const getFirstIndex = () => {
        return (page - 1) * size + 1
    }

    const getLastIndex = () => {
        if (page > total/size){
            return total % size + getFirstIndex() - 1
        }
        return (page - 1) * size + Number(size)
    }

    return (
        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 mb-4">
            <div className="flex flex-1 justify-between sm:hidden">
                <a
                    onClick={() => setPage(page - 1)}
                    className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                    Previous
                </a>
                <a
                    onClick={() => setPage(page + 1)}
                    className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                    Next
                </a>
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div className="hidden sm:flex sm:flex-1 sm:items-center">
                    <div>
                        <p className="text-sm text-gray-700">
                            {size === 0 ? "0 results" :
                                <>Showing < span className="font-medium">{getFirstIndex()}</span> to <span className="font-medium">{getLastIndex()}</span> of{' '}
                                    <span className="font-medium">{total}</span> results</>
                            }
                        </p>
                    </div>
                    <div className="ml-10 text-sm flex items-center">
                        <p className="mr-2">Page size</p>
                        <DropDownList
                            disabled={false}
                            startOption={size}
                            setOption={setSize}
                            options={pageSizeOptions}
                        />
                    </div>
                </div>
                <div>
                    <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                        <button
                            disabled={page < 2}
                            onClick={() => setPage(page - 1)}
                            className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                        >
                            <span className="sr-only">Previous</span>
                            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                        </button>
                        {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
                        <a
                            href="#"
                            aria-current="page"
                            className="relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            1
                        </a>
                        <a
                            href="#"
                            className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                        >
                            2
                        </a>
                        <a
                            href="#"
                            className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
                        >
                            3
                        </a>
                        <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
              ...
            </span>
                        <a
                            href="#"
                            className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
                        >
                            8
                        </a>
                        <a
                            href="#"
                            className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                        >
                            9
                        </a>
                        <a
                            href="#"
                            className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                        >
                            10
                        </a>
                        <button
                            disabled={page >= total/size}
                            onClick={() => setPage(page + 1)}
                            className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"

                        >
                            <span className="sr-only">Next</span>
                            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                        </button>
                    </nav>
                </div>
            </div>
        </div>
    )
}
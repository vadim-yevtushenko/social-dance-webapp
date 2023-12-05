import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import DropDownListElement from "../forms/elements/DropDownListElement";
import { classNamesJoin } from "../../util/classNameUtils";

export default function PaginationComponent({page, size, total, setPage, setSize, pageSizeOptions, shortMode=false}) {

    const getFirstIndex = () => {
        return (page - 1) * size + 1
    }

    const getLastIndex = () => {
        if (page > total/size){
            return total % size + getFirstIndex() - 1
        }
        return (page - 1) * size + Number(size)
    }

    const getTotalPages = () => {
        return Math.ceil(total / size)
    }

    return (
        <div className="flex items-center sm:justify-between justify-center  border-t border-gray-200 bg-white px-4 py-3 sm:px-6 mb-4">
            <div className="hidden sm:flex sm:flex-1 sm:items-center">

                {shortMode || (
                    <div>
                        <p className="hidden md:flex text-sm text-gray-700">
                            {total === 0 ? "0 results" :
                                <>Showing&nbsp;
                                    < span className="font-medium">{getFirstIndex()}</span>&nbsp;to&nbsp;
                                    <span className="font-medium">{getLastIndex()}</span>&nbsp;of&nbsp;
                                    <span className="font-medium">{total}</span>&nbsp;results
                                </>
                            }
                        </p>
                    </div>
                )}
                <div className="md:ml-10 text-sm flex md:items-center">
                    <p className="hidden lg:flex lg:mr-2">Page size</p>
                    <DropDownListElement
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
                        className={classNamesJoin(
                            page > 1 && "text-gray-700 hover:bg-gray-50 hover:text-indigo-600",
                            "relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0"

                        )}
                    >
                        <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                        <span className="mr-2">Previous</span>
                    </button>

                    {shortMode || (
                        <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
                            {total !== 0 && <>Current page {page} of {getTotalPages()}</>}
                        </span>
                    )}

                    <button
                        disabled={page >= total/size}
                        onClick={() => setPage(page + 1)}
                        className={classNamesJoin(
                            page < total/size && "text-gray-700 hover:bg-gray-50 hover:text-indigo-600",
                            "relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0"

                        )}
                    >
                        <span className="ml-2 ">Next</span>
                        <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                </nav>
            </div>
        </div>
    )
}
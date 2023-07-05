import React, { useEffect, useState } from "react";
import { getDancers } from "../../api/DancerApi";
import DancerTable from "./DancerTable";
import PaginationComponent from "../pagination/PaginationComponent";
import { useValues } from "../../hooks/useValues";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { useDispatch, useSelector } from "react-redux";

const DancersComponent = () => {

    const { total } = useSelector(state => state.lists)
    const dispatch = useDispatch();
    const [name, setName] = useState()
    const [lastName, setLastName] = useState()
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(10);
    const {dancerPageSizeOptions} = useValues()

    useEffect(() => {
        dispatch(getDancers(name, lastName, null, null, page, Number(size)))
    }, [name, lastName, page, size]);

    return (
        <div className="max-w-7xl flex-col grow px-4 sm:px-6 lg:px-8 my-5">
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-base font-semibold leading-6 text-gray-900">Dancers</h1>
                </div>
                <div className="flex flex-1 justify-center px-2 lg:ml-6 lg:justify-end">
                    <div className="w-full max-w-lg ">
                        <label htmlFor="search" className="sr-only">
                            Search
                        </label>
                        <div className="relative">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                            </div>
                            <input
                                id="name"
                                name="name"
                                className="block w-full rounded-md border-0 bg-gray-700 py-1.5 pl-10 pr-3 text-gray-300
                                placeholder:text-gray-400 focus:bg-white focus:text-gray-900 focus:ring-0 sm:text-sm sm:leading-6"
                                placeholder="Name"
                                type="search"
                                value={name}
                                onChange={event => setName(event.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <div className="flex flex-1 justify-center px-2 lg:ml-6 lg:justify-end">
                    <div className="w-full max-w-lg ">
                        <label htmlFor="search" className="sr-only">
                            Search
                        </label>
                        <div className="relative">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                            </div>
                            <input
                                id="lastName"
                                name="lastName"
                                className="block w-full rounded-md border-0 bg-gray-700 py-1.5 pl-10 pr-3 text-gray-300
                                placeholder:text-gray-400 focus:bg-white focus:text-gray-900 focus:ring-0 sm:text-sm sm:leading-6"
                                placeholder="Last name"
                                type="search"
                                value={lastName}
                                onChange={event => setLastName(event.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <DancerTable/>
            <PaginationComponent
                page={page}
                size={size}
                total={total}
                setPage={setPage}
                setSize={setSize}
                pageSizeOptions={dancerPageSizeOptions}
            />
        </div>
    );
}

export default DancersComponent
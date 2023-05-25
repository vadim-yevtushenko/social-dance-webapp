import {useEffect, useMemo, useState} from "react";
import {parseFullDateString} from "../../util/dateTimeUtils";
import {MagnifyingGlassIcon} from "@heroicons/react/20/solid";

const columns = [
    {id: 1, name: "Name"},
    {id: 2, name: "School / Dances"},
    {id: 3, name: "Birthday"},
    {id: 4, name: "Level"},
];

const DancerTable = ({dancers}) => {

    const tableColumns = useMemo(() => columns, []);

    const dancesStr = (dances) => {
        return dances.map(d => d.name).join(", ");
    }

    return (
        <div className="px-4 sm:px-6 lg:px-8 my-5">
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-base font-semibold leading-6 text-gray-900">Dancers</h1>
                </div>
                <div className="flex flex-1 justify-center px-2 lg:ml-6 lg:justify-end">
                    <div className="w-full max-w-lg lg:max-w-xs">
                        <label htmlFor="search" className="sr-only">
                            Search
                        </label>
                        <div className="relative">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                            </div>
                            <input
                                id="search"
                                name="search"
                                className="block w-full rounded-md border-0 bg-gray-700 py-1.5 pl-10 pr-3 text-gray-300 placeholder:text-gray-400 focus:bg-white focus:text-gray-900 focus:ring-0 sm:text-sm sm:leading-6"
                                placeholder="Search"
                                type="search"
                            />
                        </div>
                    </div>
                </div>
                <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none mr-20">
                    <button
                        type="button"
                        className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold
                        text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2
                        focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Search
                    </button>
                </div>
            </div>
            <div className="mt-8 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <table className="min-w-full divide-y divide-gray-300">
                            <thead>
                                <tr>
                                    <th scope="col"
                                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                                        Name
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        School / Dances
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Birthday
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Level
                                    </th>
                                    {/*<th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">*/}
                                    {/*    <span className="sr-only">Edit</span>*/}
                                    {/*</th>*/}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                            {dancers.map((dancer) => (
                                <tr key={dancer.id}>
                                    <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                                        <div className="flex items-center">
                                            <div className="h-11 w-11 flex-shrink-0">
                                                <img className="h-11 w-11 rounded-full"
                                                     src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                                     alt=""/>
                                            </div>
                                            <div className="ml-4">
                                                <div
                                                    className="font-medium text-gray-900">{dancer.name} {dancer.lastName}</div>
                                                <div
                                                    className="mt-1 text-gray-500">{dancer.contactInfo && dancer.contactInfo.city}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                        <div
                                            className="text-gray-900">{(dancer.school && dancer.school.name) || (dancer.teacher && dancer.teacher.name)}</div>
                                        <div
                                            className="mt-1 text-gray-500">{dancer.dances && dancesStr(dancer.dances)}</div>
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                      <span
                                          className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                        {parseFullDateString(dancer.birthday)}
                                      </span>
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">{dancer.level}</td>
                                    {/*<td className="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">*/}
                                    {/*    <a href="#" className="text-indigo-600 hover:text-indigo-900">*/}
                                    {/*        Edit<span className="sr-only">, {dancer.name}</span>*/}
                                    {/*    </a>*/}
                                    {/*</td>*/}
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DancerTable
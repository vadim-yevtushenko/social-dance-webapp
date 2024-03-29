import DancerQuickViewComponent from "./DancerQuickViewComponent";
import { useState } from "react";
import { useSelector } from "react-redux";
import { classNamesJoin } from "../../util/classNameUtils";
import React from "react";

const columns = [
    { id: 1, name: "Name" },
    { id: 2, name: "Level" },
    { id: 3, name: "Dances" },
];

const DancersTable = () => {
    const [openQuickViewDancer, setOpenQuickViewDancer] = useState(false)
    const [chosenDancer, setChosenDancer] = useState()
    const { dancers } = useSelector(state => state.lists)

    const dancesStr = (dances) => {
        return dances.map(d => d.name).join(", ")
    }

    const openDancerInfo = (dancer) => {
        setChosenDancer(dancer)
        setOpenQuickViewDancer(true)
    }

    return (
        <div>
            <DancerQuickViewComponent
                openView={openQuickViewDancer}
                setOpenView={setOpenQuickViewDancer}
                dancer={chosenDancer}
            />
            <div className="mt-8 flow-root ml-8 sm:ml-0">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <table className="min-w-fit sm:min-w-full divide-y divide-gray-300">
                            <thead>
                                <tr>
                                    {columns.map(column => (
                                        <th
                                            key={column.id}
                                            scope="col"
                                            className={classNamesJoin(column.id === 3 && "hidden sm:flex",
                                                "py-3.5 pl-4 sm:pl-0 pr-3 text-left text-sm font-semibold text-gray-900 ")}
                                        >
                                            {column.name}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                            {dancers.map((dancer) => (
                                <tr
                                    className="cursor-pointer hover:bg-gray-100"
                                    key={dancer.id}
                                    onClick={() => openDancerInfo(dancer)}
                                >
                                    <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0 ">
                                        <div className="flex items-center pl-2">
                                            <div className="h-11 w-11 flex-shrink-0">
                                                <img className="h-11 w-11 rounded-full"
                                                     src={dancer.image ? dancer.image : "/images/avatar-default/avatar_default_icon.png"}
                                                     alt=""
                                                />
                                            </div>
                                            <div className="ml-4">
                                                <div className="font-medium text-gray-900">
                                                    {dancer.name} {dancer.lastName}
                                                </div>
                                                <p className="mt-1 italic text-gray-500">
                                                    {dancer.contactInfo && dancer.contactInfo.country && dancer.contactInfo.country}
                                                    {dancer.contactInfo && dancer.contactInfo.city && <>, {dancer.contactInfo.city}</>}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="whitespace-nowrap pr-3 py-5 text-sm text-gray-500">
                                        <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                            {dancer.level}
                                        </span>
                                    </td>
                                    <td className="hidden md:block whitespace-nowrap pr-3 py-5 text-sm text-gray-500">
                                        <div className="mt-1 text-gray-500">
                                            <div className="hidden lg:block">
                                                {dancer.dances && dancesStr(dancer.dances)}
                                            </div>
                                            {dancer?.dances?.length > 0 && (
                                                <div>
                                                    <div className="lg:hidden prose prose-sm mt-2 text-gray-500">
                                                        <ul
                                                            role="list"
                                                            className={classNamesJoin(dancer?.dances?.length > 3 && "md:columns-2")}
                                                        >
                                                            {dancer?.dances?.map((dance) => (
                                                                <li key={dance?.id}>{dance?.name}</li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </td>
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

export default DancersTable
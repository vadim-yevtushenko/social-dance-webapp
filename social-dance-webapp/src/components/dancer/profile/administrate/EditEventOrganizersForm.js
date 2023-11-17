import React, { useEffect, useState } from "react";
import { useHttp } from "../../../../hooks/http.hook";
import { GET } from "../../../../api/Endpoints";
import DancerSearchComponent from "../../DancerSearchComponent";
import { classNamesJoin } from "../../../../util/classNameUtils";

const columns = [
    { id: 1, name: "Name" },
    { id: 2, name: "" },
];

const EditEventOrganizersForm = ({ organizers, setOrganizers }) => {
    const [dancers, setDancers] = useState(organizers)
    const [name, setName] = useState("")
    const [lastName, setLastName] = useState("")
    const { request } = useHttp();

    useEffect(() => {
        setDancers(organizers)
    }, [organizers])

    useEffect(() => {
        if (name || lastName){
            request(GET.getDancers(name, lastName, null, null, 1, 5))
                .then(res => {
                    setDancers([...organizers, ...res.results.filter(dancer => !includedInOrganizers(dancer.id))])
                })
        }
    }, [name, lastName]);

    const addOrganizer = (dancer) => {
        setOrganizers([...organizers, dancer])
    }

    const removeOrganizer = (id) => {
        setOrganizers(organizers.filter(dancer => dancer.id !== id))
    }

    const includedInOrganizers = (id) => {
        return organizers.map(admin => admin.id).includes(id)
    }

    const moreTwoOrganizers = () => {
        return organizers.length > 1
    }

    const buttonName = (dancer) => {
        if (includedInOrganizers(dancer.id)){
            return "Remove"
        }
        return "Add"
    }

    return (
        <div>
            <div className="flex justify-between">
                <DancerSearchComponent
                    name={name}
                    setName={setName}
                    lastName={lastName}
                    setLastName={setLastName}
                />
            </div>

            {dancers?.length > 0 && (
                <table className="min-w-fit sm:min-w-full divide-y divide-gray-300">
                    <thead>
                    <tr>
                        {columns.map(column => (
                            <th
                                key={column.id}
                                scope="col"
                                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                            >
                                {column.name}
                            </th>
                        ))}
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                    {dancers?.map((dancer) => (
                        <tr
                            // className="cursor-pointer hover:bg-gray-100"
                            key={dancer.id}
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
                                            {dancer.contactInfo && dancer.contactInfo.country}
                                            {dancer.contactInfo && <>, {dancer.contactInfo.city}</>}
                                        </p>
                                    </div>
                                </div>
                            </td>

                            <td>
                                <div>
                                    <button
                                        type="button"
                                        className={classNamesJoin(includedInOrganizers(dancer.id) ? moreTwoOrganizers() ? "bg-red-600 text-white" : "bg-gray-200 text-black"
                                                : "bg-indigo-500 hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 " +
                                                    "focus-visible:outline-offset-2 focus-visible:outline-indigo-500 text-white"
                                            , "rounded-md  px-3 py-2 text-sm font-semibold shadow-sm ")}
                                        onClick={() => includedInOrganizers(dancer.id) ? removeOrganizer(dancer.id) : addOrganizer(dancer)}
                                        disabled={(includedInOrganizers(dancer.id) && !moreTwoOrganizers())}
                                    >
                                        {buttonName(dancer)}
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    )}

export default EditEventOrganizersForm
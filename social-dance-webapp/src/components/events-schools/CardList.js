import { parseFullDateTimeString } from "../../util/dateTimeUtils";
import { getFullAddress } from "../../util/addressUtils";
import { PhotoIcon, StarIcon } from "@heroicons/react/20/solid";
import { classNamesJoin } from "../../util/classNameUtils";
import { NavLink } from "react-router-dom";
import { useValues } from "../../hooks/useValues";
import React, {useEffect, useState} from "react";
import { useSelector } from "react-redux";

export default function CardList({ typeOption }) {

    const { TYPE_OPTIONS } = useValues()
    const { events } = useSelector(state => state.lists)
    const { schools } = useSelector(state => state.lists)
    const [results, setResults] = useState(typeOption === TYPE_OPTIONS.EVENT ? events : schools)

    useEffect(() => {
        if (typeOption === TYPE_OPTIONS.EVENT){
            setResults(events)
        }else {
            setResults(schools)
        }
    }, [])
console.log("events", events)
console.log("schools", schools)
    return (
        <div className="bg-gray-50">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-16 lg:max-w-7xl lg:px-8">
                <h2 className="sr-only">{typeOption === TYPE_OPTIONS.EVENT ? 'Events' : 'Schools'}</h2>

                <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-8">
                    {(typeOption === TYPE_OPTIONS.EVENT ? events : schools).map((obj) => (
                        <div
                            key={obj.id}
                            className="relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white"
                        >
                            <div className="flex max-w-full justify-center rounded-lg border border-1 border-gray-900 px-3 py-3 shadow-md mx-4 mt-4">
                                <div className="text-center">
                                    {obj.image ? (
                                        <img
                                            src={obj.image}
                                            alt={obj.name}
                                            className="h-full w-full object-cover object-center sm:h-full sm:w-full"
                                        />
                                    ) : (
                                        <PhotoIcon className="mx-auto h-40 w-40 text-gray-300" aria-hidden="true" />
                                    )}
                                </div>
                            </div>
                            <div className="flex flex-1 flex-col justify-end space-y-2 p-4">
                                <div className="flex justify-between">
                                    <h3 className="text-2xl font-bold text-gray-900 hover:text-indigo-600 flex">
                                        <NavLink to={obj.id}>
                                            <span aria-hidden="true" className="inset-0" />
                                            {obj.name}
                                        </NavLink>
                                    </h3>
                                    {/*<button*/}
                                    {/*    type="button"*/}
                                    {/*    className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold*/}
                                    {/*                text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2*/}
                                    {/*                focus-visible:outline-offset-2 focus-visible:outline-indigo-600"*/}
                                    {/*>*/}
                                    {/*    Join*/}
                                    {/*</button>*/}
                                </div>
                                <p className="text-sm italic text-gray-500">{obj.contactInfo && getFullAddress(obj.contactInfo)}</p>
                                <div className="prose prose-sm mt-4 text-gray-500">
                                    {obj?.dances.map(d => d.name).join(", ")}
                                    {/*<ul className="columns-2">*/}
                                    {/*    {obj?.dances.map((dance) => (*/}
                                    {/*        <li key={dance.id}>{dance.name}</li>*/}
                                    {/*    ))}*/}
                                    {/*</ul>*/}
                                </div>
                                {typeOption === TYPE_OPTIONS.EVENT ? (
                                    <>
                                        {obj.description && (
                                            <textarea
                                            id="description"
                                            name="description"
                                            rows={2}
                                            disabled={true}
                                            value={obj.description}
                                            className="block w-full max-w-2xl rounded-md py-1.5 text-gray-900 sm:text-sm sm:leading-6 border-0 resize-none"
                                            />
                                        )}
                                        <div className="flex flex-1 flex-col justify-end">
                                            <p className="text-base font-medium text-gray-900">Start: {parseFullDateTimeString(obj.dateEvent)}</p>
                                            <p className="text-base font-medium text-gray-900">Finish: {parseFullDateTimeString(obj.dateFinishEvent)}</p>
                                            <p className="text-sm italic text-gray-500 mt-5 text-end">{parseFullDateTimeString(obj.created)}</p>
                                        </div>
                                    </>
                                ) : (
                                    <div className="flex flex-1 flex-col justify-end">
                                        <div className="flex-col text-lg my-2">
                                            <p className="text-base font-medium text-gray-900">email: {obj.contactInfo?.email}</p>
                                            <p className="text-base font-medium text-gray-900">phone: {obj.contactInfo?.phoneNumber}</p>
                                        </div>
                                        <div className="flex mt-5">
                                            <div>
                                                <div className="flex items-center">
                                                    {[0, 1, 2, 3, 4].map((rating) => (
                                                        <StarIcon
                                                            key={rating}
                                                            className={classNamesJoin(
                                                                obj.generalRating?.average > rating ? 'text-yellow-400' : 'text-gray-300',
                                                                'h-5 w-5 flex-shrink-0'
                                                            )}
                                                            aria-hidden="true"
                                                        />
                                                    ))}
                                                </div>
                                                <p className="sr-only"> out of 5 stars</p>
                                            </div>
                                            <p className="ml-4 text-sm text-gray-900">Based on {obj.generalRating?.totalCount} ratings</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    )
}
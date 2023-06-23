import {useEffect, useState} from 'react'
import { ChevronLeftIcon } from '@heroicons/react/24/outline'
import {PhotoIcon} from "@heroicons/react/24/solid";
import {useNavigate, useParams} from "react-router-dom";
import {getSchool} from "../../api/SchoolApi";
import {useValues} from "../../hooks/useValues";
import {getEvent} from "../../api/EventApi";
import ReviewComponent from "../review/ReviewComponent";
import {parseFullDateTimeString} from "../../util/dateTimeUtils";
import {getFullAddress} from "../../util/addressUtils";
import RatingComponent from "../rating/RatingComponent";

const OverViewComponent = ({typeOption}) => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const params = useParams();
    const [optionObject, setOptionObject] = useState()
    const { TYPE_OPTIONS } = useValues()
    const [rerenderReview, setRerenderReview] = useState(false)

    useEffect(() => {
        if (typeOption === TYPE_OPTIONS.SCHOOL){
            setLoading(true)
            getSchool(params.id)
                .then(res => {
                    setOptionObject(res.data)
                    setLoading(false);
                })
                .catch(error => {
                    console.log("error", error)
                    setLoading(false);
                })
        }else {
            setLoading(true)
            getEvent(params.id)
                .then(res => {
                    setOptionObject(res.data)
                    setLoading(false);
                })
                .catch(error => {
                    console.log("error", error)
                    setLoading(false);
                })
        }
    }, [])


    return (
        <div className="bg-white">
            <div className="pb-16 pt-6 sm:pb-24">
                <nav aria-label="Back" className="flex mx-auto w-sm px-4 sm:px-6 lg:px-8">
                    <a
                        aria-current="page"
                        className="flex items-center font-medium text-gray-500 hover:text-gray-700 cursor-pointer"
                        onClick={() => navigate(-1)}
                    >
                        <ChevronLeftIcon className="h-4 w-4"/> <span>Back</span>
                    </a>
                </nav>
                <div className="mx-auto mt-8 max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                    <div className="lg:grid lg:auto-rows-min lg:grid-cols-12 lg:gap-x-8">
                        <div className="lg:col-span-5 lg:col-start-8">
                            <div className="flex justify-between">
                                <h1 className="text-xl font-bold text-gray-900">{optionObject?.name}</h1>
                                {/*<p className="text-xl font-medium text-gray-900">{product.price}</p>*/}
                            </div>
                            {/* Reviews */}
                            {typeOption === TYPE_OPTIONS.EVENT && (
                                <div className="mt-4">
                                    <h2 className="text-sm font-medium text-gray-900">Dates</h2>
                                    <div className="items-center">
                                        <p className="text-sm text-gray-700">
                                            Start time: {parseFullDateTimeString(optionObject?.dateEvent)}
                                        </p>
                                        <p className="text-sm text-gray-700">
                                            Finish time: {parseFullDateTimeString(optionObject?.dateFinishEvent)}
                                        </p>

                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Image gallery */}
                        <div className="mt-8 lg:col-span-7 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:mt-0 ">
                            <h2 className="sr-only">Images</h2>

                            <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-2 lg:gap-8 rounded-lg border border-1 border-gray-900 shadow-md ">
                                {optionObject?.image ? (
                                    <img
                                        key={optionObject.id}
                                        src={optionObject.image}
                                        alt={optionObject.name}
                                        className='lg:col-span-2 lg:row-span-2 justify-self-center'

                                    />
                                ) : (
                                    <div className="grid grid-cols-1 lg:col-span-2 lg:row-span-2">
                                        <PhotoIcon className="h-80 w-80 text-gray-300 justify-self-center" />
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="mt-8 lg:col-span-5">

                            {/* Contacts */}
                            <div className="flex items-center justify-between">
                                <h2 className="text-sm font-medium text-gray-900">Email:</h2>
                                <h2 className="text-sm font-medium text-gray-900">Phone:</h2>
                            </div>
                            <div className="flex items-center justify-between">
                                <h2 className="text-md font-medium text-gray-900">{optionObject?.contactInfo?.email}</h2>
                                <h2 className="text-md font-medium text-gray-900">{optionObject?.contactInfo?.phoneNumber}</h2>
                            </div>

                            {/* Location */}
                            <div className="mt-8">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-sm font-medium text-gray-900">Location:</h2>
                                    <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                                        See on the map
                                    </a>
                                </div>
                                <div className="flex items-center justify-between">
                                    <h2 className="text-md font-medium text-gray-900">{getFullAddress(optionObject?.contactInfo)}</h2>

                                </div>
                            </div>

                            {/*<button*/}
                            {/*    type="submit"*/}
                            {/*    className="mt-8 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"*/}
                            {/*>*/}
                            {/*    Join*/}
                            {/*</button>*/}

                            {/* Product details */}
                            <div className="mt-10">
                                <h2 className="text-sm font-medium text-gray-900">Description:</h2>

                                <div
                                    className="prose prose-sm text-gray-500"
                                    // dangerouslySetInnerHTML={{ __html: optionObject?.description }}
                                />
                                {optionObject?.description}
                            </div>

                            <div className="mt-8 border-t border-gray-200 pt-8">
                                <h2 className="text-sm font-medium text-gray-900">Dances</h2>

                                <div className="prose prose-sm mt-4 text-gray-500">
                                    <ul role="list">
                                        {optionObject?.dances.map((dance) => (
                                            <li key={dance.id}>{dance.name}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {typeOption === TYPE_OPTIONS.SCHOOL ? (
                                <>
                                    <div className="mt-8 border-y border-gray-200 py-8">
                                        <h2 className="text-sm font-medium text-gray-900">Administrators</h2>

                                        <div className="prose prose-sm mt-4 text-gray-500">
                                            <ul role="list">
                                                {optionObject?.administrators.map((dancer) => (
                                                    <li key={dancer.id}>
                                                        <a className="cursor-pointer">
                                                            {dancer.name} {dancer.lastName}
                                                        </a>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                    {optionObject?.teachers?.length > 0 && (
                                        <div className="mt-8 border-b border-gray-200 py-8">
                                            <h2 className="text-sm font-medium text-gray-900">Teachers</h2>

                                            <div className="prose prose-sm mt-4 text-gray-500">
                                                <ul role="list">
                                                    {optionObject.teachers.map((dancer) => (
                                                        <li key={dancer.id}>
                                                            <a className="cursor-pointer">
                                                                {dancer.name} {dancer.lastName}
                                                            </a>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <>
                                    <div className="mt-8 border-t border-gray-200 pt-8">
                                        <h2 className="text-sm font-medium text-gray-900">Organizers</h2>

                                        <div className="prose prose-sm mt-4 text-gray-500">
                                            <ul role="list">
                                                {optionObject?.organizers.map((dancer) => (
                                                    <li key={dancer.id}>
                                                        <a className="cursor-pointer">
                                                            {dancer.name} {dancer.lastName}
                                                        </a>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                    {optionObject?.schoolOrganizerId && (
                                        <div className="mt-8 border-y border-gray-200 pt-8">
                                            <h2 className="text-sm font-medium text-gray-900">School organizer:</h2>
                                            <a className="cursor-pointer">
                                                {optionObject.schoolOrganizerId}
                                            </a>
                                        </div>
                                    )}
                                </>
                            )}

                        </div>
                    </div>
                    <div>
                        {typeOption === TYPE_OPTIONS.SCHOOL && (
                            <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-12 lg:gap-x-8 lg:px-8 lg:pt-12 mt-5 lg:mt-1">
                                <div className="lg:col-span-4">
                                    <RatingComponent rerender={rerenderReview} setRerender={setRerenderReview}/>
                                </div>
                                <div className="mt-6 lg:col-span-7 lg:col-start-6 lg:mt-0">
                                    <ReviewComponent rerender={rerenderReview}/>
                                </div>
                            </div>

                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OverViewComponent
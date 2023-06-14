import React, {useEffect, useState} from "react";
import Spinner from "../spinner/Spinner";
import {getEvents} from "../../api/EventApi";
import CardContainerDeprecated from "../cardcontainer/CardContainerDeprecated";
import CardList from "../cardcontainer/CardList";
import {TYPE_OPTIONS} from "../dancer/profile/SchoolEventForm";
import Pagination from "../pagination/Pagination";
import {useValues} from "../../hooks/useValues";
import {MagnifyingGlassIcon} from "@heroicons/react/20/solid";
import ComboboxElement from "../forms/elements/ComboboxElement";

const EventsComponent = () => {

    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState();
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(6);
    const {eventSchoolPageSizeOptions} = useValues()

    useEffect(() => {
        setLoading(true);
        getEvents(page, size)
            .then(res => {
                setEvents(res.data.results);
                setTotal(res.data.total)
                setLoading(false);
            })
            .catch(error => {
                setLoading(false);
                console.log("error", error)
            });
    }, [page, size]);

    // if (loading){
    //     return (
    //         <div className="min-h-full flex items-center">
    //             <Spinner/>
    //         </div>
    //     )
    // }

    return (
        <div className="px-4 sm:px-6 lg:px-6 my-5">
            {loading && <Spinner/>}
            <div className="xl:flex sm:items-center justify-around">
                <div className="sm:flex-auto">
                    <h1 className="text-2xl font-semibold leading-6 text-gray-900 ml-2">Events</h1>
                </div>
                <div className="flex flex-1 justify-center my-3">
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
                                className="block w-full rounded-md border-0 bg-gray-700 py-1.5 pl-10 pr-3 text-gray-300 placeholder:text-gray-400
                                focus:bg-white focus:text-gray-900 focus:ring-0 sm:text-sm sm:leading-6"
                                placeholder="Event name"
                                type="search"
                            />
                        </div>
                    </div>
                </div>
                {/*<div className="xl:flex justify-between ">*/}
                {/*    <div className="flex">*/}
                {/*        <span className="inline-flex items-center px-3 text-gray-500 sm:text-sm">*/}
                {/*          country:*/}
                {/*        </span>*/}
                {/*        <ComboboxElement*/}
                {/*            value={country}*/}
                {/*            setValue={setCountry}*/}
                {/*            request={getCountries}*/}
                {/*        />*/}
                {/*    </div>*/}

                {/*    <div className="flex">*/}
                {/*        <span className="inline-flex items-center px-3 text-gray-500 sm:text-sm">*/}
                {/*          city:*/}
                {/*        </span>*/}
                {/*        <ComboboxElement*/}
                {/*            value={city}*/}
                {/*            setValue={setCity}*/}
                {/*            request={getCities}*/}
                {/*            // isDisable={country === null || country === ""}*/}
                {/*        />*/}
                {/*    </div>*/}
                {/*</div>*/}
                <div className="mt-4 ml-2 sm:ml-8 sm:mt-0 sm:flex-none mr-20">
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
            <CardList
                typeOption={TYPE_OPTIONS.EVENT}
                optionObjects={events}
            />
            <Pagination
                page={page}
                size={size}
                total={total}
                setPage={setPage}
                setSize={setSize}
                pageSizeOptions={eventSchoolPageSizeOptions}
            />
        </div>
    )
}

export default EventsComponent
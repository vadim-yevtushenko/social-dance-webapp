import React, {useEffect, useState} from "react";
import Spinner from "../spinner/Spinner";
import {getEvents} from "../../api/EventApi";
import CardList from "../cardcontainer/CardList";
import PaginationComponent from "../pagination/PaginationComponent";
import {useValues} from "../../hooks/useValues";
import {MagnifyingGlassIcon} from "@heroicons/react/20/solid";
import ComboboxElement from "../forms/elements/ComboboxElement";
import {GET} from "../../api/Endpoints";
import {useHttp} from "../../hooks/http.hook";
import {getSchools} from "../../api/SchoolApi";

const EventsOrSchoolsComponent = ({ typeOption }) => {

    const [optionObjects, setOptionObjects] = useState([]);
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState();
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(6);
    const {eventOrSchoolPageSizeOptions, TYPE_OPTIONS} = useValues()
    const [name, setName] = useState()
    const [city, setCity] = useState()
    const [country, setCountry] = useState()
    const {request} = useHttp();

    console.log("city", city)


    useEffect(() => {
        setLoading(true);
        if (typeOption === TYPE_OPTIONS.EVENT){
            getEvents(name, country, city, page, size)
                .then(res => {
                    setOptionObjects(res.data.results);
                    setTotal(res.data.total)
                    setLoading(false);
                })
                .catch(error => {
                    setLoading(false);
                    console.log("error", error)
                });
        }else {
            getSchools(name, country, city, page, size)
                .then(res => {
                    setOptionObjects(res.data.results);
                    setTotal(res.data.total)
                    setLoading(false);
                })
                .catch(error => {
                    setLoading(false);
                    console.log("error", error)
                });
        }
    }, [name, country, city, page, size]);

    const getCountries = (countryName) => request(GET.getCountries(countryName))

    const getCities = (cityName) => request(GET.getCities(cityName, country))

    return (
        <div className="px-4 sm:px-6 lg:px-6 my-5">
            {loading && <Spinner/>}
            <div className="xl:flex sm:items-center">
                <div className="sm:flex-none">
                    <h1 className="text-2xl font-semibold leading-6 text-gray-900 ml-2">
                        {typeOption === TYPE_OPTIONS.EVENT ? "Events" : "School"}
                    </h1>
                </div>
                <div className="flex flex-1 xl:justify-center my-3">
                    <div className="w-full max-w-lg ">
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
                                value={name}
                                onChange={event => setName(event.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <div className="sm:flex flex-1 ">
                    <div className="flex">
                        <span className="inline-flex items-center px-3 text-gray-500 sm:text-sm">
                          country:
                        </span>
                        <ComboboxElement
                            value={country}
                            setValue={setCountry}
                            request={getCountries}
                        />
                    </div>

                    <div className="flex">
                        <span className="inline-flex items-center px-3 text-gray-500 sm:text-sm">
                          city:
                        </span>
                        <ComboboxElement
                            value={city}
                            setValue={setCity}
                            request={getCities}
                            // isDisable={country === null || country === ""}
                        />
                    </div>
                </div>
            </div>
            <CardList
                typeOption={typeOption}
                optionObjects={optionObjects}
            />
            <PaginationComponent
                page={page}
                size={size}
                total={total}
                setPage={setPage}
                setSize={setSize}
                pageSizeOptions={eventOrSchoolPageSizeOptions}
            />
        </div>
    )
}

export default EventsOrSchoolsComponent
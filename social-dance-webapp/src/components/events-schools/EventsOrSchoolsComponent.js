import React, { useEffect, useState } from "react";
import { fetchEvents } from "../../api/EventApi";
import CardList from "./CardList";
import PaginationComponent from "../pagination/PaginationComponent";
import { useValues } from "../../hooks/useValues";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import LocationComboboxElement from "../forms/elements/LocationComboboxElement";
import { GET } from "../../api/Endpoints";
import { useHttp } from "../../hooks/http.hook";
import { fetchSchools } from "../../api/SchoolApi";
import { useDispatch, useSelector } from "react-redux";

const EventsOrSchoolsComponent = ({ typeOption }) => {

    const { eventOrSchoolPageSizeOptions, TYPE_OPTIONS } = useValues()
    const dispatch = useDispatch();
    const { total } = useSelector(state => state.lists)
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(6);
    const [name, setName] = useState()
    const [city, setCity] = useState("")
    const [country, setCountry] = useState("")
    const { request } = useHttp();

    useEffect(() => {
        if (typeOption === TYPE_OPTIONS.EVENT){
            dispatch(fetchEvents(name, country, city, page, size))
        }else {
            dispatch(fetchSchools(name, country, city, page, size))
        }
    }, [name, country, city, page, size]);

    const getCountries = (countryName) => request(GET.getCountries(countryName))

    const getCities = (cityName) => request(GET.getCities(cityName, country))

    return (
        <div className="grow px-4 sm:px-6 lg:px-6 my-5">
            <div className="xl:flex sm:items-center">
                <div className="sm:flex-none">
                    <h1 className="text-2xl font-semibold leading-6 text-gray-900 ml-2">
                        {typeOption === TYPE_OPTIONS.EVENT ? "Events" : "Schools"}
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
                        <LocationComboboxElement
                            value={country}
                            setValue={setCountry}
                            request={getCountries}
                        />
                    </div>

                    <div className="flex">
                        <span className="inline-flex items-center px-3 text-gray-500 sm:text-sm mr-7 sm:mr-0">
                          city:
                        </span>
                        <LocationComboboxElement
                            value={city}
                            setValue={setCity}
                            request={getCities}
                            isDisable={country === ""}
                        />
                    </div>
                </div>
            </div>
            <CardList
                typeOption={typeOption}
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
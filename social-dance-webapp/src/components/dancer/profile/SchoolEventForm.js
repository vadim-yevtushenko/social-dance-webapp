import { PhotoIcon } from "@heroicons/react/20/solid";
import DropDownList from "../../forms/DropDownList";
import ComboboxElement from "../../forms/ComboboxElement";
import CheckboxElement from "../../forms/CheckboxElement";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useValues } from "../../../hooks/useValues";
import { useHttp } from "../../../hooks/http.hook";
import { useForm } from "react-hook-form";
import { eventMapper, schoolMapper } from "../../../util/mapper";
import { GET, POST } from "../../../api/Endpoints";
import { joinDateString } from "../../../util/dateTimeUtils";

export const TYPE_OPTIONS = {
    SCHOOL: "school",
    EVENT: "event"
}

const SchoolEventForm = ({typeOption, optionObject}) => {

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const {isAuthenticated, dancer} = useSelector(state => state.auth)
    const [city, setCity] = useState(optionObject?.contactInfo?.city)
    const [country, setCountry] = useState(optionObject?.contactInfo?.country)
    const [dances, setDances] = useState(optionObject?.dances);
    const [image, setImage] = useState(optionObject?.image);
    const [sMonth, setSMonth] = useState("");
    const [fMonth, setFMonth] = useState("");
    const { months } = useValues()
    const {request} = useHttp();
    const { register, handleSubmit, formState: { errors } } = useForm()
    console.log("optionObject", optionObject)
    useEffect(() => {
        if (!isAuthenticated){
            navigate("/events")
        }
        else if (typeOption === TYPE_OPTIONS.EVENT){
            const startMonth = optionObject?.dateEvent?.split("-")[1]
            const finishMonth = optionObject?.dateFinishEvent?.split("-")[1]
            setSMonth(months.find(mon => mon.id === startMonth)?.name);
            setFMonth(months.find(mon => mon.id === finishMonth)?.name);
        }
    }, [isAuthenticated])

    const onSubmit = (data) => {

        setLoading(true)
        const contactInfo = { email: data.email, phoneNumber: data.phoneNumber, country, city }
        if (typeOption === TYPE_OPTIONS.SCHOOL){
            const newSchool = schoolMapper(null, data.name, data.description, dances, contactInfo, image, [dancer])
            console.log("newSchool", newSchool)
            // const create = () => request(POST.saveSchool(), "POST", JSON.stringify(newSchool))
            // create()
            //     .then(res => {
            //         console.log(res)
            //         setLoading(false);
            //     })
            //     .catch(error => {
            //         console.log("error", error)
            //         setLoading(false);
            //     })
        }else {
            const startDate = joinDateString(data.sYear, sMonth, data.sDay, months) + "T19:00+00:00"
            const finishDate = joinDateString(data.sYear, sMonth, data.sDay, months) + "T02:00+00:00"
            const newEvent = eventMapper(null, data.name, data.description, dances, contactInfo, image,
                startDate, finishDate, [dancer])
            console.log("newEvent", newEvent)

            const create = () => request(POST.saveEvent(), "POST", JSON.stringify(newEvent))
            create()
                .then(res => {
                    console.log(res)
                    setLoading(false);
                })
                .catch(error => {
                    console.log("error", error)
                    setLoading(false);
                })
        }

    }

    const getCountries = (countryName) => request(GET.getCountries(countryName))

    const getCities = (cityName) => request(GET.getCities(cityName, country))

    return(
        <form className="md:col-span-2" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
                <div className="sm:col-span-full">
                    <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                        Photo
                    </label>
                    <div className="mt-2 sm:col-span-2 sm:mt-0">
                        <div className="flex max-w-2xl justify-center rounded-lg border border-1 border-gray-900 px-6 py-10 shadow-md">
                            <div className="text-center">
                                <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                    <label
                                        htmlFor="file-upload"
                                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none
                                                        focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                    >
                                        <span>Upload a file</span>
                                        <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                                    </label>
                                    <p className="pl-1">or drag and drop</p>
                                </div>
                                <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="sm:col-span-full">
                    <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-black">
                        Name
                    </label>
                    <div className="mt-2">
                        <input
                            type="text"
                            name="name"
                            id="name"
                            autoComplete="name"
                            {...register('name', { value: optionObject?.name, required: true, maxLength: 60 })}
                            className="block w-full rounded-md border-1 bg-white/5 py-1.5 text-black shadow-md ring-1 ring-inset
                                        ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                        />
                        {errors?.name?.type === "required" && <p className="text-xs leading-5 text-red-700">Name is required</p>}
                    </div>
                </div>

                {typeOption === TYPE_OPTIONS.EVENT && (<>
                        <div className="col-span-full">
                            <label htmlFor="birthday" className="block text-sm font-medium leading-6 text-black">
                                Start event
                            </label>
                            <div className="flex mt-2 justify-around">
                                <div className="flex w-10 rounded-md bg-white/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500">
                                    <input
                                        type="text"
                                        name="sDay"
                                        id="sDay"
                                        autoComplete="sDay"
                                        {...register('sDay', { value: optionObject?.dateEvent?.split("-")[2], maxLength: 2, minLength: 2, min: 1, max: 31 })}
                                        className="flex-1 w-10 rounded-md shadow-md border-1 bg-transparent py-1.5 pl-1 text-black focus:ring-0 sm:text-sm sm:leading-6"
                                        placeholder="day"
                                    />
                                </div>
                                <div className="flex">
                                    <DropDownList
                                        disabled={false}
                                        startOption={sMonth}
                                        setOption={setSMonth}
                                        options={months.map(month => month.name)}
                                    />
                                </div>
                                <div className="flex w-20 rounded-md bg-white/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500">
                                    <input
                                        type="text"
                                        name="sYear"
                                        id="sYear"
                                        autoComplete="sYear"
                                        {...register('sYear', { value: optionObject?.dateEvent?.split("-")[0], maxLength: 4, minLength: 4, min: 1900, max: 2100 })}
                                        className="flex-1 w-20 rounded-md shadow-md border-1 bg-transparent py-1.5 pl-1 text-black focus:ring-0 sm:text-sm sm:leading-6"
                                        placeholder="year"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="col-span-full">
                            <label htmlFor="birthday" className="block text-sm font-medium leading-6 text-black">
                                Finish event
                            </label>
                            <div className="flex mt-2 justify-around">
                                <div className="flex w-10 rounded-md bg-white/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500">
                                    <input
                                        type="text"
                                        name="fDay"
                                        id="fDay"
                                        autoComplete="fDay"
                                        {...register('fDay', { value: optionObject?.dateFinishEvent?.split("-")[2], maxLength: 2, minLength: 2, min: 1, max: 31 })}
                                        className="flex-1 w-10 rounded-md shadow-md border-1 bg-transparent py-1.5 pl-1 text-black focus:ring-0 sm:text-sm sm:leading-6"
                                        placeholder="day"
                                    />
                                </div>
                                <div className="flex">
                                    <DropDownList
                                        disabled={false}
                                        startOption={fMonth}
                                        setOption={setFMonth}
                                        options={months.map(month => month.name)}
                                    />
                                </div>
                                <div className="flex w-20 rounded-md bg-white/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500">
                                    <input
                                        type="text"
                                        name="fYear"
                                        id="fYear"
                                        autoComplete="fYear"
                                        {...register('fYear', { value: optionObject?.dateFinishEvent?.split("-")[0], maxLength: 4, minLength: 4, min: 1900, max: 2100 })}
                                        className="flex-1 w-20 rounded-md shadow-md border-1 bg-transparent py-1.5 pl-1 text-black focus:ring-0 sm:text-sm sm:leading-6"
                                        placeholder="year"
                                    />
                                </div>
                            </div>
                        </div>
                    </>

                )}

                <div className="sm:col-span-3">
                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-black">
                        Email address
                    </label>
                    <div className="mt-2">
                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            placeholder='youremail@example.com'
                            {...register('email', { value: optionObject?.contactInfo?.email, maxLength: 60, minLength: 5 })}
                            className="block w-full rounded-md border-1 bg-white/5 py-1.5 text-black shadow-md ring-1 ring-inset
                                        ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>

                <div className="sm:col-span-3">
                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-black">
                        Phone
                    </label>
                    <div className="mt-2">
                        <input
                            id="phoneNumber"
                            name="phoneNumber"
                            type="text"
                            autoComplete="phoneNumber"
                            placeholder="+* (***) ***-****"
                            {...register('phoneNumber', { value: optionObject?.contactInfo?.phoneNumber, maxLength: 60, minLength: 12 })}
                            className="block w-full rounded-md border-1 bg-white/5 py-1.5 text-black shadow-md ring-1 ring-inset
                                        ring-black/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>

                <div className="col-span-full">
                    <label htmlFor="location" className="block text-sm font-medium leading-6 text-black">
                        Location
                    </label>

                    <div className="mt-2 flex justify-between">
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

                <div className="col-span-full">
                    <label htmlFor="about" className="block text-sm font-medium leading-6 text-black">
                        Description
                    </label>

                    <div className="mt-2 sm:col-span-2 ">
                                    <textarea
                                        id="description"
                                        name="description"
                                        rows={4}
                                        className="block w-full max-w-2xl rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset
                                        ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        {...register('description', { value: optionObject?.description, maxLength: 600 })}
                                    />
                        <p className="mt-1 text-sm leading-6 text-gray-600">Write a few sentences about your {typeOption}.</p>
                    </div>
                </div>

                <div className="col-span-full mb-12">
                    <label htmlFor="about" className="block text-md font-medium leading-6 text-black">
                        Dances
                    </label>
                    <CheckboxElement
                        checkedDances={dances?.map(dance => dance.name)}
                        setDances={setDances}
                    />
                </div>
            </div>

            <div className="mt-8 flex">
                <button
                    type="submit"
                    className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                >
                    Save {typeOption}
                </button>
            </div>
        </form>
    )

}

export default SchoolEventForm
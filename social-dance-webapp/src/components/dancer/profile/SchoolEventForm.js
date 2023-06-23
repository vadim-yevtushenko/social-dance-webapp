import DropDownListElement from "../../forms/elements/DropDownListElement";
import ComboboxElement from "../../forms/elements/ComboboxElement";
import CheckboxElement from "../../forms/elements/CheckboxElement";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import { useValues } from "../../../hooks/useValues";
import { useHttp } from "../../../hooks/http.hook";
import { useForm } from "react-hook-form";
import { eventMapper, schoolMapper } from "../../../util/mapper";
import { GET, POST } from "../../../api/Endpoints";
import {joinDateString, joinDateTimeString} from "../../../util/dateTimeUtils";
import { getAdministratedSchool } from "../../../redux/actions/schoolActions";
import { getOrganizedEvent } from "../../../redux/actions/eventActions";
import { updateDancer } from "../../../redux/actions/authActions";
import {deleteSchoolImage, uploadSchoolImage} from "../../../api/SchoolApi";
import {useUpload} from "../../../hooks/useUpload";
import {deleteEventImage, uploadEventImage} from "../../../api/EventApi";
import {PhotoIcon} from "@heroicons/react/24/solid";

const SchoolEventForm = ({typeOption, optionObject}) => {

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {isAuthenticated, dancer} = useSelector(state => state.auth)
    const [city, setCity] = useState(optionObject.contactInfo?.city)
    const [country, setCountry] = useState(optionObject.contactInfo?.country)
    const [dances, setDances] = useState(optionObject.dances);
    const [sMonth, setSMonth] = useState("");
    const [fMonth, setFMonth] = useState("");
    const { months, TYPE_OPTIONS } = useValues()
    const {request} = useHttp();
    const { register, handleSubmit, formState: { errors }, setValue } = useForm()
    const [image, setImage] = useState()
    const [imageUrl, setImageUrl] = useState(optionObject.image)
    const {checkSize} = useUpload()

    useEffect(() => {
        if (!isAuthenticated){
            navigate("/events")
        }
    }, [isAuthenticated])

    useEffect(() => {
        setValue('name', optionObject.name)
        setValue('email', optionObject.contactInfo?.email)
        setValue('phoneNumber', optionObject.contactInfo?.phoneNumber)
        setValue('description', optionObject.description)
        setDances(optionObject.dances)
        setCountry(optionObject.contactInfo?.country)
        setCity(optionObject.contactInfo?.city)
        setImageUrl(optionObject.image)
        if (typeOption === TYPE_OPTIONS.EVENT){
            const sDate = optionObject?.dateEvent?.split("T")[0]
            const sTime = optionObject?.dateEvent?.split("T")[1]
            const fDate = optionObject?.dateFinishEvent?.split("T")[0]
            const fTime = optionObject?.dateFinishEvent?.split("T")[1]
            const startMonth = sDate?.split("-")[1]
            const finishMonth = fDate?.split("-")[1]
            setSMonth(months.find(mon => mon.id === startMonth)?.name);
            setFMonth(months.find(mon => mon.id === finishMonth)?.name);
            setValue('sDay', sDate?.split("-")[2])
            setValue('sYear', sDate?.split("-")[0])
            setValue('fDay', fDate?.split("-")[2])
            setValue('fYear', fDate?.split("-")[0])
            setValue('sHour', sTime?.split(":")[0])
            setValue('sMinute', sTime?.split(":")[1])
            setValue('fHour', fTime?.split(":")[0])
            setValue('fMinute', fTime?.split(":")[1])
        }
    }, [optionObject])

    const onSubmit = (data) => {

        setLoading(true)
        const contactInfo = { email: data.email, phoneNumber: data.phoneNumber, country, city }
        if (typeOption === TYPE_OPTIONS.SCHOOL){
            const newSchool = schoolMapper(null, data.name, data.description, dances, contactInfo, imageUrl, [dancer])
            const save = () => request(POST.saveSchool(), "POST", JSON.stringify(newSchool))
            save()
                .then(res => {
                    console.log(res)
                    dispatch(getAdministratedSchool(res))
                    setLoading(false);
                })
                .catch(error => {
                    console.log("error", error)
                    setLoading(false);
                })
        }else {
            const startDate = joinDateTimeString(data.sYear, sMonth, data.sDay, data.sHour, data.sMinute, months)
            const finishDate = joinDateTimeString(data.fYear, fMonth, data.fDay, data.fHour, data.fMinute, months)
            const newEvent = eventMapper(null, data.name, data.description, dances, contactInfo, imageUrl,
                startDate, finishDate, [dancer])
            console.log("newEvent", newEvent)
            const save = () => request(POST.saveEvent(), "POST", JSON.stringify(newEvent))
            save()
                .then(res => {
                    console.log(res)
                    dispatch(getOrganizedEvent(res))
                    setLoading(false);
                })
                .then(() => {
                    refreshDancer()
                })
                .catch(error => {
                    console.log("error", error)
                    setLoading(false);
                })
        }

    }

    const refreshDancer = () => {
        setLoading(true);
        const getDancer = () => request(GET.getDancer(dancer.id))
        getDancer()
            .then(res => {
                dispatch(updateDancer(res))
                setLoading(false);
            })
            .catch(error => {
                console.log("error", error)
                setLoading(false);
            })
    }

    const uploadImage = () => {
        if (!!image) {
            if (!checkSize(1024, image)) {
                setLoading(true)
                const formData = new FormData();
                formData.append('file', image);
                if (typeOption === TYPE_OPTIONS.SCHOOL) {
                    uploadSchoolImage(optionObject.id, formData)
                        .then(res => {
                            setImageUrl(res.data)
                            setImage(null)
                            console.log(res);
                            setLoading(false)
                        })
                        .catch(res => {
                            //handle error
                            console.log(res);
                            setLoading(false)
                        });
                }else {
                    uploadEventImage(optionObject.id, formData)
                        .then(res => {
                            setImageUrl(res.data)
                            setImage(null)
                            console.log(res);
                            setLoading(false)
                        })
                        .catch(res => {
                            //handle error
                            console.log(res);
                            setLoading(false)
                        });
                }
            }
        }
    }

    const deleteImage = () => {
        if (optionObject.image){
            setLoading(true)
            if (typeOption === TYPE_OPTIONS.SCHOOL){
                deleteSchoolImage(optionObject.id)
                    .then(() => {
                        setImageUrl(null)
                        setImage(null)
                        setValue('file-upload', null)
                        setLoading(false)
                    })
                    .catch(error => {
                        console.log("error", error)
                        setLoading(false);
                    })
            }else {
                deleteEventImage(optionObject.id)
                    .then(() => {
                        setImageUrl(null)
                        setImage(null)
                        setValue('file-upload', null)
                        setLoading(false)
                    })
                    .catch(error => {
                        console.log("error", error)
                        setLoading(false);
                    })
            }

        }else {
            setImageUrl(null)
            setImage(null)
            setValue('file-upload', null)
        }
    }

    const selectImage = (image) => {
        setImage(image)
        setImageUrl(URL.createObjectURL(image))
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
                        <div className="flex max-w-2xl justify-center rounded-lg border border-1 border-gray-900 shadow-md ">
                            <div className="text-center">
                                <div className="flex text-sm leading-6 text-gray-600">
                                    <label
                                        htmlFor="file-upload"
                                        className="relative cursor-pointer rounded-md  font-semibold text-indigo-600 focus-within:outline-none
                                                        focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                    >
                                        {imageUrl ? (
                                            <img
                                                src={imageUrl}
                                                alt="Photo"
                                                className="max-w-xl flex-none rounded-lg bg-gray-300 object-cover"
                                            />
                                        ) : (
                                            <PhotoIcon className="h-40 w-40 text-gray-300 hover:text-indigo-500" aria-hidden="true" />
                                        )}
                                        <input
                                            id="file-upload"
                                            name="file-upload"
                                            type="file"
                                            className="sr-only"
                                            {...register('file-upload')}
                                            onChange={(e) => selectImage(e.target.files[0])}
                                        />
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-around mt-3">
                            <button
                                type="button"
                                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
                                onClick={uploadImage}
                            >
                                Change image
                            </button>
                            <p className="my-1 text-xs leading-5 text-gray-400">JPG, GIF or PNG. 10MB max.</p>
                            {imageUrl && (
                                <button
                                    type="button"
                                    className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500"
                                    onClick={deleteImage}
                                >
                                    Delete image
                                </button>
                            )}
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
                                        {...register('sDay', { maxLength: 2, minLength: 2, min: 1, max: 31 })}
                                        className="flex-1 w-10 rounded-md shadow-md border-1 bg-transparent py-1.5 pl-1 text-black focus:ring-0 sm:text-sm sm:leading-6"
                                        placeholder="day"
                                    />
                                </div>
                                <div className="flex">
                                    <DropDownListElement
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
                                        {...register('sYear', { maxLength: 4, minLength: 4, min: 1900, max: 2100 })}
                                        className="flex-1 w-20 rounded-md shadow-md border-1 bg-transparent py-1.5 pl-1 text-black focus:ring-0 sm:text-sm sm:leading-6"
                                        placeholder="year"
                                    />
                                </div>
                                <div className="flex items-center">
                                    <div className="flex w-10 rounded-md bg-white/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500">
                                        <input
                                            type="text"
                                            name="sHour"
                                            id="sHour"
                                            autoComplete="sHour"
                                            {...register('sHour', { maxLength: 2, minLength: 2, min: 0, max: 23 })}
                                            className="flex-1 w-10 rounded-md shadow-md border-1 bg-transparent py-1.5 pl-1 text-black focus:ring-0 sm:text-sm sm:leading-6"
                                            placeholder="h"
                                        />
                                    </div>
                                    <span className="text-xl">&nbsp;:&nbsp;</span>
                                    <div className="flex w-10 rounded-md bg-white/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500">
                                        <input
                                            type="text"
                                            name="sMinute"
                                            id="sMinute"
                                            autoComplete="sMinute"
                                            {...register('sMinute', { maxLength: 2, minLength: 2, min: 0, max: 59 })}
                                            className="flex-1 w-10 rounded-md shadow-md border-1 bg-transparent py-1.5 pl-1 text-black focus:ring-0 sm:text-sm sm:leading-6"
                                            placeholder="m"
                                        />
                                    </div>
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
                                        {...register('fDay', { maxLength: 2, minLength: 2, min: 1, max: 31 })}
                                        className="flex-1 w-10 rounded-md shadow-md border-1 bg-transparent py-1.5 pl-1 text-black focus:ring-0 sm:text-sm sm:leading-6"
                                        placeholder="day"
                                    />
                                </div>
                                <div className="flex">
                                    <DropDownListElement
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
                                        {...register('fYear', { maxLength: 4, minLength: 4, min: 1900, max: 2100 })}
                                        className="flex-1 w-20 rounded-md shadow-md border-1 bg-transparent py-1.5 pl-1 text-black focus:ring-0 sm:text-sm sm:leading-6"
                                        placeholder="year"
                                    />
                                </div>
                                <div className="flex items-center">
                                    <div className="flex w-10 rounded-md bg-white/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500">
                                        <input
                                            type="text"
                                            name="fHour"
                                            id="fHour"
                                            autoComplete="fHour"
                                            {...register('fHour', { maxLength: 2, minLength: 2, min: 0, max: 23 })}
                                            className="flex-1 w-10 rounded-md shadow-md border-1 bg-transparent py-1.5 pl-1 text-black focus:ring-0 sm:text-sm sm:leading-6"
                                            placeholder="h"
                                        />
                                    </div>
                                    <span className="text-xl">&nbsp;:&nbsp;</span>
                                    <div className="flex w-10 rounded-md bg-white/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500">
                                        <input
                                            type="text"
                                            name="fMinute"
                                            id="fMinute"
                                            autoComplete="fMinute"
                                            {...register('fMinute', { maxLength: 2, minLength: 2, min: 0, max: 59 })}
                                            className="flex-1 w-10 rounded-md shadow-md border-1 bg-transparent py-1.5 pl-1 text-black focus:ring-0 sm:text-sm sm:leading-6"
                                            placeholder="m"
                                        />
                                    </div>
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
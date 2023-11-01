import DropDownListElement from "../../forms/elements/DropDownListElement";
import LocationComboboxElement from "../../forms/elements/LocationComboboxElement";
import CheckboxElement from "../../forms/elements/CheckboxElement";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useValues} from "../../../hooks/useValues";
import {useHttp} from "../../../hooks/http.hook";
import {useForm} from "react-hook-form";
import {eventMapper, schoolMapper} from "../../../util/mapper";
import {GET} from "../../../api/Endpoints";
import {getMonthNumber, joinDateTimeString} from "../../../util/dateTimeUtils";
import {deleteSchoolImage, fetchAdministratedSchool, saveSchool, uploadSchoolImage} from "../../../api/SchoolApi";
import {useUpload} from "../../../hooks/useUpload";
import {deleteEventImage, fetchOrganizedEvent, saveEvent, uploadEventImage} from "../../../api/EventApi";
import {PhotoIcon} from "@heroicons/react/24/solid";
import {fetchDancer} from "../../../api/DancerApi";
import MapComponent from "../../events-schools/MapComponent";
import DialogComponent from "../../modals/DialogComponent";
import EditSchoolAdministratorsForm from "./administrate/EditSchoolAdministratorsForm";

const SchoolEventForm = ({ typeOption }) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { months, TYPE_OPTIONS } = useValues()
    const { isAuthenticated, dancer } = useSelector(state => state.auth)
    const { administratedSchool } = useSelector(state => state.mySchools)
    const { organizedEvent } = useSelector(state => state.myEvents)
    const [optionObject, setOptionObject] = useState(typeOption === TYPE_OPTIONS.EVENT ? organizedEvent : administratedSchool)
    const [city, setCity] = useState(optionObject?.contactInfo?.city || "")
    const [country, setCountry] = useState(optionObject?.contactInfo?.country || "")
    const [lat, setLat] = useState(optionObject?.contactInfo?.latitude)
    const [lng, setLng] = useState(optionObject?.contactInfo?.latitude)
    const [dances, setDances] = useState(optionObject.dances);
    const [sMonth, setSMonth] = useState("");
    const [fMonth, setFMonth] = useState("");
    const { request } = useHttp();
    const { register, handleSubmit, formState: { errors }, getValues, setValue, setError } = useForm()
    const [image, setImage] = useState()
    const [imageUrl, setImageUrl] = useState(optionObject.image)
    const [enableSetLocation, setEnableSetLocation] = useState(optionObject?.contactInfo?.latitude && optionObject?.contactInfo?.longitude)
    const { resizeImage } = useUpload()
    const [openDancesDialog, setOpenDancesDialog] = useState(false)
    const [openAdministratorsDialog, setOpenAdministratorsDialog] = useState(false)
    const [schoolOrganizer, setSchoolOrganizer] = useState(optionObject?.schoolOrganizer)
    const [administrators, setAdministrators] = useState(optionObject?.administrators)

    useEffect(() => {
        if (errors?.sDate?.type === "validate"
            && new Date(getValues().sYear, getMonthNumber(sMonth), getValues().sDay, getValues().sHour, getValues().sMinute) > new Date()){
            setError('sDate', null)
        }
        if (errors?.fDate?.type === "validate"
            && new Date(getValues().sYear, getMonthNumber(sMonth), getValues().sDay, getValues().sHour, getValues().sMinute) < new Date(new Date(getValues().fYear, getMonthNumber(fMonth), getValues().fDay, getValues().fHour, getValues().fMinute))){
            setError('fDate', null)
        }
    }, [useValues(), sMonth, fMonth])

    useEffect(() => {
        if (!isAuthenticated){
            navigate("/events")
        }
    }, [isAuthenticated])

    useEffect(() => {
        if (!city){
            setLat(null)
            setLng(null)
        }else if (city && lat && lng) {
            setEnableSetLocation(true)
        }
    }, [city])

    useEffect(() => {
        if (typeOption === TYPE_OPTIONS.EVENT){
            setOptionObject(organizedEvent)
        }else {
            setOptionObject(administratedSchool)
        }
    }, [administratedSchool, organizedEvent])

    useEffect(() => {
        setValue('name', optionObject.name)
        setValue('email', optionObject.contactInfo?.email)
        setValue('phoneNumber', optionObject.contactInfo?.phoneNumber)
        setValue('address', optionObject.contactInfo?.address)
        setValue('description', optionObject.description)
        setDances(optionObject.dances)
        setCountry(optionObject.contactInfo?.country || "")
        setCity(optionObject.contactInfo?.city || "")
        setLat(optionObject?.contactInfo?.latitude)
        setLng(optionObject?.contactInfo?.longitude)
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
            setSchoolOrganizer(optionObject?.schoolOrganizer)
        }else {
            setAdministrators(optionObject?.administrators?.length > 0 ? optionObject?.administrators : [dancer])
        }
    }, [optionObject])

    const onSubmit = (data) => {
        const latitude = enableSetLocation ? lat : null
        const longitude = enableSetLocation ? lng : null
        const contactInfo = { email: data.email, phoneNumber: data.phoneNumber, country, city, address: data.address, latitude, longitude }
        const socialNetworks = { instagram: data.instagram, facebook: data.facebook, youtube: data.youtube }
        if (typeOption === TYPE_OPTIONS.SCHOOL){
            const newSchool = schoolMapper(optionObject?.id, data.name, data.description, dances, contactInfo, socialNetworks, imageUrl, administrators)
            dispatch(saveSchool(newSchool, dancer.id))
        }else {
            const startDate = joinDateTimeString(data.sYear, sMonth, data.sDay, data.sHour, data.sMinute, months)
            const finishDate = joinDateTimeString(data.fYear, fMonth, data.fDay, data.fHour, data.fMinute, months)
            const newEvent = eventMapper(optionObject?.id, data.name, data.description, dances, contactInfo, socialNetworks,
                imageUrl, startDate, finishDate, [dancer], schoolOrganizer)
            dispatch(saveEvent(newEvent))
                .then(() => {
                    dispatch(fetchDancer(dancer.id))
                })
        }
    }

    const uploadImage = () => {
        if (!!image) {
            resizeImage(image, 1028000, 700, 700)
                .then(file => {
                    const formData = new FormData();
                    formData.append('file', file);
                    if (typeOption === TYPE_OPTIONS.SCHOOL) {
                        dispatch(uploadSchoolImage(optionObject.id, formData))
                            .then(() => {
                                dispatch(fetchAdministratedSchool(optionObject.id))
                                setImage(null)
                            })
                    }else {
                        dispatch(uploadEventImage(optionObject.id, formData))
                            .then(() => {
                                dispatch(fetchOrganizedEvent(optionObject.id))
                                setImage(null)
                            })
                    }
                })
        }
    }

    const deleteImage = () => {
        if (optionObject.image){
            if (typeOption === TYPE_OPTIONS.SCHOOL){
                dispatch(deleteSchoolImage(optionObject.id))
                    .then(() => {
                        dispatch(fetchAdministratedSchool(optionObject.id))
                        setImageUrl(null)
                        setImage(null)
                        setValue('file-upload', null)
                    })

            }else {
                dispatch(deleteEventImage(optionObject.id))
                    .then(() => {
                        dispatch(fetchOrganizedEvent(optionObject.id))
                        setImageUrl(null)
                        setImage(null)
                        setValue('file-upload', null)
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

    const toggleEnableGeolocation = () => {
        if(enableSetLocation){
            setLat(null)
            setLng(null)
        }
        if (!enableSetLocation && city && country && !lat && !lng){
            getCities(city)
                .then(res => {
                    const cityObj = res[0]
                    setLat(cityObj.lat)
                    setLng(cityObj.lng)
                })
                .then(() => setEnableSetLocation(!enableSetLocation))
        }else {
            setEnableSetLocation(!enableSetLocation)
        }
    }

    const changeSchoolOrganizer = () => {
        if (schoolOrganizer === null){
            setSchoolOrganizer(dancer.administrator)
        }else {
            setSchoolOrganizer(null)
        }
    }

    const getCountries = (countryName) => request(GET.getCountries(countryName))

    const getCities = (cityName) => request(GET.getCities(cityName, country))

    return(
        <form className="md:col-span-2" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
                {optionObject.id && (
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
                                <p className="my-1 text-xs leading-5 text-gray-400">JPG, JPEG or PNG. 1MB max.</p>
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
                )}

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
                            <div
                                className="flex mt-2 justify-around"
                                {...register('sDate', {
                                    validate: (value) => {
                                        if (new Date(getValues().sYear, getMonthNumber(sMonth), getValues().sDay, getValues().sHour, getValues().sMinute) < new Date()){
                                            return "Start event date must be later then current date time.";
                                        }
                                    },
                                })}
                            >
                                <div className="flex w-10 rounded-md bg-white/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500">
                                    <input
                                        type="text"
                                        name="sDay"
                                        id="sDay"
                                        autoComplete="sDay"
                                        {...register('sDay', { required: true, minLength: 2, min: 1, max: 31,
                                            validate: (value) => {
                                                if (!sMonth) {
                                                    return "Month is required.";
                                                }
                                            },})}
                                        className="flex-1 w-10 rounded-md shadow-md border-1 bg-transparent py-1.5 pl-1 text-black focus:ring-0 sm:text-sm sm:leading-6"
                                        placeholder="day"
                                    />
                                </div>
                                <div className="flex">
                                    <DropDownListElement
                                        disabled={false}
                                        startOption={sMonth !== undefined ? sMonth : ""}
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
                                        {...register('sYear', { required: true, maxLength: 4, minLength: 4 })}
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
                                            {...register('sHour', { required: true, maxLength: 2, minLength: 2, min: 0, max: 23 })}
                                            className="flex-1 w-10 rounded-md shadow-md border-1 bg-transparent py-1.5 pl-1 text-black focus:ring-0 sm:text-sm sm:leading-6"
                                            placeholder="h"
                                        />
                                    </div>
                                    <span className="text-xl">&nbsp;:&nbsp;</span>
                                    <div className="flex w-10 rounded-md bg-white/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500">
                                        <input
                                            type="text"
                                            id="sMinute"
                                            name="sMinute"
                                            autoComplete="sMinute"
                                            {...register('sMinute', { required: true, maxLength: 2, minLength: 2, min: 0, max: 59 })}
                                            className="flex-1 w-10 rounded-md shadow-md border-1 bg-transparent py-1.5 pl-1 text-black focus:ring-0 sm:text-sm sm:leading-6"
                                            placeholder="m"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="grid mt-1">
                                {errors?.sDay?.type === "required"
                                    || errors?.sYear?.type === "required"
                                    || errors?.sHour?.type === "required"
                                    || errors?.sMinute?.type === "required"
                                    && <p className="text-xs leading-5 text-red-700">Field is required.</p>}
                                {errors?.sDay?.type === "minLength" && <p className="text-xs leading-5 text-red-700">Day format: 01 ... 09.</p>}
                                {errors?.sDay?.type === "max" || errors?.fDay?.type === "min" &&  <p className="text-xs leading-5 text-red-700">Input number from 01 to 31.</p>}
                                {errors?.sDay?.type === "validate" && <p className="text-xs leading-5 text-red-700">{errors.sDay.message}</p>}
                                {errors?.sYear?.type === "minLength" && <p className="justify-self-center translate-x-12 pl-12 text-xs leading-5 text-red-700">Year format: yyyy.</p>}
                                {errors?.sHour?.type === "minLength" && <p className="justify-self-end text-xs leading-5 text-red-700">Hour format: 01 ... 09.</p>}
                                {errors?.sMinute?.type === "minLength" && <p className="justify-self-end text-xs leading-5 text-red-700">Minute format: 01 ... 09.</p>}
                                {errors?.sDate?.type === "validate" && <p className="text-xs leading-5 text-red-700">{errors.sDate.message}</p>}
                            </div>
                        </div>

                        <div className="col-span-full">
                            <label htmlFor="birthday" className="block text-sm font-medium leading-6 text-black">
                                Finish event
                            </label>
                            <div
                                className="flex mt-2 justify-around"
                                {...register('fDate', {
                                    validate: (value) => {
                                        if (new Date(getValues().sYear, getMonthNumber(sMonth), getValues().sDay, getValues().sHour, getValues().sMinute) > new Date(new Date(getValues().fYear, getMonthNumber(fMonth), getValues().fDay, getValues().fHour, getValues().fMinute))){
                                            return "Finish event date must be later then start event date.";
                                        }
                                    },
                                })}
                            >
                                <div className="flex w-10 rounded-md bg-white/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500">
                                    <input
                                        type="text"
                                        name="fDay"
                                        id="fDay"
                                        autoComplete="fDay"
                                        {...register('fDay', { required: true, minLength: 2, min: 1, max: 31,
                                            validate: (value) => {
                                                if (!fMonth) {
                                                    return "Month is required.";
                                                }
                                            },})}
                                        className="flex-1 w-10 rounded-md shadow-md border-1 bg-transparent py-1.5 pl-1 text-black focus:ring-0 sm:text-sm sm:leading-6"
                                        placeholder="day"
                                    />
                                </div>
                                <div className="flex">
                                    <DropDownListElement
                                        disabled={false}
                                        startOption={fMonth !== undefined ? fMonth : ""}
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
                                        {...register('fYear', { maxLength: 4, minLength: 4 })}
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
                                            {...register('fHour', { required: true, minLength: 2, min: 0, max: 23 })}
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
                                            {...register('fMinute', { required: true, minLength: 2, min: 0, max: 59 })}
                                            className="flex-1 w-10 rounded-md shadow-md border-1 bg-transparent py-1.5 pl-1 text-black focus:ring-0 sm:text-sm sm:leading-6"
                                            placeholder="m"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="grid mt-1">
                                {errors?.fDay?.type === "required"
                                    || errors?.fYear?.type === "required"
                                    || errors?.fHour?.type === "required"
                                    || errors?.fMinute?.type === "required"
                                    && <p className="text-xs leading-5 text-red-700">Field is required.</p>}
                                {errors?.fDay?.type === "minLength" && <p className="text-xs leading-5 text-red-700">Day format: 01 ... 09.</p>}
                                {errors?.fDay?.type === "max" || errors?.fDay?.type === "min" &&  <p className="text-xs leading-5 text-red-700">Input number from 01 to 31.</p>}
                                {errors?.fDay?.type === "validate" && <p className="text-xs leading-5 text-red-700">{errors.fDay.message}</p>}
                                {errors?.fYear?.type === "minLength" && <p className="justify-self-center translate-x-12 pl-12 text-xs leading-5 text-red-700">Year format: yyyy.</p>}
                                {errors?.fHour?.type === "minLength" && <p className="justify-self-end text-xs leading-5 text-red-700">Hour format: 01 ... 09.</p>}
                                {errors?.fMinute?.type === "minLength" && <p className="justify-self-end text-xs leading-5 text-red-700">Minute format: 01 ... 09.</p>}
                                {errors?.fDate?.type === "validate" && <p className="text-xs leading-5 text-red-700">{errors.fDate.message}</p>}
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
                        Social networks
                    </label>

                    <div className="mt-2 sm:flex sm:justify-between">
                        <span className="inline-flex items-center px-3 text-gray-500 sm:text-sm">
                          instagram:
                        </span>
                        <input
                            type="text"
                            name="instagram"
                            id="instagram"
                            autoComplete="instagram"
                            {...register('instagram', { value: optionObject?.socialNetworks?.instagram })}
                            className="block w-full sm:w-5/6 rounded-md border-1 bg-white/2 py-1.5 text-black shadow-md ring-1 ring-inset
                                        ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                        />
                    </div>
                    <div className="mt-2 sm:flex sm:justify-between">
                        <span className="inline-flex items-center px-3 text-gray-500 sm:text-sm">
                          facebook:
                        </span>
                        <input
                            type="text"
                            name="facebook"
                            id="facebook"
                            autoComplete="facebook"
                            {...register('facebook', { value: optionObject?.socialNetworks?.facebook })}
                            className="block w-full sm:w-5/6 rounded-md border-1 bg-white/2 py-1.5 text-black shadow-md ring-1 ring-inset
                                        ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                        />
                    </div>
                    <div className="mt-2 sm:flex sm:justify-between">
                        <span className="inline-flex items-center px-3 text-gray-500 sm:text-sm">
                          youtube:
                        </span>
                        <input
                            type="text"
                            name="youtube"
                            id="youtube"
                            autoComplete="youtube"
                            {...register('youtube', { value: optionObject?.socialNetworks?.youtube })}
                            className="block w-full sm:w-5/6 rounded-md border-1 bg-white/2 py-1.5 text-black shadow-md ring-1 ring-inset
                                        ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                        />
                    </div>

                </div>

                <div className="col-span-full max-h-md">
                    <label htmlFor="location" className="block text-sm font-medium leading-6 text-black">
                        Location
                    </label>

                    <div className="mt-2 flex justify-between">
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
                            <span className="inline-flex items-center px-3 text-gray-500 sm:text-sm">
                              city:
                            </span>
                            <LocationComboboxElement
                                value={city}
                                setValue={setCity}
                                request={getCities}
                                setLat={setLat}
                                setLng={setLng}
                                isDisable={country === ""}
                            />
                        </div>
                    </div>
                    <div className="flex mt-5">
                        <span className="inline-flex items-center px-3 text-gray-500 sm:text-sm">
                            address:
                        </span>
                        <input
                            type="text"
                            name="address"
                            id="address"
                            autoComplete="address"
                            {...register('address', { value: optionObject?.contactInfo?.address, required: true, maxLength: 160 })}
                            className="block w-full rounded-md border-1 bg-white py-1.5 text-black shadow-md ring-1 ring-inset
                                        ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                        />
                        {errors?.address?.type === "required" && <p className="text-xs leading-5 text-red-700">Address is required</p>}
                    </div>
                    {city && (
                        <div className="mt-5">
                            <a
                                className="flex text-sm font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer pb-1"
                                onClick={() => toggleEnableGeolocation()}
                            >
                                {!enableSetLocation ? "Set geolocation" : "Disable geolocation"}
                            </a>
                            {enableSetLocation && (
                                <MapComponent
                                    position={[lat, lng]}
                                    isSetLocation={true}
                                    setLat={setLat}
                                    setLng={setLng}
                                />
                            )}
                        </div>
                    )}
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

                <div className="col-span-full">
                    <div className="flex justify-between">
                        <label htmlFor="about" className="block text-md font-medium leading-6 text-black">
                            Dances
                        </label>
                        <a
                            className="text-sm font-medium text-indigo-700 hover:text-indigo-500 cursor-pointer"
                            onClick={() => setOpenDancesDialog(true)}
                        >
                            {dances?.length > 0 ? "change dances list" : "add dances"}
                        </a>
                    </div>

                    <div className="prose prose-sm mt-4 text-gray-500">
                        <ul role="list" className="columns-2">
                            {dances?.map((dance) => (
                                <li key={dance.id}>{dance.name}</li>
                            ))}
                        </ul>
                    </div>
                    <DialogComponent openDialog={openDancesDialog} setOpenDialog={setOpenDancesDialog}>
                        <div className="flex-col w-2/3">
                            <CheckboxElement
                                label={"Dances"}
                                checkedDances={dances?.map(dance => dance.name)}
                                setDances={setDances}
                            />
                        </div>
                    </DialogComponent>
                </div>

                {typeOption === TYPE_OPTIONS.EVENT ? (
                    <>
                        {dancer.administrator &&(
                            <div className="col-span-full mb-12">
                                <div className="flex justify-between">
                                    <label htmlFor="about" className="block text-md font-medium leading-6 text-black">
                                        School organizer
                                    </label>
                                    <a
                                        className="text-sm font-medium text-indigo-700 hover:text-indigo-500 cursor-pointer"
                                        onClick={() => changeSchoolOrganizer()}
                                    >
                                        {schoolOrganizer != null ? "hide school" : "show school"}
                                    </a>
                                </div>
                                {schoolOrganizer != null &&
                                    <div className="prose prose-sm mt-4 text-gray-800">
                                        <ul role="list">
                                            <li >{schoolOrganizer.name}</li>
                                        </ul>
                                    </div>
                                }
                            </div>
                        )}
                    </>
                    ) : (
                    <div className="col-span-full mb-12">
                        <div className="flex justify-between">
                            <label htmlFor="about" className="block text-md font-medium leading-6 text-black">
                                Administrators
                            </label>
                            <a
                                className="text-sm font-medium text-indigo-700 hover:text-indigo-500 cursor-pointer"
                                onClick={() => setOpenAdministratorsDialog(true)}
                            >
                                edit administrators
                            </a>
                        </div>
                        <div className="prose prose-sm mt-4 text-gray-800">
                            <ul role="list" className="columns-2">
                                {administrators !== undefined && administrators?.map((admin) => (
                                    <li key={admin.id}>
                                        {admin.name} {admin.lastName}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <DialogComponent openDialog={openAdministratorsDialog} setOpenDialog={setOpenAdministratorsDialog}>
                            <div className="flex-col w-4/5">
                                <EditSchoolAdministratorsForm
                                    administrators={administrators}
                                    setAdministrators={setAdministrators}
                                />
                            </div>
                        </DialogComponent>
                    </div>
                )}
            </div>

            <div className="mt-8 flex">
                <button
                    type="submit"
                    className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white
                    shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2
                    focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                >
                    Save {typeOption}
                </button>
            </div>
        </form>
    )

}

export default SchoolEventForm
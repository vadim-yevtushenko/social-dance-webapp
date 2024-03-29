import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useValues } from "../../../hooks/useValues";
import RadioGroupElement from "../../forms/elements/RadioGroupElement";
import DropDownListElement from "../../forms/elements/DropDownListElement";
import { joinDateString } from "../../../util/dateTimeUtils";
import LocationComboboxElement from "../../forms/elements/LocationComboboxElement";
import { useHttp } from "../../../hooks/http.hook";
import { useForm } from "react-hook-form";
import { GET } from "../../../api/Endpoints";
import { dancerMapper } from "../../../util/mapper";
import { useUpload } from "../../../hooks/useUpload";
import { deleteDancerImage, fetchDancer, saveDancer, uploadDancerImage } from "../../../api/DancerApi";
import React from "react";
import ManageDanceListComponent from "./administrate/ManageDanceListComponent";
import DateTimeForm from "../../forms/DateTimeForm";
import { classNamesJoin } from "../../../util/classNameUtils";

const InfoProfileComponent = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isAuthenticated, email, dancer } = useSelector(state => state.auth)
    const [level, setLevel] = useState(dancer.level)
    const [gender, setGender] = useState(dancer.gender)
    const [city, setCity] = useState(dancer.contactInfo?.city || "")
    const [country, setCountry] = useState(dancer.contactInfo?.country || "")
    const [bDay, setBDay] = useState("");
    const [bMonth, setBMonth] = useState("");
    const [bYear, setBYear] = useState("");
    const [dances, setDances] = useState(dancer.dances);
    const { request } = useHttp();
    const { register, handleSubmit, formState: { errors }, setValue} = useForm()
    const { levelOptions, genderButtons, months } = useValues()
    const [photo, setPhoto] = useState()
    const [photoUrl, setPhotoUrl] = useState(dancer.image)
    const { resizeImage } = useUpload()
    const [openDancesDialog, setOpenDancesDialog] = useState(false)
    const [invisible, setInvisible] = useState(!dancer.contactInfo?.email)

    useEffect(() => {
        dispatch(fetchDancer(dancer.id))
    }, [])

    useEffect(() => {
        if (!isAuthenticated){
            navigate("/events")
        } else {
            const month = dancer.birthday?.split("-")[1]
            setBMonth(months.find(mon => mon.id === month)?.name);
            setBDay(dancer.birthday?.split("-")[2])
            setBYear(dancer.birthday?.split("-")[0])
        }
    }, [isAuthenticated])

    useEffect(() => {
        setPhotoUrl(dancer.image)
    }, [dancer.image])

    const onSubmit = (data) => {
        const contactInfo = { email: invisible ? "" : email, phoneNumber: data.phoneNumber, country, city }
        const socialNetworks = { instagram: data.instagram, facebook: data.facebook, youtube: data.youtube }
        const updatedDancer = dancerMapper(dancer.id, data.name, data.lastName, gender, socialNetworks,
            joinDateString(bYear, bMonth, bDay, months), data.description, level, dances, contactInfo, photoUrl)
        dispatch(saveDancer(updatedDancer))
    }

    const selectPhoto = (img) => {
        setPhoto(img)
        setPhotoUrl(URL.createObjectURL(img))
    }

    const uploadPhoto = () => {
        if (!!photo) {
            resizeImage(photo, 512000)
                .then(image => {
                    const formData = new FormData();
                    formData.append('file', image);
                    dispatch(uploadDancerImage(dancer.id, formData))
                        .then(() => dispatch(fetchDancer(dancer.id)))
                        .then(() => {
                            setPhoto(null)
                        })
                })
        }
    }

    const deletePhoto = () => {
        if (dancer.image){
            dispatch(deleteDancerImage(dancer.id))
                .then(() => dispatch(fetchDancer(dancer.id)))
                .then(() => {
                    setPhotoUrl(null)
                    setPhoto(null)
                })
        }else {
            setPhotoUrl(null)
            setPhoto(null)
        }

        setValue('file-upload', null)
    }

    const getCountries = (countryName) => request(GET.getCountries(countryName))

    const getCities = (cityName) => request(GET.getCities(cityName, country))


    return (
    <div>
        <main>
            <div className="divide-y divide-white/5">
                <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
                    <div>
                        <h2 className="text-lg font-semibold leading-7 text-black">Personal Information</h2>
                    </div>

                    <form className="md:col-span-2" onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
                            <div className="col-span-full flex items-center gap-x-8">
                                <label
                                    htmlFor="file-upload"
                                    className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none
                                                        focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                >
                                    <img
                                        src={photoUrl ? photoUrl : "/images/avatar-default/avatar_default_icon.png"}
                                        alt="Photo"
                                        className="h-24 w-24 flex-none rounded-lg bg-gray-300 object-cover"
                                    />
                                    <input
                                        id="file-upload"
                                        name="file-upload"
                                        type="file"
                                        className="sr-only"
                                        {...register('file-upload')}
                                        onChange={(e) => selectPhoto(e.target.files[0])}
                                    />
                                </label>
                                <div>
                                    <button
                                        type="button"
                                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
                                        onClick={uploadPhoto}
                                    >
                                        Change avatar
                                    </button>
                                    <p className="my-1 text-xs leading-5 text-gray-400">JPG, JPEG or PNG. 512KB max.</p>
                                    {photoUrl && (
                                        <button
                                            type="button"
                                            className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500"
                                            onClick={deletePhoto}
                                        >
                                            Delete avatar
                                        </button>
                                    )}
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-black">
                                    First name
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        autoComplete="name"
                                        {...register('name', { value: dancer.name, required: true, maxLength: 60 })}
                                        className="block w-full rounded-md border-1 bg-white/5 py-1.5 text-black shadow-md ring-1 ring-inset
                                        ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                    />
                                    {errors?.name?.type === "required" && <p className="text-xs leading-5 text-red-700">Name is required</p>}
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-black">
                                    Last name
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="lastName"
                                        id="lastName"
                                        autoComplete="lastName"
                                        className="block w-full rounded-md border-1 bg-white/5 py-1.5 text-black shadow-md ring-1 ring-inset
                                        ring-black/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                        {...register('lastName', { value: dancer.lastName, maxLength: 100 })}
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-black">
                                    Email address
                                </label>
                                <p
                                    className={classNamesJoin(invisible ? "text-gray-500" : "text-black", "mt-2")}
                                >
                                    {email}
                                </p>
                                <div className="mt-1 flex h-6 items-center">
                                    <input
                                        id="1"
                                        name="invisible"
                                        type="checkbox"
                                        checked={invisible}
                                        onChange={(event) => setInvisible(!invisible)}
                                        className="h-4 w-4 rounded border-gray-400 text-indigo-600 focus:ring-indigo-600"
                                    />
                                    <p className="ml-3 text-sm text-gray-600">
                                        - invisible
                                    </p>
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
                                        placeholder="+** (***) ***-****"
                                        {...register('phoneNumber', { value: dancer.contactInfo?.phoneNumber, maxLength: 60, minLength: 12 })}
                                        className="block w-full rounded-md border-1 bg-white/5 py-1.5 text-black shadow-md ring-1 ring-inset
                                        ring-black/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="level" className="block text-sm font-medium leading-6 text-gray-900">
                                    Gender
                                </label>
                                <RadioGroupElement
                                    radioButtons={genderButtons}
                                    setValue={setGender}
                                    startValue={dancer.gender}
                                />
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="level" className="block text-sm font-medium leading-6 text-gray-900">
                                    Level
                                </label>
                                <DropDownListElement
                                    disabled={false}
                                    startOption={level}
                                    setOption={setLevel}
                                    options={levelOptions}
                                />
                            </div>

                            <div className="col-span-full">
                                <label htmlFor="birthday" className="block text-sm font-medium leading-6 text-black">
                                    Birthday
                                </label>
                                <div className="mt-2">
                                    <DateTimeForm
                                        day={bDay}
                                        setDay={setBDay}
                                        month={bMonth}
                                        setMonth={setBMonth}
                                        year={bYear}
                                        setYear={setBYear}
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
                                            isDisable={country === ""}
                                        />
                                    </div>
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
                                        {...register('instagram', { value: dancer?.socialNetworks?.instagram })}
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
                                        {...register('facebook', { value: dancer?.socialNetworks?.facebook })}
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
                                        {...register('youtube', { value: dancer?.socialNetworks?.youtube })}
                                        className="block w-full sm:w-5/6 rounded-md border-1 bg-white/2 py-1.5 text-black shadow-md ring-1 ring-inset
                                        ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="col-span-full">
                                <label htmlFor="about" className="block text-sm font-medium leading-6 text-black">
                                    About myself
                                </label>

                                <div className="mt-2 sm:col-span-2 ">
                                    <textarea
                                        id="description"
                                        name="description"
                                        rows={3}
                                        className="block w-full max-w-2xl rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset
                                        ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        {...register('description', { value: dancer.description, maxLength: 600 })}
                                    />
                                    <p className="mt-1 text-sm leading-6 text-gray-600">Write a few sentences about yourself.</p>
                                </div>
                            </div>

                            <div className="col-span-full mb-12">
                                <ManageDanceListComponent
                                    dances={dances}
                                    setDancesList={setDances}
                                    openDialog={openDancesDialog}
                                    setOpenDialog={setOpenDancesDialog}
                                />
                            </div>
                        </div>

                        <div className="mt-8 flex">
                            <button
                                type="submit"
                                className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                            >
                                Save Personal Information
                            </button>
                        </div>
                    </form>
                </div>

            </div>
        </main>
    </div>
    )
}

export default InfoProfileComponent
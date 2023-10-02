import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useValues } from "../../../hooks/useValues";
import RadioGroupElement from "../../forms/elements/RadioGroupElement";
import DropDownListElement from "../../forms/elements/DropDownListElement";
import { joinDateString } from "../../../util/dateTimeUtils";
import ComboboxElement from "../../forms/elements/ComboboxElement";
import CheckboxElement from "../../forms/elements/CheckboxElement";
import { useHttp } from "../../../hooks/http.hook";
import { useForm } from "react-hook-form";
import { GET } from "../../../api/Endpoints";
import { dancerMapper } from "../../../util/mapper";
import { useUpload } from "../../../hooks/useUpload";
import { deleteDancerImage, fetchDancer, saveDancer, uploadDancerImage } from "../../../api/DancerApi";

const InfoProfileComponent = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isAuthenticated, email, dancer } = useSelector(state => state.auth)
    const [level, setLevel] = useState(dancer.level)
    const [gender, setGender] = useState(dancer.gender)
    const [city, setCity] = useState(dancer.contactInfo?.city)
    const [country, setCountry] = useState(dancer.contactInfo?.country)
    const [bMonth, setMonth] = useState("");
    const [dances, setDances] = useState(dancer.dances);
    const {request} = useHttp();
    const { register, handleSubmit, formState: { errors }, setValue} = useForm()
    const { levelOptions, genderButtons, months } = useValues()
    const [photo, setPhoto] = useState()
    const [photoUrl, setPhotoUrl] = useState(dancer.image)
    const { resizeImage } = useUpload()

    useEffect(() => {
        if (!isAuthenticated){
            navigate("/events")
        } else {
            const month = dancer.birthday?.split("-")[1]
            setMonth(months.find(mon => mon.id === month)?.name);
        }
    }, [isAuthenticated])

    useEffect(() => {
        console.log("useEffect ", dancer.image)
        setPhotoUrl(dancer.image)
    }, [dancer.image])

    const onSubmit = (data) => {
        const contactInfo = { email: data.email, phoneNumber: data.phoneNumber, country, city }
        const updatedDancer = dancerMapper(dancer.id, data.name, data.lastName, gender,
            joinDateString(data.year, bMonth, data.day, months), data.description, level, dances, contactInfo, photoUrl)
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
                                <div className="mt-2">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        placeholder='youremail@example.com'
                                        {...register('email', { value: dancer.contactInfo?.email || email, maxLength: 60, minLength: 5 })}
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
                                <div className="flex mt-2 justify-around">
                                    <div className="flex w-10 rounded-md bg-white/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500">
                                        <input
                                            type="text"
                                            name="day"
                                            id="day"
                                            autoComplete="day"
                                            {...register('day', { value: dancer?.birthday?.split("-")[2], maxLength: 2, minLength: 2, min: 1, max: 31 })}
                                            className="flex-1 w-10 rounded-md shadow-md border-1 bg-transparent py-1.5 pl-1 text-black focus:ring-0 sm:text-sm sm:leading-6"
                                            placeholder="day"
                                        />
                                    </div>
                                    <div className="flex">
                                        <DropDownListElement
                                            disabled={false}
                                            startOption={bMonth}
                                            setOption={setMonth}
                                            options={months.map(month => month.name)}
                                        />
                                    </div>
                                    <div className="flex w-20 rounded-md bg-white/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500">
                                        <input
                                            type="text"
                                            name="year"
                                            id="year"
                                            autoComplete="year"
                                            {...register('year', { value: dancer?.birthday?.split("-")[0], maxLength: 4, minLength: 4, min: 1900, max: 2100 })}
                                            className="flex-1 w-20 rounded-md shadow-md border-1 bg-transparent py-1.5 pl-1 text-black focus:ring-0 sm:text-sm sm:leading-6"
                                            placeholder="year"
                                        />
                                    </div>
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
                                            // isDisable={country === ""}
                                        />
                                    </div>
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
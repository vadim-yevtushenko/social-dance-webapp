import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useValues} from "../../../hooks/useValues";
import RadioGroup from "../../forms/RadioGroup";
import DropDownList from "../../forms/DropDownList";
import {joinDateString} from "../../../util/dateTimeUtils";
import ComboboxElement from "../../forms/ComboboxElement";
import CheckboxElement from "../../forms/CheckboxElement";
import {useHttp} from "../../../hooks/http.hook";
import {useForm} from "react-hook-form";
import {POST} from "../../../api/Endpoints";
import {updateDancer, userLogin} from "../../../redux/actions/authActions";
import {dancerMapper} from "../../../util/mapper";

const InfoProfileComponent = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {isAuthenticated, email} = useSelector(state => state)
    const {dancer} = useSelector(state => state.dancer)

    const [level, setLevel] = useState(dancer.level)
    const [gender, setGender] = useState(dancer.gender)
    const [city, setCity] = useState(dancer.contactInfo?.city)
    const [country, setCountry] = useState(dancer.contactInfo?.country)
    const [bMonth, setMonth] = useState("");
    const [dances, setDances] = useState(dancer.dances);
    const [image, setImage] = useState(dancer.image);
    const {request} = useHttp();
    const { register, handleSubmit, formState: { errors }, } = useForm()
    const {levelOptions, genderButtons, months, socialDances} = useValues()

    useEffect(() => {
        if (!isAuthenticated){
            navigate("/events")
        } else {
            const month = dancer.birthday?.split("-")[1]
            setMonth(months.find(mon => mon.id === month)?.name);
        }
    }, [isAuthenticated])

    const onSubmit = (data) => {
        console.log("onSubmit", data)
        setLoading(true)
        const contactInfo = { email: data.email, phoneNumber: data.phoneNumber, country, city }
        const updatedDancer = dancerMapper(dancer.id, data.name, data.lastName, gender,
            joinDateString(data.year, bMonth, data.day, months), data.description, level, dances, contactInfo, image)
        console.log("updatedDancer", updatedDancer)
        // const update = () => request(POST.saveDancer(updatedDancer), "POST", JSON.stringify(updatedDancer))
        // update()
        //     .then(res => {
        //         console.log("res", res)
        //         dispatch(updateDancer(res))
        //         setLoading(false);
        //     })
        //     .catch(error => {
        //         console.log("error", error)
        //         setLoading(false);
        //     })
    }

    return (
    <div>
        <main>
            {/* Settings forms */}
            <div className="divide-y divide-white/5">
                <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
                    <div>
                        <h2 className="text-base font-semibold leading-7 text-black">Personal Information</h2>
                    </div>

                    <form className="md:col-span-2" onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
                            <div className="col-span-full flex items-center gap-x-8">
                                <img
                                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                    alt=""
                                    className="h-24 w-24 flex-none rounded-lg bg-gray-800 object-cover"
                                />
                                <div>
                                    <button
                                        type="button"
                                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
                                    >
                                        Change avatar
                                    </button>
                                    <p className="mt-2 text-xs leading-5 text-gray-400">JPG, GIF or PNG. 1MB max.</p>
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
                                        placeholder="+0 (***) ***-****"
                                        {...register('phoneNumber', { value: dancer.contactInfo?.phoneNumber, maxLength: 60, minLength: 12 })}
                                        className="block w-full rounded-md border-1 bg-white/5 py-1.5 text-black shadow-md ring-1 ring-inset
                                        ring-black/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <RadioGroup
                                    title="Gender"
                                    radioButtons={genderButtons}
                                    setValue={setGender}
                                    startValue={dancer.gender}
                                />
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="level" className="block text-sm font-medium leading-6 text-gray-900">
                                    Level
                                </label>
                                <DropDownList
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
                                <div className="flex mt-2 justify-between">
                                    <div className="flex rounded-md bg-white/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500">
                                        <input
                                            type="text"
                                            name="day"
                                            id="day"
                                            autoComplete="day"
                                            {...register('day', { value: dancer?.birthday?.split("-")[2], maxLength: 2, minLength: 2, min: 1, max: 31 })}
                                            className="flex-1 rounded-md shadow-md border-1 bg-transparent py-1.5 pl-1 text-black focus:ring-0 sm:text-sm sm:leading-6"
                                            placeholder="day"
                                        />
                                    </div>
                                    <div className="flex rounded-md bg-white/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500">
                                        <DropDownList
                                            disabled={false}
                                            startOption={bMonth}
                                            setOption={setMonth}
                                            options={months.map(month => month.name)}
                                        />
                                    </div>
                                    <div className="flex rounded-md bg-white/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500">
                                        <input
                                            type="text"
                                            name="year"
                                            id="year"
                                            autoComplete="year"
                                            {...register('year', { value: dancer?.birthday?.split("-")[0], maxLength: 4, minLength: 4, min: 1900, max: 2100 })}
                                            className="flex-1 rounded-md shadow-md border-1 bg-transparent py-1.5 pl-1 text-black focus:ring-0 sm:text-sm sm:leading-6"
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
                                            value={dancer.contactInfo?.country}
                                            setValue={setCountry}
                                        />
                                    </div>

                                    <div className="flex">
                                        <span className="inline-flex items-center px-3 text-gray-500 sm:text-sm">
                                          city:
                                        </span>
                                        <ComboboxElement
                                            value={dancer.contactInfo?.city}
                                            setValue={setCity}
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
                                        // value={about}
                                        // onChange={event => setAbout(event.target.value)}
                                        {...register('description', { value: dancer.description, maxLength: 600 })}
                                    />
                                    <p className="mt-1 text-sm leading-6 text-gray-600">Write a few sentences about yourself.</p>
                                </div>
                            </div>

                            <div className="col-span-full">
                                <CheckboxElement
                                    label={"Dances"}
                                    socialDances={socialDances}
                                    checkedDances={dances.map(dance => dance.name)}
                                    setDances={setDances}
                                />
                            </div>
                        </div>



                        <div className="mt-8 flex">
                            <button
                                type="submit"
                                className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                            >
                                Save
                            </button>
                        </div>
                    </form>
                </div>

                <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
                    <div>
                        <h2 className="text-base font-semibold leading-7 text-black">Change password</h2>
                        <p className="mt-1 text-sm leading-6 text-gray-400">
                            Update your password associated with your account.
                        </p>
                    </div>

                    <form className="md:col-span-2">
                        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
                            <div className="col-span-full">
                                <label htmlFor="current-password" className="block text-sm font-medium leading-6 text-black">
                                    Current password
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="current-password"
                                        name="current_password"
                                        type="password"
                                        autoComplete="current-password"
                                        className="block w-full rounded-md border-1 bg-white/5 py-1.5 text-black shadow-md ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="col-span-full">
                                <label htmlFor="new-password" className="block text-sm font-medium leading-6 text-black">
                                    New password
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="new-password"
                                        name="new_password"
                                        type="password"
                                        autoComplete="new-password"
                                        className="block w-full rounded-md border-1 bg-white/5 py-1.5 text-black shadow-md ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="col-span-full">
                                <label htmlFor="confirm-password" className="block text-sm font-medium leading-6 text-black">
                                    Confirm password
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="confirm-password"
                                        name="confirm_password"
                                        type="password"
                                        autoComplete="new-password"
                                        className="block w-full rounded-md border-1 bg-white/5 py-1.5 text-black shadow-md ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 flex">
                            <button
                                type="submit"
                                className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                            >
                                Save
                            </button>
                        </div>
                    </form>
                </div>

                {/*<div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">*/}
                {/*    <div>*/}
                {/*        <h2 className="text-base font-semibold leading-7 text-black">Log out other sessions</h2>*/}
                {/*        <p className="mt-1 text-sm leading-6 text-gray-400">*/}
                {/*            Please enter your password to confirm you would like to log out of your other sessions across all of*/}
                {/*            your devices.*/}
                {/*        </p>*/}
                {/*    </div>*/}

                {/*    <form className="md:col-span-2">*/}
                {/*        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">*/}
                {/*            <div className="col-span-full">*/}
                {/*                <label htmlFor="logout-password" className="block text-sm font-medium leading-6 text-white">*/}
                {/*                    Your password*/}
                {/*                </label>*/}
                {/*                <div className="mt-2">*/}
                {/*                    <input*/}
                {/*                        id="logout-password"*/}
                {/*                        name="password"*/}
                {/*                        type="password"*/}
                {/*                        autoComplete="current-password"*/}
                {/*                        className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"*/}
                {/*                    />*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*        </div>*/}

                {/*        <div className="mt-8 flex">*/}
                {/*            <button*/}
                {/*                type="submit"*/}
                {/*                className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"*/}
                {/*            >*/}
                {/*                Log out other sessions*/}
                {/*            </button>*/}
                {/*        </div>*/}
                {/*    </form>*/}
                {/*</div>*/}

                <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
                    <div>
                        <h2 className="text-base font-semibold leading-7 text-black">Delete account</h2>
                        <p className="mt-1 text-sm leading-6 text-gray-400">
                            No longer want to use our service? You can delete your account here. This action is not reversible.
                            All information related to this account will be deleted permanently.
                            Please enter your password to delete your account.
                        </p>
                    </div>

                    <form className="md:col-span-2">
                        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
                            <div className="col-span-full">
                                <label htmlFor="logout-password" className="block text-sm font-medium leading-6 text-black">
                                    Your password
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="logout-password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        className="block w-full rounded-md border-1 bg-white/5 py-1.5 text-black shadow-md ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="rounded-md bg-red-500 mt-8 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-400"
                        >
                            Yes, delete my account
                        </button>
                    </form>
                </div>
            </div>
        </main>
    </div>
    )
}

export default InfoProfileComponent
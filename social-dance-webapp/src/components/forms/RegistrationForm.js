import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {dancerLogin, updateDancer} from "../../redux/actions/authActions";
import Spinner from "../spinner/Spinner";
import RadioGroup from "./RadioGroup";
import DropDownList from "./DropDownList";
import {useHttp} from "../../hooks/http.hook";
import {POST} from "../../api/Endpoints";
import {useValues} from "../../hooks/useValues";

const RegistrationForm = () => {
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState();
    const [gender, setGender] = useState();
    const [level, setLevel] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(state => state.isAuthenticated)
    const {request} = useHttp();
    const {levelOptions, genderButtons} = useValues()

    useEffect(() => {
        if (isAuthenticated){
            navigate("/events")
        }
    },[isAuthenticated])

    const onSubmit = (email, password, {name, gender, level}) => {
        setLoading(true)
        const signup = () => request(POST.registration(email, password), "POST", JSON.stringify({name, gender, level}))
        signup()
            .then(res => {
                console.log("res", res)
                const isAuth = res != null
                dispatch(dancerLogin(email, password, isAuth))
                dispatch(updateDancer(res))
                setLoading(false);
            })
            .then(navigate("/profile"))
            .catch(error => {
                console.log("error", error)
                setLoading(false);
            })
    }

    if (loading){
        return (
            <div className="min-h-full flex items-center">
                <Spinner/>
            </div>
        )
    }

    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <img
                        className="mx-auto h-10 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                        alt="Your Company"
                    />
                    <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Sign in to your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
                    <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
                        <form
                            className="space-y-6"
                            action="#"
                            method="POST"
                        >
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                    Name
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        // autoComplete="email"
                                        required
                                        value={name}
                                        onChange={event => setName(event.target.value)}
                                        placeholder='name'
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="flex justify-between">
                                <RadioGroup
                                    title="Gender"
                                    radioButtons={genderButtons}
                                    setValue={setGender}
                                />
                                <div className="">
                                    <label htmlFor="text" className="block text-sm font-medium leading-6 text-gray-900">
                                        Level
                                    </label>
                                    <DropDownList
                                        disabled={false}
                                        startOption={level}
                                        setOption={setLevel}
                                        options={levelOptions}
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                    Email address
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        value={email}
                                        onChange={event => setEmail(event.target.value)}
                                        placeholder='youremail@example.com'
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Password
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        required
                                        value={password}
                                        onChange={event => setPassword(event.target.value)}
                                        placeholder='**********'
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Confirm password
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="confirmPassword"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        required
                                        value={confirmPassword}
                                        onChange={event => setConfirmPassword(event.target.value)}
                                        placeholder='**********'
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                        </form>

                        <div className="mt-10">
                            <button
                                type="button"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5
                                    text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline
                                    focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                onClick={() => onSubmit(email, password, {name, gender, level})}
                            >
                                Sign up
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RegistrationForm
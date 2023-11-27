import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import RadioGroupElement from "./elements/RadioGroupElement";
import DropDownListElement from "./elements/DropDownListElement";
import { useValues } from "../../hooks/useValues";
import { useForm } from "react-hook-form";
import { signup } from "../../api/CredentialApi";
import { useValidate } from "../../hooks/useValidate";

const RegistrationForm = () => {
    const [gender, setGender] = useState();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isAuthenticated } = useSelector(state => state.auth)
    const { levelOptions, genderButtons } = useValues()
    const [level, setLevel] = useState(levelOptions[0]);
    const { register, handleSubmit, formState: { errors }, getValues } = useForm()
    const { validatePassword } = useValidate()

    useEffect(() => {
        if (isAuthenticated){
            navigate("/events")
        }
    },[isAuthenticated])

    const onSubmit = ({ name, lastName, email, password }) => {
        const newDancer = {name, lastName, gender, level}
        dispatch(signup(email, password, newDancer))
            .then(() => {
                if (isAuthenticated){
                    navigate("/profile")
                }
            })
    }

    return (
        <>
            <div className="grow flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
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
                            onSubmit={handleSubmit(onSubmit)}
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
                                        autoComplete="name"
                                        required
                                        {...register('name', { required: true, maxLength: 60 })}
                                        placeholder='name'
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300
                                        placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                    {errors?.name?.type === "required" && <p className="text-xs leading-5 text-red-700">Name is required.</p>}
                                </div>
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                    Last name
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="lastName"
                                        name="lastName"
                                        type="text"
                                        autoComplete="lastName"
                                        required
                                        {...register('lastName', { required: true, maxLength: 60 })}
                                        placeholder='last name'
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300
                                        placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                    {errors?.name?.type === "required" && <p className="text-xs leading-5 text-red-700">Last name is required.</p>}
                                </div>
                            </div>

                            <div className="flex justify-between">
                                <RadioGroupElement
                                    title="Gender"
                                    radioButtons={genderButtons}
                                    setValue={setGender}
                                />
                                <div className="">
                                    <label htmlFor="text" className="block text-sm font-medium leading-6 text-gray-900">
                                        Level
                                    </label>
                                    <DropDownListElement
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
                                        {...register('email', { required: true, maxLength: 60, minLength: 5 })}
                                        placeholder='youremail@example.com'
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                    {errors.email?.type === "required" && <p className="text-xs leading-5 text-red-700">Email is required.</p>}
                                </div>
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Password
                                </label>
                                <p className="text-sm italic text-gray-500">required: uppercase, lowercase, number, min 8 symbols.</p>
                                <div className="mt-2">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="password"
                                        required
                                        {...register('password', { required: true, minLength: 8,
                                        validate: (value) => {
                                            const message = validatePassword(value)
                                            if (message != null){
                                                return message
                                            }
                                        }})}
                                        placeholder='**********'
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                    {errors?.password?.type === "required" && <p className="text-xs leading-5 text-red-700">Password is required.</p>}
                                    {errors?.password?.type === "minLength" && <p className="text-xs leading-5 text-red-700">Min length must be 8 symbols.</p>}
                                    {errors?.password?.type === "validate" && <p className="text-xs leading-5 text-red-700">{errors.password.message}</p>}
                                </div>
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Confirm password
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type="password"
                                        autoComplete="confirmPassword"
                                        required
                                        {...register('confirmPassword', { required: true,
                                            validate: (value) => {
                                                if (getValues().password !== value) {
                                                    return "Your passwords do not match.";
                                                }
                                            },
                                        })}
                                        placeholder='**********'
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                    {errors?.confirmPassword?.type === "required" && <p className="text-xs leading-5 text-red-700">Confirm password is required.</p>}
                                    {errors?.confirmPassword?.type === "validate" && <p className="text-xs leading-5 text-red-700">{errors.confirmPassword.message}</p>}
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="mt-12 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5
                                    text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline
                                    focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Sign up
                                </button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </>
    )
}

export default RegistrationForm
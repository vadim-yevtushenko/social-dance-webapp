import {useEffect, useState} from "react";
import {login} from "../../api/CredentialApi";
import Spinner from "../spinner/Spinner";
import { useNavigate } from "react-router-dom";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {dancerLogin, updateDancer} from "../../redux/actions/authActions";
import {useForm} from "react-hook-form";

const LoginForm = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {isAuthenticated} = useSelector(state => state.auth)
    const { register, handleSubmit, formState: { errors } } = useForm()

    useEffect(() => {
        if (isAuthenticated){
            navigate("/events")
        }
    },[isAuthenticated])

    const onSubmit = ({email, password}) => {
        setLoading(true)
        login(email, password)
            .then(res => {
                console.log("res", res)
                const isAuth = res != null
                dispatch(dancerLogin(email, password, isAuth))
                dispatch(updateDancer(res))
                setLoading(false);
            })
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
                                onSubmit={handleSubmit(onSubmit)}
                            >
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
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300
                                            placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                        {errors?.email?.type === "required" && <p className="text-xs leading-5 text-red-700">Email is required.</p>}
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
                                            {...register('password', { required: true })}
                                            placeholder='**********'
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300
                                            placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                        {errors?.password?.type === "required" && <p className="text-xs leading-5 text-red-700">Password is required.</p>}
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <input
                                            id="remember-me"
                                            name="remember-me"
                                            type="checkbox"
                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                        />
                                        <label htmlFor="remember-me" className="ml-3 block text-sm leading-6 text-gray-900">
                                            Remember me
                                        </label>
                                    </div>

                                    <div className="text-sm leading-6">
                                        <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                            Forgot password?
                                        </a>
                                    </div>
                                </div>

                                <div>
                                    <button
                                        type="submit"
                                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold
                                        leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2
                                        focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        Sign in
                                    </button>
                                </div>
                            </form>

                            <div className="relative my-5">
                                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                    <div className="w-full border-t border-gray-200" />
                                </div>
                                <div className="relative flex justify-center text-sm font-medium leading-6">
                                    <span className="bg-white px-6 text-gray-900">Or </span>
                                </div>
                            </div>
                            <div>
                                <button
                                    type="button"
                                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5
                                    text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline
                                    focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    onClick={() => navigate("/registration")}
                                >
                                    Sign up
                                </button>
                            </div>

                            <div>
                                <div className="relative mt-10">
                                    <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                        <div className="w-full border-t border-gray-200" />
                                    </div>
                                    <div className="relative flex justify-center text-sm font-medium leading-6">
                                        <span className="bg-white px-6 text-gray-900">Or continue with</span>
                                    </div>
                                </div>

                                <div className="mt-6 grid grid-cols-2 gap-4">
                                    <a
                                        href="#"
                                        className="flex w-full items-center justify-center gap-3 rounded-md bg-[#1D9BF0] px-3 py-1.5 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D9BF0]"
                                    >
                                        <svg className="h-6 w-6" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                                            <path
                                                d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                                            />
                                        </svg>
                                        <span className="text-sm font-semibold leading-6">Facebook</span>
                                    </a>

                                    <a
                                        href="#"
                                        className="flex w-full items-center justify-center gap-3 rounded-md bg-[#24292F] px-3 py-1.5 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#24292F]"
                                    >
                                        <svg className="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                                            <path
                                                fillRule="evenodd"
                                                d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        <span className="text-sm font-semibold leading-6">GitHub</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }

export default LoginForm
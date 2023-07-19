import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { login, resetPassword } from "../../api/CredentialApi";

const LoginForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isAuthenticated } = useSelector(state => state.auth)
    const { register, handleSubmit, formState: { errors } } = useForm()
    const [isForgotPassword, setIsForgotPassword] = useState(false)

    useEffect(() => {
        if (isAuthenticated){
            navigate("/events")
        }
    },[isAuthenticated])

    const onSubmit = ({email, password}) => {
        if (isForgotPassword){
            dispatch(resetPassword(email))
            setIsForgotPassword(false)
        }else {
            dispatch(login(email, password))
        }
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
                                {isForgotPassword || (
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
                                )}

                                <div className="flex items-center justify-between">
                                {/*    <div className="flex items-center">*/}
                                {/*        <input*/}
                                {/*            id="remember-me"*/}
                                {/*            name="remember-me"*/}
                                {/*            type="checkbox"*/}
                                {/*            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"*/}
                                {/*        />*/}
                                {/*        <label htmlFor="remember-me" className="ml-3 block text-sm leading-6 text-gray-900">*/}
                                {/*            Remember me*/}
                                {/*        </label>*/}
                                {/*    </div>*/}

                                    <div className="text-sm leading-6">
                                        <a
                                            className="font-semibold text-indigo-600 hover:text-indigo-500 cursor-pointer"
                                            onClick={() => setIsForgotPassword(!isForgotPassword)}
                                        >
                                            {isForgotPassword ? "back to sign in" : "Forgot password?"}
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
                                        {isForgotPassword ? "Reset Password" : "Sign in"}
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
                                        className="flex w-full items-center justify-center gap-3 rounded-md bg-[#1D9BF0] px-3 py-1.5 text-white focus-visible:outline
                                        focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D9BF0] hover:bg-[#188ad6]"
                                    >
                                        <svg className="h-6 w-6" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
                                        </svg>
                                        <span className="text-sm font-semibold leading-6">Facebook</span>
                                    </a>

                                    <a
                                        href="#"
                                        className="flex w-full items-center justify-center gap-3 rounded-md border-2 bg-white px-3 py-1.5 text-black focus-visible:outline
                                        focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#24292F] hover:bg-gray-100"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 48 48"
                                            className="h-6 w-6"
                                        >
                                            <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
                                            <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
                                            <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
                                            <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
                                        </svg>
                                        <span className="text-sm font-semibold leading-6">Google</span>
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
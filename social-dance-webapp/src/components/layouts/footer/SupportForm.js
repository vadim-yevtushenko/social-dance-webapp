import React, {useEffect} from "react";
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {sendSupportEmail} from "../../../api/AdminApi";

const SupportForm = ({ setOpenDialog }) => {
    const dispatch = useDispatch();
    const { isAuthenticated, email, dancer } = useSelector(state => state.auth)
    const { register, handleSubmit, formState: { errors }, setValue } = useForm()

    useEffect(() => {
        if (isAuthenticated){
            setValue('email', email)
        }
    }, [])

    const onSubmit = ({ email, message }) => {
        const fullName = dancer.name + " " + dancer.lastName
        const emailObj = {
            email,
            fullName,
            message
        }
        dispatch(sendSupportEmail(emailObj))
        setOpenDialog(false)
    }

    return (
        <div className="">
            <form
                className="space-y-6"
                onSubmit={handleSubmit(onSubmit)}
            >
                <div>
                    <label htmlFor="email" className="block text-md font-medium leading-6 text-gray-900">
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

                <div className="col-span-full">
                    <label htmlFor="about" className="block text-md font-medium leading-6 text-black">
                        Message
                    </label>

                    <p className="text-sm leading-6 text-gray-600">If you have any questions or would like to submit a ticket, please send an email to the support.</p>
                    <div className="mt-2 sm:col-span-2 ">
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows={6}
                                        className="block w-full max-w-2xl rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset
                                        ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        {...register('message', { required: true, maxLength: 600 })}
                                    />
                        {errors?.message?.type === "required" && <p className="text-xs leading-5 text-red-700">Message is required.</p>}
                    </div>
                </div>

                <div className="mt-8 flex">
                    <button
                        type="submit"
                        className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                    >
                        Send email
                    </button>
                </div>
            </form>
        </div>
    )
}

export default SupportForm
import { useForm } from "react-hook-form";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteDancer } from "../../../api/DancerApi";
import { changeEmail, changePassword } from "../../../api/CredentialApi";
import { useValidate } from "../../../hooks/useValidate";

const SettingsProfileComponent = () => {
    const { email, dancer } = useSelector(state => state.auth)
    const { register, handleSubmit, formState: { errors }, getValues, setValue } = useForm()
    const { register: changeEmailRegister, handleSubmit: changeEmailHandleSubmit, formState: { errors: changeEmailErrors }, setValue: changeEmailSetValue } = useForm()
    const { register: deleteRegister, handleSubmit: deleteHandleSubmit, formState: { errors: deleteErrors } } = useForm()
    const dispatch = useDispatch();
    const { validatePassword } = useValidate()

    function onChangePasswordSubmit({ newPassword, currentPassword }) {
        dispatch(changePassword(email, newPassword, currentPassword))
        setValue("currentPassword", "")
        setValue("newPassword", "")
        setValue("confirmPassword", "")
    }

    function onChangeEmailSubmit({ newEmail, password }) {
        dispatch(changeEmail(email, newEmail, password))
        changeEmailSetValue("newEmail", "")
    }

    function onDeleteSubmit({ deletePassword }) {
        dispatch(deleteDancer(dancer.id, deletePassword))
    }

    return (
        <div>
            <main>
                {/* Settings forms */}
                <div className="divide-y divide-white/5">

                    <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
                        <div>
                            <h2 className="text-lg font-semibold leading-7 text-black">Change password</h2>
                            <p className="mt-1 text-sm leading-6 text-gray-400">
                                Update the password associated with your account. The password must contain uppercase and lowercase letters, numbers and be at least 8 characters long.
                            </p>
                        </div>

                        <form className="md:col-span-2" onSubmit={handleSubmit(onChangePasswordSubmit)}>
                            <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
                                <div className="col-span-full">
                                    <label htmlFor="current-password" className="block text-sm font-medium leading-6 text-black">
                                        Current password
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="currentPassword"
                                            name="currentPassword"
                                            type="password"
                                            autoComplete="currentPassword"
                                            className="block w-full rounded-md border-1 bg-white/5 py-1.5 text-black shadow-md
                                            ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                            {...register('currentPassword', { required: true })}
                                        />
                                        {errors?.currentPassword?.type === "required" && <p className="text-xs leading-5 text-red-700">Password is required.</p>}
                                    </div>
                                </div>

                                <div className="col-span-full">
                                    <label htmlFor="new-password" className="block text-sm font-medium leading-6 text-black">
                                        New password
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="newPassword"
                                            name="newPassword"
                                            type="password"
                                            autoComplete="newPassword"
                                            className="block w-full rounded-md border-1 bg-white/5 py-1.5 text-black shadow-md
                                            ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                            {...register('newPassword', { required: true, minLength: 8,
                                                validate: (value) => {
                                                    const message = validatePassword(value)
                                                    if (message != null){
                                                        return message
                                                    }
                                                }})}
                                        />
                                        {errors?.newPassword?.type === "required" && <p className="text-xs leading-5 text-red-700">New password is required.</p>}
                                        {errors?.newPassword?.type === "minLength" && <p className="text-xs leading-5 text-red-700">Min length must be 8 symbols.</p>}
                                        {errors?.newPassword?.type === "validate" && <p className="text-xs leading-5 text-red-700">{errors.newPassword.message}</p>}
                                    </div>
                                </div>

                                <div className="col-span-full">
                                    <label htmlFor="confirm-password" className="block text-sm font-medium leading-6 text-black">
                                        Confirm password
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            type="password"
                                            autoComplete="newPassword"
                                            className="block w-full rounded-md border-1 bg-white/5 py-1.5 text-black shadow-md ring-1
                                            ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                            {...register('confirmPassword', { required: true,
                                                validate: (value) => {
                                                    if (getValues().newPassword !== value) {
                                                        return "Your passwords do not match.";
                                                    }
                                                },})}
                                        />
                                        {errors?.confirmPassword?.type === "required" && <p className="text-xs leading-5 text-red-700">Confirm password is required.</p>}
                                        {errors?.confirmPassword?.type === "validate" && <p className="text-xs leading-5 text-red-700">{errors.confirmPassword.message}</p>}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 flex">
                                <button
                                    type="submit"
                                    className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400
                                    focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>

                    <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
                        <div>
                            <h2 className="text-base font-semibold leading-7 text-black">Change email</h2>
                            <p className="mt-1 text-sm leading-6 text-gray-400">
                                Change the email address in your credentials. Use a new email address for a new login.
                            </p>
                        </div>

                        <form className="md:col-span-2" onSubmit={changeEmailHandleSubmit(onChangeEmailSubmit)}>
                            <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
                                <div className="col-span-full">
                                    <label htmlFor="email" className=" text-sm font-medium leading-6 text-black">
                                        Your current email: <p className="font-bold">{email}</p>
                                        New email
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="newEmail"
                                            name="newEmail"
                                            type="email"
                                            autoComplete="newEmail"
                                            className="block w-full rounded-md border-1 bg-white/5 py-1.5 text-black shadow-md ring-1
                                            ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                            {...changeEmailRegister('newEmail', { required: true, maxLength: 60 })}
                                        />
                                        {changeEmailErrors?.newEmail?.type === "required" && <p className="text-xs leading-5 text-red-700">Email is required.</p>}
                                        {changeEmailErrors?.newEmail?.type === "maxLength" && <p className="text-xs leading-5 text-red-700">Max length 60 symbols.</p>}
                                    </div>
                                </div>
                                <div className="col-span-full">
                                    <label htmlFor="email-password" className="block text-sm font-medium leading-6 text-black">
                                        Your password
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="password"
                                            name="password"
                                            type="password"
                                            autoComplete="password"
                                            className="block w-full rounded-md border-1 bg-white/5 py-1.5 text-black shadow-md ring-1
                                            ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                            {...changeEmailRegister('password', { required: true })}
                                        />
                                        {changeEmailErrors?.password?.type === "required" && <p className="text-xs leading-5 text-red-700">Password is required.</p>}
                                    </div>
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="rounded-md bg-indigo-500 mt-8 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400"
                            >
                                Save
                            </button>
                        </form>
                    </div>

                    <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
                        <div>
                            <h2 className="text-base font-semibold leading-7 text-black">Delete account</h2>
                            <p className="mt-1 text-sm leading-6 text-gray-400">
                                No longer want to use our service? You can delete your account here. This action is not reversible.
                                All information related to this account will be deleted permanently.
                                Please enter your password to delete your account.
                            </p>
                        </div>

                        <form className="md:col-span-2" onSubmit={deleteHandleSubmit(onDeleteSubmit)}>
                            <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
                                <div className="col-span-full">
                                    <label htmlFor="logout-password" className="block text-sm font-medium leading-6 text-black">
                                        Your password
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="deletePassword"
                                            name="deletePassword"
                                            type="password"
                                            autoComplete="deletePassword"
                                            className="block w-full rounded-md border-1 bg-white/5 py-1.5 text-black shadow-md ring-1
                                            ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                            {...deleteRegister('deletePassword', { required: true })}
                                        />
                                        {deleteErrors?.deletePassword?.type === "required" && <p className="text-xs leading-5 text-red-700">Password is required.</p>}
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

export default SettingsProfileComponent
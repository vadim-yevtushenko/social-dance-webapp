
const SettingsProfileComponent = () => {

    return (
        <div>
            <main>
                {/* Settings forms */}
                <div className="divide-y divide-white/5">

                    <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
                        <div>
                            <h2 className="text-lg font-semibold leading-7 text-black">Change password</h2>
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

export default SettingsProfileComponent
import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {userLogout} from "../../../redux/actions/authActions";

const navigation = [
    { name: 'Events', href: '/events' },
    { name: 'Schools', href: '/schools' },
    { name: 'Dancers', href: '/dancers' },
]

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const isAuthenticated = useSelector(state => state.isAuthenticated)
    const dispatch = useDispatch();
    console.log("state", useSelector(state => state))

    const logout = () => {
        dispatch(userLogout())
    }

    return (
        <header className="bg-gray-800 text-white mb-5">
            <nav className="mx-auto flex max-w-7xl items-center justify-between gap-x-6 p-6 lg:px-8" aria-label="Global">
                <div className="flex lg:flex">
                    <a href="src/components/layouts/header/Header#" className="-m-1.5 p-1.5">
                        <span className="sr-only">Your Company</span>
                        <img className="h-10 w-auto -translate-x-12" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="" />
                    </a>
                </div>
                <div className="hidden lg:flex lg:gap-x-12 ml-5">
                    {navigation.map((item) => (
                        <NavLink
                            key={item.name}
                            to={item.href}
                            className="text-md font-semibold leading-6 text-gray-300"
                            style={({isActive}) => ({textDecoration: isActive && 'underline', color: isActive && 'white'})}
                        >
                            {item.name}
                        </NavLink>
                    ))}
                </div>
                <div className="flex flex-1 items-center justify-end gap-x-6">
                    {isAuthenticated ? (
                            <button
                                className='block px-4 py-2 text-xl text-white'
                                onClick={() => logout()}
                            >
                                Sign out
                            </button>
                        ) : (
                        <NavLink
                            to="/login"
                            className="hidden lg:block lg:text-xl lg:font-semibold lg:leading-6 lg:text-red"
                            style={({isActive}) => ({textDecoration: isActive && 'underline'})}
                        >
                            Log in
                        </NavLink>
                        )}
                </div>
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                        onClick={() => setMobileMenuOpen(true)}
                    >
                        <span className="sr-only">Open main menu</span>
                        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                    </button>
                </div>
            </nav>
            <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
                <div className="fixed inset-0 z-10" />
                <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                    <div className="flex items-center gap-x-6">
                        <a href="src/components/layouts/header/Header#" className="-m-1.5 p-1.5">
                            <span className="sr-only">Your Company</span>
                            <img
                                className="h-8 w-auto"
                                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                                alt=""
                            />
                        </a>
                        <button
                            type="button"
                            className="-m-2.5 rounded-md p-2.5 text-gray-700"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <span className="sr-only">Close menu</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-gray-500/10">
                            <div className="space-y-2 py-6">
                                {navigation.map((item) => (
                                    <a
                                        key={item.name}
                                        href={item.href}
                                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                    >
                                        {item.name}
                                    </a>
                                ))}
                            </div>

                                <div className="py-6">
                                    {isAuthenticated ||
                                        <a
                                            href="/login"
                                            className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                        >
                                            Log in
                                        </a>
                                    }
                                </div>
                        </div>
                    </div>
                </Dialog.Panel>
            </Dialog>
        </header>
    )
}
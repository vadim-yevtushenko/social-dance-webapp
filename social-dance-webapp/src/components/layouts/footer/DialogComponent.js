import { Fragment, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import React from "react";

const DialogComponent = ({ openDialog, setOpenDialog, children }) => {
    const [open, setOpen] = useState(openDialog)

    useEffect(() => {
        setOpen(openDialog)
    }, [openDialog])

    const closeMap = () => {
        setOpenDialog(false)
        setOpen(false)
    }

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeMap}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity md:block" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
                         {/*This element is to trick the browser into centering the modal contents.*/}
                        <span className="hidden md:inline-block md:h-screen md:align-middle" aria-hidden="true">
                          &#8203;
                        </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
                            enterTo="opacity-100 translate-y-0 md:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 md:scale-100"
                            leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
                        >
                            <Dialog.Panel className="flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl">
                                <div className="relative flex w-full items-center overflow-hidden bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                                    <button
                                        type="button"
                                        className="absolute right-2 top-2 text-gray-400 hover:text-gray-500 "
                                        onClick={() => closeMap()}
                                    >
                                        <span className="sr-only">Close</span>
                                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                    </button>

                                    <div className="flex h-full w-full">
                                        {children}
                                        {/*<p className="text-2xl">*/}
                                        {/*    Social Dance is a web application. Created for the dance community.*/}
                                        {/*    Here you can create school or event for easy search for dancers,*/}
                                        {/*    or just looking for school or event in any city.<br/><br/>*/}
                                        {/*    If you find a bug or want to leave a wish, what would you like to add to this app,*/}
                                        {/*    for example add dance to list dances, write to <a href='#' className='font-bold hover:text-indigo-700'>support</a> in footer, please!*/}
                                        {/*</p>*/}
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

export default DialogComponent
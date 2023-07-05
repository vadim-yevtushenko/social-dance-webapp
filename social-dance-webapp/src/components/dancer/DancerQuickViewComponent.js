import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { classNamesJoin } from "../../util/classNameUtils";
import { useEffect } from "react";
import { parseFullDateString } from "../../util/dateTimeUtils";
import React from "react";

const DancerQuickViewComponent = ({ openView, setOpenView, dancer }) => {
    const [open, setOpen] = useState(openView)

    useEffect(() => {
        setOpen(openView)
    }, [openView])

    const closeView = () => {
        setOpenView(false)
        setOpen(false)
    }

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeView}>
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
                        {/* This element is to trick the browser into centering the modal contents. */}
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
                                        className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8"
                                        onClick={() => closeView()}
                                    >
                                        <span className="sr-only">Close</span>
                                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                    </button>

                                    <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:items-center lg:gap-x-8">
                                        <div
                                            className={classNamesJoin(dancer?.image ? "aspect-h-3" : "aspect-h-2",
                                                "aspect-w-2 overflow-hidden rounded-lg bg-gray-100 sm:col-span-4 lg:col-span-5")}
                                        >
                                            <img
                                                src={dancer?.image ? dancer.image : "/images/avatar-default/avatar_default_icon.png"}
                                                alt={dancer?.name}
                                                className="object-cover object-center"
                                            />
                                        </div>
                                        <div className="sm:col-span-8 lg:col-span-7">
                                            <h1 className="text-2xl font-medium text-gray-900 sm:pr-12">
                                                {dancer?.name} {dancer?.lastName}
                                            </h1>

                                            <section aria-labelledby="information-heading" className="mt-1">
                                                <h3 id="information-heading" className="sr-only">
                                                    Dancer information
                                                </h3>

                                                {dancer?.birthday && <p className="font-medium text-gray-900">{parseFullDateString(dancer?.birthday)}</p>}

                                                <div className="flex">
                                                    <p className="font-medium text-gray-900">Gender: {dancer?.gender}&nbsp;&nbsp;&nbsp;</p>
                                                    <p className="font-medium text-gray-900">Level: {dancer?.level}</p>

                                                </div>

                                                {dancer?.contactInfo && (dancer.contactInfo.country || dancer.contactInfo.city) && (
                                                    <div className="mt-4">
                                                        <h4 className="text-sm font-medium text-gray-900">Location</h4>
                                                        <div className="flex items-center">
                                                            {dancer.contactInfo.country}, {dancer.contactInfo.city}
                                                        </div>
                                                    </div>
                                                )}
                                            </section>

                                            <section aria-labelledby="options-heading" className="mt-8">
                                                {dancer?.dances.length > 0 && (
                                                    <div>
                                                        <h4 className="text-sm font-medium text-gray-900">Dances</h4>
                                                        <div className="prose prose-sm mt-2 text-gray-500">
                                                            <ul role="list" className={classNamesJoin(dancer?.dances?.length > 3 && "columns-2")}>
                                                                {dancer?.dances?.map((dance) => (
                                                                    <li key={dance?.id}>{dance?.name}</li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    </div>
                                                )}

                                                {dancer?.school && !dancer?.administrator && (
                                                    <div className="flex mt-8 items-end">
                                                        <p className="text-sm font-medium text-gray-900">School:&nbsp;</p>
                                                        <p className="font-medium text-gray-900">{dancer?.school.name}</p>
                                                    </div>
                                                )}

                                                {dancer?.administrator && (
                                                    <div className="flex mt-8 items-end">
                                                        <p className="text-sm font-medium text-gray-900">School administrator:&nbsp;</p>
                                                        <p className="font-medium text-gray-900">{dancer?.administrator.name}</p>
                                                    </div>
                                                )}

                                                {dancer?.eventsOrganizer.length > 0 && (
                                                    <div className="mt-8">
                                                        <h4 className="text-sm font-medium text-gray-900">Active organized events</h4>
                                                        <div className="prose prose-sm mt-2 text-gray-500">
                                                            <ul role="list" >
                                                                {dancer?.eventsOrganizer.map((event) => (
                                                                    <li key={event?.id}>{event?.name}</li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    </div>
                                                )}

                                                {dancer?.description && (
                                                    <div className="mt-8">
                                                        <h2 className="text-sm font-medium text-gray-900">Description:</h2>
                                                        <div
                                                            className="prose prose-sm text-gray-500"
                                                            // dangerouslySetInnerHTML={{ __html: optionObject?.description }}
                                                        />
                                                        {dancer?.description}
                                                    </div>
                                                )}
                                            </section>
                                        </div>
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

export default DancerQuickViewComponent
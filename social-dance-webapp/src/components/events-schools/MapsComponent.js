import {Fragment, useEffect, useState} from 'react'
import { Dialog, RadioGroup, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import {GoogleMap, Marker, useLoadScript} from "@react-google-maps/api";

const MapsComponent = ({ openMap, setOpenMap }) => {
    const [open, setOpen] = useState(openMap)
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.PUBLIC_GOOGLE_MAPS_API_KEY
        // googleMapsApiKey: "AIzaSyByPq5m4IDf-Bpvi7t6PTjVdkgvC2ecnMo"
    })

    useEffect(() => {
        setOpen(openMap)
    }, [openMap])

    const closeMap = () => {
        setOpenMap(false)
        setOpen(false)
    }

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={setOpen}>
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
                                        onClick={() => closeMap()}
                                    >
                                        <span className="sr-only">Close</span>
                                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                    </button>

                                    Maps {isLoaded || "loading..."}
                                    <div className="flex w-100 h-100">
                                        <GoogleMap
                                            zoom={10}
                                            center={{lat:44, lng: -80}}
                                            mapContainerClassName="w-100 h-100"
                                        >
                                            <Marker position={{lat:44, lng: -80}}/>
                                        </GoogleMap>
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

export default MapsComponent
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useValues } from "../../../hooks/useValues";
import SchoolEventForm from "./SchoolEventForm";
import { getOrganizedEvent } from "../../../redux/actions/eventActions";
import { deleteEvent, fetchOrganizedEvent } from "../../../api/EventApi";
import { fetchDancer } from "../../../api/DancerApi";
import { classNamesJoin } from "../../../util/classNameUtils";

const SUBTITLE = {
    EXIST_EVENTS: "All your active events.",
    NOT_EXIST_EVENTS: "You have no active events created.",
    NOT_EXIST_ORGANIZED_EVENT: "You can create new school.",
    DELETE_EVENT: "You can delete your school here. This action is not reversible. " +
        "All information related to this event will be deleted permanently.",
    CREATE_EVENT: "Click the button to open the form for creating a new event."
}

const MyEventsProfileComponent = () => {

    const dispatch = useDispatch();
    const { dancer } = useSelector(state => state.auth)
    const { organizedEvent } = useSelector(state => state.myEvents)
    const { TYPE_OPTIONS } = useValues()
    const [openEditForm, setOpenEditForm] = useState(false);

    const openEmptyEditForm = () => {
        dispatch(getOrganizedEvent({}))
        setOpenEditForm(true)
    }

    const setEventForUpdate = (id) => {
        dispatch(fetchOrganizedEvent(id))
            .then(() => {
                setOpenEditForm(true)
            })

    }

    const deleteCurrentEvent = () => {
        dispatch(deleteEvent(organizedEvent.id))
            .then(() => {
                dispatch(getOrganizedEvent({}))
                setOpenEditForm(false)
            })
            .then(() => {
                dispatch(fetchDancer(dancer.id))
            })
    }

    const highlightActiveEvent = (id) => {
        return id === organizedEvent.id && openEditForm
    }

    return (
        <div className="divide-y divide-white/5">
            <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
                <div>
                    <h2 className="text-base font-semibold leading-7 text-black">Create event</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-400">
                        {SUBTITLE.CREATE_EVENT}
                    </p>
                </div>
                <div className="md:col-span-2 ml-0 md:ml-8">
                    <button
                        type="button"
                        className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400"
                        onClick={() => openEmptyEditForm()}
                    >
                        Create event
                    </button>
                </div>

                <div>
                    <h2 className="text-base font-semibold leading-7 text-black">Your created events</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-400">
                        {dancer.eventsOrganizer?.length > 0 ? (
                            SUBTITLE.EXIST_EVENTS
                        ) : (
                            SUBTITLE.NOT_EXIST_EVENTS
                        )}
                    </p>
                </div>
                <div className="md:col-span-2">
                    <div className="prose prose-md font-bold text-gray-900">
                        <ul role="list" >
                            {dancer.eventsOrganizer?.map((item) => (
                                <li
                                    key={item.id}
                                    className="hover:text-indigo-600 cursor-pointer"
                                    onClick={() => setEventForUpdate(item.id)}
                                >
                                    <p className={classNamesJoin(highlightActiveEvent(item.id)  && "underline underline-offset-2 text-orange-500")}>{item.name}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {openEditForm && (
                    <>
                        <div>
                            <h2 className="text-lg font-semibold leading-7 text-black">Event Information</h2>
                        </div>
                        <SchoolEventForm
                            typeOption={TYPE_OPTIONS.EVENT}
                        />
                        {!organizedEvent.id || (
                            <>
                                <div>
                                    <h2 className="text-base font-semibold leading-7 text-black">Delete event</h2>
                                    <p className="mt-1 text-sm leading-6 text-gray-400">
                                        {SUBTITLE.DELETE_EVENT}
                                    </p>
                                </div>

                                <div className="md:col-span-2">
                                    <button
                                        type="button"
                                        className="rounded-md bg-red-500 mt-8 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-400"
                                        onClick={() => deleteCurrentEvent()}
                                    >
                                        Delete event
                                    </button>
                                </div>
                            </>
                        )}
                    </>
                )}
            </div>
        </div>
    )
}

export default MyEventsProfileComponent
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useHttp} from "../../../hooks/http.hook";
import {useEffect} from "react";
import {useValues} from "../../../hooks/useValues";
import SchoolEventForm from "./SchoolEventForm";
import {getOrganizedEvent} from "../../../redux/actions/eventActions";
import {GET} from "../../../api/Endpoints";
import {getAdministratedSchool} from "../../../redux/actions/schoolActions";
import {updateDancer} from "../../../redux/actions/authActions";

const SUBTITLE = {
    EXIST_EVENTS: "All your active events.",
    NOT_EXIST_EVENTS: "You have no active events created.",
    NOT_EXIST_ORGANIZED_EVENT: "You can create new school.",
    DELETE_EVENT: "You can delete your school here. This action is not reversible. " +
        "All information related to this event will be deleted permanently.",
    CREATE_EVENT: "Click the button to open the form for creating a new event."
}

const MyEventsProfileComponent = () => {

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {isAuthenticated, dancer} = useSelector(state => state.auth)
    const {organizedEvent} = useSelector(state => state.myEvents)
    const { months } = useValues()
    const {request} = useHttp();
    const [openEditForm, setOpenEditForm] = useState(false);

    useEffect(() => {
        if (!isAuthenticated){
            navigate("/events")
        }

    }, [isAuthenticated])

    const toggleOpenEditForm = () => {
        if (openEditForm && organizedEvent !== null){
            dispatch(getOrganizedEvent({}))
        }else {
            setOpenEditForm(!openEditForm)
        }

    }

    const setEventForUpdate = (id) => {
        setLoading(true);
        // setOpenEditForm(false)
        const getEvent = () => request(GET.getEvent(id))
        getEvent()
            .then(res => {
                console.log("res", res)
                dispatch(getOrganizedEvent(res))
                setLoading(false);
                setOpenEditForm(true)
            })
            .catch(error => {
                console.log("error", error)
                setLoading(false);
            })
    }

    return (
        <div className="divide-y divide-white/5">
            <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
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
                    {dancer.eventsOrganizer?.map(e => (
                        <a
                            key={e.id}
                            href="#"
                            className="hover:text-indigo-600"
                            onClick={() => setEventForUpdate(e.id)}
                        >
                            | {e.name} |
                        </a>

                    ))}
                </div>

                <div>
                    <h2 className="text-base font-semibold leading-7 text-black">Create event</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-400">
                        {SUBTITLE.CREATE_EVENT}
                    </p>
                </div>
                <div className="md:col-span-2">
                    <button
                        type="button"
                        className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400"
                        onClick={() => toggleOpenEditForm()}
                    >
                        Create event
                    </button>
                </div>

                {openEditForm && (
                    <>
                        <div>
                            <h2 className="text-lg font-semibold leading-7 text-black">Event Information</h2>
                            {/*<button*/}
                            {/*    type="button"*/}
                            {/*    className="rounded-md bg-gray-200 px-3 py-2 text-sm font-semibold text-black shadow-sm hover:bg-gray-400"*/}
                            {/*    onClick={() => toggleOpenEditForm()}*/}
                            {/*>*/}
                            {/*    Close edit form*/}
                            {/*</button>*/}
                        </div>
                        <SchoolEventForm
                            typeOption={"event"}
                            optionObject={organizedEvent}
                        />
                        {!!organizedEvent && (
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
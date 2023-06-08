import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useHttp} from "../../../hooks/http.hook";
import {useForm} from "react-hook-form";
import {useEffect} from "react";
import {useValues} from "../../../hooks/useValues";
import SchoolEventForm from "./SchoolEventForm";

const MyEventsProfileComponent = () => {

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {isAuthenticated, email, dancer} = useSelector(state => state.auth)
    const [event, setEvent] = useState()
    const { months } = useValues()
    const {request} = useHttp();
    const { register, handleSubmit, formState: { errors }, } = useForm()

    useEffect(() => {
        if (!isAuthenticated){
            navigate("/events")
        }
        // else {
        //     const month = dancer.birthday?.split("-")[1]
        //     setMonth(months.find(mon => mon.id === month)?.name);
        // }
    }, [isAuthenticated])

    const onSubmit = (data) => {
        console.log("onSubmit", data)
        setLoading(true)
        // const contactInfo = { email: data.email, phoneNumber: data.phoneNumber, country, city }
        // const updatedDancer = dancerMapper(dancer.id, data.name, data.lastName, gender,
        //     joinDateString(data.year, bMonth, data.day, months), data.description, level, dances, contactInfo, image)
        // console.log("updatedDancer", updatedDancer)
        // const update = () => request(POST.saveDancer(updatedDancer), "POST", JSON.stringify(updatedDancer))
        // update()
        //     .then(res => {
        //         // console.log("res", res)
        //         dispatch(updateDancer(res))
        //         setLoading(false);
        //     })
        //     .catch(error => {
        //         console.log("error", error)
        //         setLoading(false);
        //     })
    }

    return (
        <div className="divide-y divide-white/5">
            <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
                <div>
                    <h2 className="text-lg font-semibold leading-7 text-black">Event Information</h2>
                </div>
                <SchoolEventForm
                    typeOption={"event"}
                />
                <div>
                    <h2 className="text-base font-semibold leading-7 text-black">Delete event</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-400">
                        You can delete your event here. This action is not reversible.
                        All information related to this account will be deleted permanently.
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
            </div>
        </div>
    )
}

export default MyEventsProfileComponent
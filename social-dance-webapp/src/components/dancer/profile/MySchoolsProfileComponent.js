import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useHttp} from "../../../hooks/http.hook";
import {useForm} from "react-hook-form";
import {GET} from "../../../api/Endpoints";
import SchoolEventForm, {TYPE_OPTIONS} from "./SchoolEventForm";
import {getAdministratedSchool} from "../../../redux/actions/schoolActions";
import Spinner from "../../spinner/Spinner";

const SUBTITLE = {
    EXIST_ADMINISTRATED_SCHOOL: "You already have a school for administrate.",
    NOT_EXIST_ADMINISTRATED_SCHOOL: "You can create new school.",
    DELETE_SCHOOL: "You can delete your school here. This action is not reversible. " +
        "All information related to this school will be deleted permanently."
}

const MySchoolsProfileComponent = () => {

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {isAuthenticated, dancer} = useSelector(state => state.auth)
    const {administratedSchool} = useSelector(state => state.mySchools)
    const {request} = useHttp();
    const [administratedSchoolExist, setAdministratedSchoolExist] = useState(!!dancer.administrator)

    useEffect(() => {
        if (administratedSchoolExist){
            setLoading(true);
            const getSchool = () => request(GET.getSchool(dancer.administrator?.id))
            getSchool()
                .then(res => {
                    // console.log("res", res)
                    dispatch(getAdministratedSchool(res))
                    setLoading(false);
                })
                .catch(error => {
                    console.log("error", error)
                    setLoading(false);
                })
        }
    }, [])

    return (
        <div className="divide-y divide-white/5">
            {loading && <Spinner/>}
            <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
                <div>
                    <h2 className="text-lg font-semibold leading-7 text-black">School Information</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-400">
                        {administratedSchoolExist ? (
                            SUBTITLE.EXIST_ADMINISTRATED_SCHOOL
                        ) : (
                            SUBTITLE.NOT_EXIST_ADMINISTRATED_SCHOOL
                        )}
                    </p>
                </div>

                <SchoolEventForm
                    typeOption={TYPE_OPTIONS.SCHOOL}
                    optionObject={administratedSchool}
                />

                {administratedSchoolExist && (
                    <>
                        <div>
                            <h2 className="text-base font-semibold leading-7 text-black">Delete school</h2>
                            <p className="mt-1 text-sm leading-6 text-gray-400">
                                {SUBTITLE.DELETE_SCHOOL}
                            </p>
                        </div>

                        <div className="md:col-span-2">
                            <button
                                type="button"
                                className="rounded-md bg-red-500 mt-8 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-400"
                            >
                                Delete school
                            </button>
                        </div>
                    </>
                )}

            </div>
        </div>
    )
}

export default MySchoolsProfileComponent
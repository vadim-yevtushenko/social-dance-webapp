import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SchoolEventForm from "./SchoolEventForm";
import { useValues } from "../../../hooks/useValues";
import { deleteSchool, fetchAdministratedSchool } from "../../../api/SchoolApi";
import { getAdministratedSchool } from "../../../redux/actions/schoolActions";
import DeletingBlock from "./administrate/DeletingBlock";

const SUBTITLE = {
    EXIST_ADMINISTRATED_SCHOOL: "You already have a school for administrate.",
    NOT_EXIST_ADMINISTRATED_SCHOOL: "You can create new school.",
    DELETE_SCHOOL: "You can delete your school here. This action is not reversible. " +
        "All information related to this school will be deleted permanently."
}

const MySchoolsProfileComponent = () => {

    const dispatch = useDispatch();
    const { dancer } = useSelector(state => state.auth)
    const { administratedSchool } = useSelector(state => state.mySchools)
    const { TYPE_OPTIONS } = useValues()

    useEffect(() => {
        if (dancer.administrator){
            dispatch(fetchAdministratedSchool(dancer.administrator?.id))
        }else if (administratedSchool.id && !dancer.administrator){
            dispatch(getAdministratedSchool({}))
        }
    }, [])


    const deleteCurrentSchool = () => {
        dispatch(deleteSchool(administratedSchool.id, dancer.id))
    }

    return (
        <div className="divide-y divide-white/5">
            <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
                <div>
                    <h2 className="text-lg font-semibold leading-7 text-black">School Information</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-400">
                        {dancer.administrator ? (
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

                {dancer.administrator && (
                    <DeletingBlock
                        title={"school"}
                        subTitle={SUBTITLE.DELETE_SCHOOL}
                        buttonName={"Delete school"}
                        action={deleteCurrentSchool}
                    />
                )}

            </div>
        </div>
    )
}

export default MySchoolsProfileComponent
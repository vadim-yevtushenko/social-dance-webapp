import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import DropDownListElement from "../../forms/elements/DropDownListElement";
import { useEffect } from "react";
import { useValues } from "../../../hooks/useValues";
import SchoolEventForm from "./SchoolEventForm";

const SchoolOrEventProfileComponent = () => {

    const navigate = useNavigate();
    const { isAuthenticated, dancer } = useSelector(state => state.auth)
    const { createOptions } = useValues()
    const [typeOption, setTypeOption] = useState(createOptions[0]);

    useEffect(() => {
        if (!isAuthenticated){
            navigate("/events")
        }
    }, [isAuthenticated])

    return (
        <div>
            <main>
                <div className="divide-y divide-white/5">
                    <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">

                        <div className="flex content-center">
                            <h2 className="flex mt-2 mr-2 text-lg font-semibold leading-7 text-black">Create </h2>
                            <div>
                                <DropDownListElement
                                    disabled={false}
                                    startOption={typeOption}
                                    setOption={setTypeOption}
                                    options={createOptions}
                                    font={"font-bold"}
                                />
                            </div>
                        </div>
                        <SchoolEventForm
                            typeOption={typeOption}
                        />
                    </div>

                </div>
            </main>
        </div>
    )
}

export default SchoolOrEventProfileComponent
import {useEffect, useState} from "react";
import {useHttp} from "../../hooks/http.hook";
import { getDances } from "../../redux/actions/danceAction";
import {useDispatch, useSelector} from "react-redux";
import Spinner from "../spinner/Spinner";
import {GET} from "../../api/Endpoints";

export default function CheckboxElement({label, checkedDances, setDances}) {

    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const danceList = useSelector(state => state.danceList.dances)
    const [socialDances, setSocialDances] = useState([])
    const [checkedState, setCheckedState] = useState([]);
    const {request} = useHttp();

    useEffect(() => {
        setLoading(true);
        request(GET.getDances())
            .then(res => {
                dispatch(getDances(res))
                setLoading(false);
            })
            .then(() => {
                setSocialDances(danceList)
            })
            .then(() => {
                if (checkedDances?.length > 0){
                    danceList?.forEach((element, i) => {
                        if (checkedDances.includes(element.name)){
                            checkedState[i] = true
                        }
                    })
                }else {
                    setCheckedState(new Array(danceList?.length).fill(false))
                }
            })
            .catch(error => {
                console.log("error", error)
                // setSocialDances(localSocialDances)
                setLoading(false);
            })
    }, [])

    function handleOnChange(i) {
        const updatedCheckedState = checkedState.map((item, index) =>
            index === i ? !item : item
        );

        setCheckedState(updatedCheckedState);
        const updatedDances = []
        socialDances.forEach((dance, i) => {
            if (updatedCheckedState[i]){
                updatedDances.push(dance)
            }
        })

        setDances(updatedDances)
    }

    return (
        <fieldset>
            {loading && <Spinner/>}
            <legend className="text-base font-semibold leading-6 text-gray-900">{label}</legend>
            <div className="mt-4 divide-y divide-gray-400 border-b border-t border-gray-400">
                {socialDances?.map((element, i) => (
                    <div key={element.id} className="relative flex items-start py-4">
                        <div className="min-w-0 flex-1 text-sm leading-6">
                            <label htmlFor={element.id} className="select-none font-medium text-gray-900">
                                {element.name}
                            </label>
                        </div>
                        <div className="ml-3 flex h-6 items-center">
                            <input
                                id={element.id}
                                name={element.name}
                                type="checkbox"
                                checked={checkedState[i]}
                                onChange={() => handleOnChange(i)}
                                className="h-4 w-4 rounded border-gray-400 text-indigo-600 focus:ring-indigo-600"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </fieldset>
    )
}
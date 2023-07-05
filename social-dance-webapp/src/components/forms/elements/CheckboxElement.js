import {useEffect, useState} from "react";
import {useValues} from "../../../hooks/useValues";

export default function CheckboxElement({label, checkedDances, setDances}) {

    const [checkedState, setCheckedState] = useState([]);
    const [checkedDancerDances, setCheckedDancerDances] = useState(checkedDances);
    const {socialDances} = useValues()

    useEffect(() => {
        setCheckedDancerDances(checkedDances)
        if (checkedDances?.length > 0){
            socialDances?.forEach((element, i) => {
                checkedState[i] = !!checkedDances.includes(element.name);
            })
        }else {
            setCheckedState(new Array(socialDances?.length).fill(false))
        }
    }, [checkedDances])

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
            <legend className="text-base font-semibold leading-6 text-gray-900">{label}</legend>
            <div className="mt-4 divide-y divide-gray-400 border-b border-t border-gray-400">
                {socialDances?.map((dance, i) => (
                    <div key={dance.id} className="relative flex items-start py-4">
                        <div className="min-w-0 flex-1 text-sm leading-6">
                            <label htmlFor={dance.id} className="select-none font-medium text-gray-900">
                                {dance.name}
                            </label>
                        </div>
                        <div className="ml-3 flex h-6 items-center">
                            <input
                                id={dance.id}
                                name={dance.name}
                                type="checkbox"
                                checked={checkedState[i] || false}
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
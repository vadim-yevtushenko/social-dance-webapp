import {useEffect, useState} from "react";

export default function CheckboxElement({label, socialDances, checkedDances, setDances}) {

    const [checkedState, setCheckedState] = useState(
        new Array(socialDances.length).fill(false)
    );

    useEffect(() => {
        if (!checkedDances.isEmpty){
            socialDances?.forEach((element, i) => {
                if (checkedDances.includes(element.name)){
                    checkedState[i] = true
                }
            })
        }
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
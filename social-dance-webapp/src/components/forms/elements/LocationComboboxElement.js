import { useEffect, useState } from "react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { classNamesJoin } from "../../../util/classNameUtils";
import { Combobox } from '@headlessui/react'

export default function LocationComboboxElement({ label, value, setValue, request, setLat, setLng, isDisable }) {

    const [filteredValues, setFilteredValues] = useState([])
    const [currentValue, setCurrentValue] = useState(value)
    const [disable, setDisable] = useState(isDisable)

    useEffect(() => {
        setDisable(isDisable)
        if (isDisable) {
            setValue("")
        }
    }, [isDisable])

    useEffect(() => {
        setCurrentValue(value)
    }, [value])

    const onChange = (changedValue) => {
        if (changedValue.length > 0) {
            request(changedValue)
                .then(res => {
                    if (res !== undefined){
                        setFilteredValues(res)
                    }
                })
                .catch(error => {
                    console.log("error", error)
                })
        }else {
            setValue(changedValue)
        }
    }

    const setSelectedValue = (selectedValue) => {
        setValue(selectedValue)
        if(setLat && setLng){
            const cityObj = filteredValues.filter(city => city.name === selectedValue)[0]
            setLat(cityObj?.lat)
            setLng(cityObj?.lng)
        }
    }

    return (
        <Combobox as="div" value={currentValue} onChange={setSelectedValue} disabled={Boolean(disable)}>
            <Combobox.Label className="block text-sm font-medium leading-6 text-gray-900">{label}</Combobox.Label>
            <div className="relative mt-2">
                <Combobox.Input
                    className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset
                    ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={(event) => onChange(event.target.value)}
                    displayValue={() => String(currentValue)}
                />
                <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                    <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </Combobox.Button>

                {filteredValues.length > 0 && (
                    <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1
                    text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {filteredValues.map((value) => (
                            <Combobox.Option
                                key={value.id}
                                value={value.name}
                                className={({ active }) =>
                                    classNamesJoin(
                                        'relative cursor-default select-none py-2 pl-3 pr-9',
                                        active ? 'bg-indigo-600 text-white' : 'text-gray-900'
                                    )
                                }
                            >
                                {({ active, selected }) => (
                                    <>
                                        <span className={classNamesJoin('block truncate', selected && 'font-semibold')}>{value.name}</span>

                                        {selected && (
                                            <span
                                                className={classNamesJoin(
                                                    'absolute inset-y-0 right-0 flex items-center pr-4',
                                                    active ? 'text-white' : 'text-indigo-600'
                                                )}
                                            >
                                                <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                              </span>
                                        )}
                                    </>
                                )}
                            </Combobox.Option>
                        ))}
                    </Combobox.Options>
                )}
            </div>
        </Combobox>
    )
}
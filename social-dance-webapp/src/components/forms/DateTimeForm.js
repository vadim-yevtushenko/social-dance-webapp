import DropDownList from "./DropDownList";
import {useValues} from "../../hooks/useValues";
import {useForm} from "react-hook-form";
import {useEffect, useState} from "react";
import {joinDateString} from "../../util/dateTimeUtils";

const DateTimeForm = ({date, setDateTime, time = false}) => {

    const { months } = useValues()
    const [day, setDay] = useState("");
    const [month, setMonth] = useState("");
    const [year, setYear] = useState();
    const [hour, setHour] = useState("");
    const [minute, setMinute] = useState("");
    const { register, formState: { errors } } = useForm()
    console.log("DateTimeForm", )

    useEffect(() => {
console.log("DateTimeForm", )
        const numMonth = date.split("-")[1]
        setMonth(months.find(mon => mon.id === numMonth)?.name);
        setDay(date.split("-")[2])
        setYear(date.split("-")[0])
        // submitDate()
    }, [])

    const submitDate = () => {
        setDateTime(joinDateString(year, month, day, months))
    }

    return (

        <form className="flex mt-2 justify-around">
            <div className="flex w-10 rounded-md bg-white/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500">
                <input
                    type="text"
                    name="day"
                    id="day"
                    autoComplete="day"
                    // value={date.split("-")[2]}
                    onChange={event => setDay(event.target.value)}
                    {...register('day', { value: date.split("-")[2], maxLength: 2, minLength: 2, min: 1, max: 31 })}
                    className="flex-1 w-10 rounded-md shadow-md border-1 bg-transparent py-1.5 pl-1 text-black focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="day"
                />
            </div>
            <div className="flex">
                <DropDownList
                    disabled={false}
                    startOption={month}
                    setOption={setMonth}
                    options={months.map(month => month.name)}
                />
            </div>
            <div className="flex w-20 rounded-md bg-white/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500">
                <input
                    type="text"
                    name="year"
                    id="year"
                    autoComplete="year"
                    // value={year}
                    // onChange={event => setYear(event.target.value)}
                    {...register('year', { value: date.split("-")[0], maxLength: 4, minLength: 4, min: 1900, max: 2100 })}
                    className="flex-1 w-20 rounded-md shadow-md border-1 bg-transparent py-1.5 pl-1 text-black focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="year"
                />
            </div>
        </form>

    )
}

export default DateTimeForm

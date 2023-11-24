import DropDownListElement from "./elements/DropDownListElement";
import { useValues } from "../../hooks/useValues";
import React from "react";

const DateTimeForm = ({ day, setDay, month, setMonth, year, setYear,
                          time = false, hour, setHour, minute, setMinute }) => {

    const { days, months, years, hours, minutes } = useValues()

    const defineDaysNumber = () => {
        if (['April', 'June', 'September', 'November'].includes(month)){
            return days.slice(0, 31)
        }
        if ('February' === month){
            if (leapYear(year)){
                return days.slice(0, 30)
            }
            return days.slice(0, 29)
        }

        return days
    }

    const leapYear = (year) => ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0);

    const defineYears = () => time ? years(new Date().getFullYear(), new Date().getFullYear() + 5) : years(1940, new Date().getFullYear())

    return (
        <div className="flex-col">
            <div className="flex justify-around mb-2">
                <div className="flex">
                    <DropDownListElement
                        disabled={false}
                        startOption={year !== undefined ? year : ""}
                        setOption={setYear}
                        options={defineYears()}
                    />
                </div>
                <div className="flex">
                    <DropDownListElement
                        disabled={false}
                        startOption={month !== undefined ? month : ""}
                        setOption={setMonth}
                        options={months.map(month => month.name)}
                    />
                </div>
                <div className="flex">
                    <DropDownListElement
                        disabled={false}
                        startOption={day !== undefined ? day : ""}
                        setOption={setDay}
                        options={defineDaysNumber()}
                    />
                </div>
            </div>

            {time && (
                <div className="flex justify-center">
                    <div className="flex">
                        <DropDownListElement
                            disabled={false}
                            startOption={hour !== undefined ? hour : ""}
                            setOption={setHour}
                            options={hours}
                        />
                    </div>
                    <span className="text-xl mt-1">&nbsp;:&nbsp;</span>
                    <div className="flex">
                        <DropDownListElement
                            disabled={false}
                            startOption={minute !== undefined ? minute : ""}
                            setOption={setMinute}
                            options={minutes}
                        />
                    </div>
                </div>
            )}
        </div>

    )
}

export default DateTimeForm

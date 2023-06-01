import dayjs from "dayjs";

export const parseFullDateString = (fullDateString) => {
    return dayjs(fullDateString, 'utc').format('DD MMM YYYY');
};

export const parseFullDateTimeString = (fullDateString) => {
    return dayjs(fullDateString, 'utc').format('DD MMM YYYY HH:mm');
};

export const splitDateString = (fullDateString) => {
    const dateArr = fullDateString.split("-")
    return {
        year: dateArr[0],
        month: dateArr[1],
        day: dateArr[2],
    }
}

export const joinDateString = (year, month, day, months) => {
    console.log("month", month)
    const numMonth = months.find(mon => mon.name === month).id
    console.log("numMonth", numMonth)
    return year + "-" + numMonth + "-" + day
}
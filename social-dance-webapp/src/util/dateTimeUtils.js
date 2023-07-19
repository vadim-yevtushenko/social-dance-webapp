import dayjs from "dayjs";

export const parseFullDateString = (fullDateString) => {
    return dayjs(fullDateString, 'utc').format('DD MMMM YYYY');
};

export const parseFullDateTimeString = (fullDateString) => {
    return dayjs(fullDateString, 'utc').format('DD MMM YYYY HH:mm');
};

export const splitDateTimeString = (fullDateTimeString) => {
    const fullDateTimeSplit = fullDateTimeString.split('T')
    const dateSplit = fullDateTimeSplit[0].split("-")
    const timeSplit = fullDateTimeSplit[1].split(":")
    return {
        year: dateSplit[0],
        month: dateSplit[1],
        day: dateSplit[2],
        hour: timeSplit[0],
        minute: timeSplit[1].substring(0,2),
    }
}

export const joinDateString = (year, month, day, months) => {
    if (day === undefined || month === undefined || year === undefined){
        return null
    }
    const numMonth = months.find(mon => mon.name === month).id
    return year + "-" + numMonth + "-" + day
}

export const joinDateTimeString = (year, month, day, hour, minute, months) => {
    const date = joinDateString(year, month, day, months)
    if (date == null){
        return null
    }

    return date + "T" + hour + ":" + minute + "+00:00"
}

export const getMonthNumber = (month) => {
    switch (month){
        case "January": return 0;
        case "February": return 1;
        case "March": return 2;
        case "April": return 3;
        case "May": return 4;
        case "June": return 5;
        case "July": return 6;
        case "August": return 7;
        case "September": return 8;
        case "October": return 9;
        case "November": return 10;
        case "December": return 11;
    }

}
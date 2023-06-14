export const useValues = () => {

    const dancerPageSizeOptions = [5, 10, 20, 50]

    const eventSchoolPageSizeOptions = [6, 12, 24]

    const levelOptions = ["JUNIOR", "MIDDLE", "ADVANCED", "TEACHER"]

    const genderButtons = [
        { id: 'male', title: 'male' },
        { id: 'female', title: 'female' }
    ]

    const months = [
        { id: '01', name: 'January' },
        { id: '02', name: 'February' },
        { id: '03', name: 'March' },
        { id: '04', name: 'April' },
        { id: '05', name: 'May' },
        { id: '06', name: 'June' },
        { id: '07', name: 'July' },
        { id: '08', name: 'August' },
        { id: '09', name: 'September' },
        { id: '10', name: 'October' },
        { id: '11', name: 'November' },
        { id: '12', name: 'December' },
    ]

    const socialDances = [
        { id: '01', name: 'Salsa' },
        { id: '02', name: 'Bachata' },
        { id: '03', name: 'Kizomba' },
        { id: '04', name: 'Zouk' },
        { id: '05', name: 'Merenge' },
        { id: '06', name: 'Reggaeton' },
        { id: '07', name: 'Argentine Tango' },
        { id: '08', name: 'Mambo' },
    ]

    const createOptions = ["school", "event"]

    return {dancerPageSizeOptions, eventSchoolPageSizeOptions, levelOptions, genderButtons, months, socialDances, createOptions}

}
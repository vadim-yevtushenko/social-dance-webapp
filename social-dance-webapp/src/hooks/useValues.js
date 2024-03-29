import {StarIcon} from "@heroicons/react/20/solid";

export const useValues = () => {

    const pageSizeOptions = [5, 10, 20, 50]

    const eventOrSchoolPageSizeOptions = [6, 12, 24]

    const levelOptions = ["UNDEFINED", "JUNIOR", "MIDDLE", "ADVANCED", "PROFESSIONAL"]

    const ratingButtons = [
        { id: '1', title: <div className="flex items-center">
                <p>1</p>
                <StarIcon className='text-yellow-400 h-5 w-5 flex-shrink-0 ml-1'/>
            </div> },
        { id: '2', title: <div className="flex items-center">
                <p>2</p>
                <StarIcon className='text-yellow-400 h-5 w-5 flex-shrink-0 ml-1'/>
            </div> },
        { id: '3', title: <div className="flex items-center">
                <p>3</p>
                <StarIcon className='text-yellow-400 h-5 w-5 flex-shrink-0 ml-1'/>
            </div> },
        { id: '4', title: <div className="flex items-center">
                <p>4</p>
                <StarIcon className='text-yellow-400 h-5 w-5 flex-shrink-0 ml-1'/>
            </div> },
        { id: '5', title: <div className="flex items-center">
                <p>5</p>
                <StarIcon className='text-yellow-400 h-5 w-5 flex-shrink-0 ml-1'/>
            </div> },
    ]

    const genderButtons = [
        { id: 'male', title: 'male' },
        { id: 'female', title: 'female' }
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

    const TYPE_OPTIONS = {
        SCHOOL: "school",
        EVENT: "event"
    }

    const days = ['', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15',
        '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31']

    const months = [
        { id: '00', name: '' },
        { id: '01', name: "January" },
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

    const years = (startYear, finishYear) => {
        const result = ['']
        for(let i = startYear; i <= finishYear; i++){
            result.push(String(i))
        }
        return result
    }

    const hours = ['', '00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15',
        '16', '17', '18', '19', '20', '21', '22', '23']

    const minutes = ['', '00', '10', '20', '30', '40', '50']

    return { dancerPageSizeOptions: pageSizeOptions, eventOrSchoolPageSizeOptions, levelOptions, genderButtons,
        socialDances, TYPE_OPTIONS, ratingButtons, days, months, years, hours, minutes }

}
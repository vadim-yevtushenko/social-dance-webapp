const initialState = () => ({
    auth: {
        email: '',
        password: '',
        isAuthenticated: false,
        dancer: {dancer: {
            contactInfo:{}
            }}
    },
    // dancer: {
    //     id: null,
    //     name: '',
    //     lastName: '',
    //     gender: '',
    //     birthday: '',
    //     description: '',
    //     image: '',
    //     contactInfo: null,
    //     level: '',
    //     dances: [],
    //     administrator: null,
    //     teacher: null,
    //     school: null
    // },
    danceList: {
        dances: [],
        loading: false
    },
    // schoolList: {
    //     size: 10,
    //     page: 1,
    //     results: [],
    //     total: 0,
    //     filter: [],
    //     loading: false
    // },
    // eventList: {
    //     size: 10,
    //     page: 1,
    //     results: [],
    //     total: 0,
    //     filter: [],
    //     loading: false
    // },
})

export default initialState
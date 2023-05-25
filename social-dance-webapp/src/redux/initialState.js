const initialState = () => ({
    auth: {
        email: '',
        password: '',
        isAuthenticated: false,
        dancer: {}
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
    dancerList: {
        size: 10,
        page: 1,
        results: [],
        total: 0,
        filter: [],
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
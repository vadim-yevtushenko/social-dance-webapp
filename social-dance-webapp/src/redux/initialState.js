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
    mySchools: {
        administratedSchool: {
            contactInfo:{}
        },
        loading: false
    },
    myEvents: {
        organizedEvent: {
            contactInfo:{}
        },
        loading: false
    },
})

export default initialState
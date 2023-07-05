const initialState = () => ({
    auth: {
        email: '',
        password: '',
        isAuthenticated: false,
        dancer: {
            contactInfo: {}
        }
    },
    request: {
        loading: false,
    },
    mySchools: {
        administratedSchool: {
            contactInfo:{}
        },
    },
    myEvents: {
        organizedEvent: {
            contactInfo:{}
        },
    },
    lists: {
        results: [],
        total: 0,
        viewObject: {
            contactInfo: {}
        }
    },
    feedback: {
        rating: 0,
        generalRating: {},
        reviews: {}
    }
})

export default initialState
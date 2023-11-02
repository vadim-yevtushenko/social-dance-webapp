const initialState = () => ({
    auth: {
        email: '',
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
            contactInfo: {}
        },
    },
    myEvents: {
        organizedEvent: {
            contactInfo:{}
        },
    },
    lists: {
        events: [],
        schools: [],
        dancers: [],
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
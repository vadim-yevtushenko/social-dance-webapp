// const API_BASE_URL=process.env.API_BASE_URL
// const API_BASE_URL='http://localhost:8080'
const API_BASE_URL='https://social-dance-a9e93f560bda.herokuapp.com'

export const GET = {
    // Dancers
    getDancers: (name, lastName, country, city, page, size) => {
        let url = `${API_BASE_URL}/dancers?`
        if (!!name) url = url.concat(`name=${name}&`)
        if (!!lastName) url = url.concat(`lastName=${lastName}&`)
        if (!!country) url = url.concat(`country=${country}&`)
        if (!!city) url = url.concat(`city=${city}&`)
        if (!!page) url = url.concat(`pageNumber=${page}&`)
        if (!!size) url = url.concat(`size=${size}`)
        return url
    },
    getDancer: (dancerId) => `${API_BASE_URL}/dancers/${dancerId}`,

    // Schools
    getSchools: (name, country, city, page, size) => {
        let url = `${API_BASE_URL}/schools?`
        if (!!name) url = url.concat(`name=${name}&`)
        if (!!country) url = url.concat(`country=${country}&`)
        if (!!city) url = url.concat(`city=${city}&`)
        if (!!page) url = url.concat(`pageNumber=${page}&`)
        if (!!size) url = url.concat(`size=${size}`)
        return url
    },
    getSchool: (schoolId) => `${API_BASE_URL}/schools/${schoolId}`,

    // Events
    getEvents: (name, country, city, page, size) => {
        let url = `${API_BASE_URL}/events?`
        if (!!name) url = url.concat(`name=${name}&`)
        if (!!country) url = url.concat(`country=${country}&`)
        if (!!city) url = url.concat(`city=${city}&`)
        if (!!page) url = url.concat(`pageNumber=${page}&`)
        if (!!size) url = url.concat(`size=${size}`)
        return url
    },
    getEvent: (eventId) => `${API_BASE_URL}/events/${eventId}`,
    getEventsByDancerId: (dancerId) => `${API_BASE_URL}/events/organizer/${dancerId}`,

    // Rating
    getGeneralRating: (schoolId) => `${API_BASE_URL}/ratings/${schoolId}`,
    getRating: (schoolId, dancerId) => `${API_BASE_URL}/ratings?schoolId=${schoolId}&dancerId=${dancerId}`,

    // Review
    getReviews: (schoolId, page, size) => {
        let url = `${API_BASE_URL}/reviews?schoolId=${schoolId}`
        if (!!page) url = url.concat(`&pageNumber=${page}`)
        if (!!size) url = url.concat(`&size=${size}`)
        return url
    },

    // Location
    getCountries: (name) => {
        let url = `${API_BASE_URL}/location/countries?`
        if (!!name) url = url.concat(`name=${name}`)
        return url
    },
    getCities: (name, country) => {
        let url = `${API_BASE_URL}/location/cities?`
        if (!!name) url = url.concat(`name=${name}&`)
        if (!!country) url = url.concat(`country=${country}`)
        return url
    },

};

export const POST = {
    // Dancers
    saveDancer: () => `${API_BASE_URL}/dancers`,
    uploadDancerImage: (id) => `${API_BASE_URL}/dancers/upload-image?id=${id}`,

    // Schools
    saveSchool: () => `${API_BASE_URL}/schools`,
    uploadSchoolImage: (id) => `${API_BASE_URL}/schools/upload-image?id=${id}`,

    // Events
    saveEvent: () => `${API_BASE_URL}/events`,
    uploadEventImage: (id) => `${API_BASE_URL}/events/upload-image?id=${id}`,

    // Credential
    login: (email, password, oldPassword) => `${API_BASE_URL}/credential/login?email=${email}&password=${password}`,
    registration: (email, password) => `${API_BASE_URL}/credential/registration?email=${email}&password=${password}`,
    changePassword: (email, newPassword, oldPassword) => `${API_BASE_URL}/credential/change-password?email=${email}&newPassword=${newPassword}&oldPassword=${oldPassword}`,
    changeEmail: (email, newEmail) => `${API_BASE_URL}/credential/change-email?email=${email}&newEmail=${newEmail}`,
    resetPassword: (email) => `${API_BASE_URL}/credential/reset_password?email=${email}`,

    // Admin
    supportEmail: () => `${API_BASE_URL}/admin/support`,

    // Rating
    saveRating: () => `${API_BASE_URL}/ratings`,

    // Review
    saveReview: () => `${API_BASE_URL}/reviews`,
};

export const DELETE = {
    // Dancers
    deleteDancer: (dancerId) => `${API_BASE_URL}/dancers/${dancerId}`,
    deleteDancerImage: (dancerId) => `${API_BASE_URL}/dancers/delete-image?id=${dancerId}`,

    // Schools
    deleteSchool: (schoolId) => `${API_BASE_URL}/schools/${schoolId}`,
    deleteSchoolImage: (schoolId) => `${API_BASE_URL}/schools/delete-image?id=${schoolId}`,

    // Events
    deleteEvent: (eventId) => `${API_BASE_URL}/events/${eventId}`,
    deleteEventImage: (eventId) => `${API_BASE_URL}/events/delete-image?id=${eventId}`,
};
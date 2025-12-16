// const API_BASE_URL=process.env.API_BASE_URL
// const API_BASE_URL='http://localhost:8080'
const API_BASE_URL='https://social-dance-server.onrender.com'

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
    getGeneralRating: (objectId) => `${API_BASE_URL}/ratings/${objectId}`,
    getRating: (objectId, dancerId) => `${API_BASE_URL}/ratings?objectId=${objectId}&dancerId=${dancerId}`,

    // Review
    getReviews: (objectId, page, size) => {
        let url = `${API_BASE_URL}/reviews?objectId=${objectId}`
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
    saveSchool: (adminId) => `${API_BASE_URL}/schools?adminId=${adminId}`,
    notifyCreatedSchool: () => `${API_BASE_URL}/schools/notify-created`,
    uploadSchoolImage: (id, adminId) => `${API_BASE_URL}/schools/upload-image?id=${id}&adminId=${adminId}`,

    // Events
    saveEvent: (organizerId) => `${API_BASE_URL}/events?organizerId=${organizerId}`,
    notifyCreatedEvent: () => `${API_BASE_URL}/events/notify-created`,
    uploadEventImage: (id, organizerId) => `${API_BASE_URL}/events/upload-image?id=${id}&organizerId=${organizerId}`,

    // Credential
    login: (email, password) => `${API_BASE_URL}/credentials/login?email=${email}&password=${password}`,
    registration: (email, password) => `${API_BASE_URL}/credentials/registration?email=${email}&password=${password}`,
    changePassword: (email, newPassword, oldPassword) => `${API_BASE_URL}/credentials/change-password?email=${email}&newPassword=${newPassword}&oldPassword=${oldPassword}`,
    changeEmail: (email, newEmail, password) => `${API_BASE_URL}/credentials/change-email?email=${email}&newEmail=${newEmail}&password=${password}`,
    resetPassword: (email) => `${API_BASE_URL}/credentials/reset_password?email=${email}`,

    // Admin
    supportEmail: () => `${API_BASE_URL}/admin/support`,

    // Rating
    saveRating: () => `${API_BASE_URL}/ratings`,

    // Review
    saveReview: () => `${API_BASE_URL}/reviews`,
};

export const DELETE = {
    // Dancers
    deleteDancer: (dancerId, password) => `${API_BASE_URL}/dancers/${dancerId}?password=${password}`,
    deleteDancerImage: (dancerId) => `${API_BASE_URL}/dancers/delete-image?id=${dancerId}`,

    // Schools
    deleteSchool: (schoolId, adminId) => `${API_BASE_URL}/schools/${schoolId}?adminId=${adminId}`,
    deleteSchoolImage: (schoolId, adminId) => `${API_BASE_URL}/schools/delete-image?id=${schoolId}&adminId=${adminId}`,

    // Events
    deleteEvent: (eventId, organizerId) => `${API_BASE_URL}/events/${eventId}?organizerId=${organizerId}`,
    deleteEventImage: (eventId, organizerId) => `${API_BASE_URL}/events/delete-image?id=${eventId}&organizerId=${organizerId}`,

    // Review
    deleteReview: (reviewId) => `${API_BASE_URL}/reviews/${reviewId}`,
};
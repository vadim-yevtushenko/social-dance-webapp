const API_BASE_URL='http://localhost:8080';
// const API_BASE_URL='https://jsonplaceholder.typicode.com/todos/1';

// import {API_BASE_URL} from "./config/runTimeConfig";

export const GET = {
    // Dancers
    getDancers: (page, size, name, lastName, city) => {
        let url = `${API_BASE_URL}/dancers?`
        if (!!name) url = url.concat(`name=${name}&`)
        if (!!lastName) url = url.concat(`lastName=${lastName}&`)
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

    // Utils
    getCountries: (name) => {
        let url = `${API_BASE_URL}/utils/countries?`
        if (!!name) url = url.concat(`name=${name}`)
        return url
    },
    getCities: (name, country) => {
        let url = `${API_BASE_URL}/utils/cities?`
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
    login: (email, password) => `${API_BASE_URL}/credential/login?email=${email}&password=${password}`,
    registration: (email, password) => `${API_BASE_URL}/credential/registration?email=${email}&password=${password}`,
    changePassword: (email, password) => `${API_BASE_URL}/credential/change-password?email=${email}&password=${password}`,
    changeEmail: (email, newEmail) => `${API_BASE_URL}/credential/change-email?email=${email}&newEmail=${newEmail}`,

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
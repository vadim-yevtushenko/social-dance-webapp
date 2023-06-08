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
    getSchools: (page, size) => {
        let url = `${API_BASE_URL}/schools?`
        if (!!page) url = url.concat(`pageNumber=${page}&`)
        if (!!size) url = url.concat(`size=${size}`)
        return url
    },

    getSchool: (schoolId) => `${API_BASE_URL}/schools/${schoolId}`,

    // Events
    getEvents: (page, size) => {
        let url = `${API_BASE_URL}/events?`
        if (!!page) url = url.concat(`pageNumber=${page}&`)
        if (!!size) url = url.concat(`size=${size}`)
        return url
    },

    getEvent: (eventId) => `${API_BASE_URL}/events/${eventId}`,

    getEventsByDancerId: (dancerId) => `${API_BASE_URL}/events/organizer/${dancerId}`,

    // Credential

    // Utils
    getDances: () => `${API_BASE_URL}/utils/dances`,

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

    // Schools
    saveSchool: () => `${API_BASE_URL}/schools`,

    // Events
    saveEvent: () => `${API_BASE_URL}/events`,

    // Credential
    login: (email, password) => `${API_BASE_URL}/credential/login?email=${email}&password=${password}`,
    registration: (email, password) => `${API_BASE_URL}/credential/registration?email=${email}&password=${password}`,
};

export const DELETE = {
    // Dancers
    deleteDancer: (dancerId) => {
        return `${API_BASE_URL}/dancers/${dancerId}`;
    }

    // Schools

    // Events
};
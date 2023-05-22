const API_BASE_URL='http://localhost:8080';
// const API_BASE_URL='https://jsonplaceholder.typicode.com/todos/1';

// import {API_BASE_URL} from "./config/runTimeConfig";

export const GET = {
    // Dancers
    getDancers: (page, size) => {
        let url = `${API_BASE_URL}/dancers?`
        if (!!page) url = url.concat(`pageNumber=${page}&`)
        if (!!size) url = url.concat(`size=${size}&`)
        return url
    },

    getDancer: (dancerId) => `${API_BASE_URL}/dancers/${dancerId}`,


    // Schools
    getSchools: (page, size) => {
        let url = `${API_BASE_URL}/schools?`
        if (!!page) url = url.concat(`pageNumber=${page}&`)
        if (!!size) url = url.concat(`size=${size}&`)
        return url
    },

    getSchool: (schoolId) => `${API_BASE_URL}/schools/${schoolId}`,

    // Events
    getEvents: (page, size) => {
        let url = `${API_BASE_URL}/events?`
        if (!!page) url = url.concat(`pageNumber=${page}&`)
        if (!!size) url = url.concat(`size=${size}&`)
        return url
    },

    getEvent: (eventId) => `${API_BASE_URL}/events/${eventId}`,
};

export const POST = {
    // Dancers
    createDancer: () => {
        return `${API_BASE_URL}/dancers`;
    }

    // Schools

    // Events
};

export const DELETE = {
    // Dancers
    deleteDancer: (dancerId) => {
        return `${API_BASE_URL}/dancers/${dancerId}`;
    }

    // Schools

    // Events
};
const API_BASE_URL='http://localhost:8080';
// const API_BASE_URL='https://jsonplaceholder.typicode.com/todos/1';

// import {API_BASE_URL} from "./config/runTimeConfig";

export const GET = {
    // Dancers
    getDancers: (offset, size) => {
        let url = `${API_BASE_URL}/dancers?`
        if (!!offset) url = url.concat(`offset=${offset}&`)
        if (!!size) url = url.concat(`size=${size}&`)
        return url
    },

    getDancer: (dancerId) => `${API_BASE_URL}/dancers/${dancerId}`


    // Schools

    // Events
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
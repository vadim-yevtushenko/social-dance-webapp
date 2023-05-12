const API_BASE_URL='http://localhost:8080';
// const API_BASE_URL='https://jsonplaceholder.typicode.com/todos/1';

// import {API_BASE_URL} from "./config/runTimeConfig";

export const GET = {
    // Dancers
    getAllDancers: () => `${API_BASE_URL}/dancers`,
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
import requestWrapper from "./requestWrapper";
import {DELETE, GET, POST} from "./Endpoints";

export const getEvents = (name, country, city, page, size) => {
    return requestWrapper({
        axiosConfig: {
            method: 'GET',
            url: GET.getEvents(name, country, city, page, size)
        }
    })
};

export const getEvent = (id) => {
    return requestWrapper({
        axiosConfig: {
            method: 'GET',
            url: GET.getEvent(id)
        }
    });
}

export const uploadEventImage = (id, formData) => {
    return requestWrapper({
        axiosConfig: {
            method: 'post',
            url: POST.uploadEventImage(id),
            data: formData ,
            headers: {'Content-Type': 'multipart/form-data' }
        }
    })
}

export const deleteEventImage = (id) => {
    return requestWrapper({
        axiosConfig: {
            method: 'DELETE',
            url: DELETE.deleteEventImage(id),
        }
    })
}
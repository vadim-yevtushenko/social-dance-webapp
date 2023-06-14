import requestWrapper from "./requestWrapper";
import {GET, POST} from "./Endpoints";

export const getEvents = (page, size) => {
    // return requestWrapper(GET.getEvents(page, size));
    return requestWrapper({
        axiosConfig: {
            method: 'GET',
            url: GET.getEvents(page, size)
        }
    })
};

export const getEvent = (id) => {
    return requestWrapper(GET.getEvent(id));
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
import {DELETE, GET, POST} from "./Endpoints";
import {requestWrapper} from "./requestWrapper";

export const getDancers = (page, size) => {
    // return requestWrapper(GET.getDancers(page, size));
    return requestWrapper({
        axiosConfig: {
            method: 'GET',
            url: GET.getDancers(page, size)
        }
    })
};

export const fetchDancer = (id) => {
    return requestWrapper({
        axiosConfig: {
            method: 'GET',
            url: GET.getDancer(id)
        }
    });
}

export const uploadDancerImage = (id, formData) => {
    return requestWrapper({
        axiosConfig: {
            method: 'POST',
            url: POST.uploadDancerImage(id),
            data: formData ,
            headers: {'Content-Type': 'multipart/form-data' }
        }
    })
}

export const deleteDancerImage = (id) => {
    return requestWrapper({
        axiosConfig: {
            method: 'DELETE',
            url: DELETE.deleteDancerImage(id),
        }
    })
}

export const deleteDancer = (id) => {
    return requestWrapper({
        axiosConfig: {
            method: 'DELETE',
            url: DELETE.deleteDancer(id),
        }
    })
}
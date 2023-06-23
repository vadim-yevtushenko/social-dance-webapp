import RequestWrapper from "./requestWrapper";
import {GET} from "./Endpoints";

export const getGeneralRating = (schoolId) => {
    return RequestWrapper({
        axiosConfig: {
            method: 'GET',
            url: GET.getGeneralRating(schoolId)
        }
    })
}

export const getRating = (schoolId, dancerId) => {
    return RequestWrapper({
        axiosConfig: {
            method: 'GET',
            url: GET.getRating(schoolId, dancerId)
        }
    })
}
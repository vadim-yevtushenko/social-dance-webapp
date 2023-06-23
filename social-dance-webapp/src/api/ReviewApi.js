import RequestWrapper from "./requestWrapper";
import {GET} from "./Endpoints";

export const getReviews = (schoolId, page, size) => {
    return RequestWrapper({
        axiosConfig: {
            method: 'GET',
            url: GET.getReviews(schoolId, page, size)
        }
    })
}
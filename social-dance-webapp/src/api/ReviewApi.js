import RequestWrapper from "./requestWrapper";
import { GET, POST } from "./Endpoints";
import { loadingRequest } from "../redux/actions/requestActions";
import { errorHandling, successHandling } from "./notificationHandling";
import { getReviews } from "../redux/actions/feedbackActions";

export const fetchReviews = (schoolId, page, size) => (dispatch) => {
    dispatch(loadingRequest(true))
    console.log("schoolId", schoolId)
    return RequestWrapper({
        axiosConfig: {
            method: 'GET',
            url: GET.getReviews(schoolId, page, size)
        }
    }).then(res => {
        console.log("res.data", res.data)
        dispatch(getReviews(res.data))
        dispatch(loadingRequest(false))
    }).catch(error => {
        dispatch(loadingRequest(false))
        errorHandling(error)
    })
}

export const saveReview = review => (dispatch) => {
    dispatch(loadingRequest(true))
    return RequestWrapper({
        axiosConfig: {
            method: 'POST',
            url: POST.saveReview(),
            data: review,
            headers: {'Content-Type': 'application/json' }
        }
    }).then(res => {
        dispatch(loadingRequest(false))
    }).catch(error => {
        dispatch(loadingRequest(false))
        errorHandling(error)
    })
}
import RequestWrapper from "./requestWrapper";
import { GET, POST } from "./Endpoints";
import { loadingRequest } from "../redux/actions/requestActions";
import { errorHandling } from "./notificationHandling";
import { getReviews } from "../redux/actions/feedbackActions";

export const fetchReviews = (schoolId, page, size) => (dispatch) => {
    dispatch(loadingRequest(true))

    return RequestWrapper({
        axiosConfig: {
            method: 'GET',
            url: GET.getReviews(schoolId, page, size)
        }
    }).then(res => {
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
    }).then(() => {
        dispatch(loadingRequest(false))
    }).catch(error => {
        dispatch(loadingRequest(false))
        errorHandling(error)
    })
}
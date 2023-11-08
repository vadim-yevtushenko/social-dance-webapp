import RequestWrapper from "./requestWrapper";
import { GET, POST } from "./Endpoints";
import { loadingRequest } from "../redux/actions/requestActions";
import { errorHandling, successHandling } from "./notificationHandling";
import { getGeneralRating, getRating } from "../redux/actions/feedbackActions";

export const fetchGeneralRating = (objectId) => (dispatch) => {
    dispatch(loadingRequest(true))
    return RequestWrapper({
        axiosConfig: {
            method: 'GET',
            url: GET.getGeneralRating(objectId)
        }
    }).then(res => {
        dispatch(getGeneralRating(res.data))
        dispatch(loadingRequest(false))
    }).catch(error => {
        dispatch(loadingRequest(false))
        errorHandling(error)
    })
}

export const fetchRating = (objectId, dancerId) => (dispatch) => {
    dispatch(loadingRequest(true))
    return RequestWrapper({
        axiosConfig: {
            method: 'GET',
            url: GET.getRating(objectId, dancerId)
        }
    }).then(res => {
        dispatch(getRating(res.data))
        dispatch(loadingRequest(false))
    }).catch(error => {
        dispatch(loadingRequest(false))
        errorHandling(error)
    })
}

export const saveRating = rating => (dispatch) => {
    dispatch(loadingRequest(true))
    return RequestWrapper({
        axiosConfig: {
            method: 'POST',
            url: POST.saveRating(),
            data: rating,
            headers: {'Content-Type': 'application/json' }
        }
    }).then(res => {
        dispatch(getRating(res.data))
        dispatch(loadingRequest(false))
    }).then(() => {
        successHandling("Rating saved!")
    }).catch(error => {
        dispatch(loadingRequest(false))
        errorHandling(error)
    })
}
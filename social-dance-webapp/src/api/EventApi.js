import requestWrapper from "./requestWrapper";
import { DELETE, GET, POST } from "./Endpoints";
import {getEvents, getViewObject} from "../redux/actions/ListsActions";
import { loadingRequest } from "../redux/actions/requestActions";
import { errorHandling, successHandling } from "./notificationHandling";
import { getOrganizedEvent } from "../redux/actions/eventActions";

export const fetchEvents = (name, country, city, page, size) => (dispatch) => {
    dispatch(loadingRequest(true))
    return requestWrapper({
        axiosConfig: {
            method: 'GET',
            url: GET.getEvents(name, country, city, page, size)
        }
    }).then(res => {
        dispatch(getEvents(res.data))
        dispatch(loadingRequest(false))
    }).catch(error => {
        dispatch(loadingRequest(false))
        errorHandling(error)
    })
};

export const fetchOrganizedEvent = (id) => (dispatch) => {
    dispatch(loadingRequest(true))
    return requestWrapper({
        axiosConfig: {
            method: 'GET',
            url: GET.getEvent(id)
        }
    }).then(res => {
        dispatch(getOrganizedEvent(res.data))
        dispatch(loadingRequest(false))
    }).catch(error => {
        dispatch(loadingRequest(false))
        errorHandling(error)
    })
}

export const fetchViewEvent = (id) => (dispatch) => {
    dispatch(loadingRequest(true))
    return requestWrapper({
        axiosConfig: {
            method: 'GET',
            url: GET.getEvent(id)
        }
    }).then(res => {
        dispatch(getViewObject(res.data))
        dispatch(loadingRequest(false))
    }).catch(error => {
        dispatch(loadingRequest(false))
        errorHandling(error)
    })
}

export const saveEvent = (event) => (dispatch) => {
    dispatch(loadingRequest(true))
    return requestWrapper({
        axiosConfig: {
            method: 'POST',
            url: POST.saveEvent(),
            data: event,
            headers: {'Content-Type': 'application/json' }
        }
    }).then(res => {
        dispatch(getOrganizedEvent(res.data))
        dispatch(loadingRequest(false))
    }).then(() => {
        successHandling("Event info saved!")
    }).catch(error => {
        dispatch(loadingRequest(false))
        errorHandling(error)
    })
}

export const uploadEventImage = (id, formData) => (dispatch) => {
    dispatch(loadingRequest(true))
    return requestWrapper({
        axiosConfig: {
            method: 'post',
            url: POST.uploadEventImage(id),
            data: formData ,
            headers: {'Content-Type': 'multipart/form-data' }
        }
    }).then(() => {
        dispatch(loadingRequest(false))
    }).then(() => {
        successHandling("Image uploaded!")
    }).catch(error => {
        dispatch(loadingRequest(false))
        errorHandling(error)
    })
}

export const deleteEventImage = (id) => (dispatch) => {
    dispatch(loadingRequest(true))
    return requestWrapper({
        axiosConfig: {
            method: 'DELETE',
            url: DELETE.deleteEventImage(id),
        }
    }).then(() => {
        dispatch(loadingRequest(false))
    }).then(() => {
        successHandling("Image deleted!")
    }).catch(error => {
        dispatch(loadingRequest(false))
        errorHandling(error)
    })
}

export const deleteEvent = (id) => (dispatch) => {
    dispatch(loadingRequest(true))
    return requestWrapper({
        axiosConfig: {
            method: 'DELETE',
            url: DELETE.deleteEvent(id),
        }
    }).then(() => {
        dispatch(getOrganizedEvent({}))
        dispatch(loadingRequest(false))
    }).then(() => {
        successHandling("Event deleted!")
    }).catch(error => {
        dispatch(loadingRequest(false))
        errorHandling(error)
    })
}
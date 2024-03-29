import requestWrapper from "./requestWrapper";
import { DELETE, GET, POST } from "./Endpoints";
import {getEvents, getViewObject} from "../redux/actions/listsActions";
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

export const saveEvent = (event, organizerId) => (dispatch, getState) => {
    let eventId
    dispatch(loadingRequest(true))
    return requestWrapper({
        dispatch,
        getState,
        axiosConfig: {
            method: 'POST',
            url: POST.saveEvent(organizerId),
            data: event,
            headers: {'Content-Type': 'application/json' }
        }
    }).then(res => {
        eventId = res.data.id
        dispatch(getOrganizedEvent(res.data))
        dispatch(loadingRequest(false))
    }).then(() => {
        successHandling("Event info saved!")
        if (event.id === null || event.id === undefined){
            event = {...event, id: eventId}
            requestWrapper({
                dispatch,
                getState,
                axiosConfig: {
                    method: 'POST',
                    url: POST.notifyCreatedEvent(),
                    data: event,
                    headers: {'Content-Type': 'application/json' }
                }
            }).then()
        }
    }).catch(error => {
        dispatch(loadingRequest(false))
        errorHandling(error)
    })
}

export const uploadEventImage = (id, organizerId, formData) => (dispatch, getState) => {
    dispatch(loadingRequest(true))
    return requestWrapper({
        dispatch,
        getState,
        axiosConfig: {
            method: 'POST',
            url: POST.uploadEventImage(id, organizerId),
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

export const deleteEventImage = (id, organizerId) => (dispatch, getState) => {
    dispatch(loadingRequest(true))
    return requestWrapper({
        dispatch,
        getState,
        axiosConfig: {
            method: 'DELETE',
            url: DELETE.deleteEventImage(id, organizerId),
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

export const deleteEvent = (id, organizerId) => (dispatch, getState) => {
    dispatch(loadingRequest(true))
    return requestWrapper({
        dispatch,
        getState,
        axiosConfig: {
            method: 'DELETE',
            url: DELETE.deleteEvent(id, organizerId),
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
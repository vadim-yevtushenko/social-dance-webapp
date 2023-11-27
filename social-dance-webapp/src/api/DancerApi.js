import { DELETE, GET, POST } from "./Endpoints";
import { requestWrapper } from "./requestWrapper";
import { loadingRequest } from "../redux/actions/requestActions";
import { errorHandling, successHandling } from "./notificationHandling";
import { dancerLogout, updateDancer } from "../redux/actions/authActions";
import { getOrganizedEvent } from "../redux/actions/eventActions";
import { getAdministratedSchool } from "../redux/actions/schoolActions";
import { getDancers } from "../redux/actions/listsActions";


export const fetchDancers = (name, lastName, country, city, page, size) => (dispatch) => {
    dispatch(loadingRequest(true))
    return requestWrapper({
        axiosConfig: {
            method: 'GET',
            url: GET.getDancers(name, lastName, country, city, page, size)
        }
    }).then(res => {
        dispatch(getDancers(res.data))
        dispatch(loadingRequest(false))
    }).catch(error => {
        dispatch(loadingRequest(false))
        errorHandling(error)
    })
};

export const fetchDancer = (id) => (dispatch) => {
    dispatch(loadingRequest(true))
    return requestWrapper({
        axiosConfig: {
            method: 'GET',
            url: GET.getDancer(id)
        }
    }).then(res => {
        dispatch(updateDancer(res.data))
        dispatch(loadingRequest(false))
    }).catch(error => {
        dispatch(loadingRequest(false))
        errorHandling(error)
    })
}

export const saveDancer = (dancer) => (dispatch) => {
    dispatch(loadingRequest(true))
    return requestWrapper({
        axiosConfig: {
            method: 'POST',
            url: POST.saveDancer(),
            data: dancer,
            headers: {'Content-Type': 'application/json' }
        }
    }).then(res => {
        dispatch(updateDancer(res.data))
        dispatch(loadingRequest(false))
    }).then(() => {
        successHandling("Personal info saved!")
    }).catch(error => {
        dispatch(loadingRequest(false))
        errorHandling(error)
    })
}

export const uploadDancerImage = (id, formData) => (dispatch) => {
    dispatch(loadingRequest(true))
    return requestWrapper({
        axiosConfig: {
            method: 'POST',
            url: POST.uploadDancerImage(id),
            data: formData ,
            headers: {'Content-Type': 'multipart/form-data' }
        }
    }).then(() => {
        dispatch(loadingRequest(false))
        successHandling("Photo saved!")
    }).catch(error => {
        dispatch(loadingRequest(false))
        errorHandling(error)
    })
}

export const deleteDancerImage = (id) => (dispatch) => {
    dispatch(loadingRequest(true))
    return requestWrapper({
        axiosConfig: {
            method: 'DELETE',
            url: DELETE.deleteDancerImage(id),
        }
    }).then(() => {
        dispatch(loadingRequest(false))
        successHandling("Photo deleted!")
    }).catch(error => {
        dispatch(loadingRequest(false))
        errorHandling(error)
    })
}

export const deleteDancer = (id, email, password) => (dispatch) => {
    dispatch(loadingRequest(true))
    return requestWrapper({
        axiosConfig: {
            method: 'POST',
            url: POST.login(email, password)
        }
    }).then(() => {
        requestWrapper({
            axiosConfig: {
                method: 'DELETE',
                url: DELETE.deleteDancer(id),
            }
        }).then()
    }).then(() => {
        dispatch(getOrganizedEvent({}))
        dispatch(getAdministratedSchool({}))
        dispatch(dancerLogout())
        dispatch(loadingRequest(false))
        successHandling("Dancer deleted!")
    }).catch(error => {
        dispatch(loadingRequest(false))
        errorHandling(error)
    })
}
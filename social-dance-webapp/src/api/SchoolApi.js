import requestWrapper from "./requestWrapper";
import {DELETE, GET, POST} from "./Endpoints";
import {getViewObject, getList} from "../redux/actions/listsActions";
import {loadingRequest} from "../redux/actions/requestActions";
import {errorHandling, successHandling} from "./notificationHandling";
import {getAdministratedSchool} from "../redux/actions/schoolActions";

export const getSchools = (name, country, city, page, size) => (dispatch) => {
    return requestWrapper({
        axiosConfig: {
            method: 'GET',
            url: GET.getSchools(name, country, city, page, size)
        }
    }).then(res => {
        dispatch(getList(res.data))
        dispatch(loadingRequest(false))
    }).catch(error => {
        dispatch(loadingRequest(false))
        errorHandling(error)
    })
};

export const fetchAdministratedSchool = (id) => (dispatch) => {
    return requestWrapper({
        axiosConfig: {
            method: 'GET',
            url: GET.getSchool(id)
        }
    }).then(res => {
        dispatch(getAdministratedSchool(res.data))
        dispatch(loadingRequest(false))
    }).catch(error => {
        dispatch(loadingRequest(false))
        errorHandling(error)
    })
}

export const fetchViewSchool = (id) => (dispatch) => {
    dispatch(loadingRequest(true))
    return requestWrapper({
        axiosConfig: {
            method: 'GET',
            url: GET.getSchool(id)
        }
    }).then(res => {
        dispatch(getViewObject(res.data))
        dispatch(loadingRequest(false))
    }).catch(error => {
        dispatch(loadingRequest(false))
        errorHandling(error)
    })
}

export const saveSchool = (school) => (dispatch) => {
    dispatch(loadingRequest(true))
    return requestWrapper({
        axiosConfig: {
            method: 'POST',
            url: POST.saveSchool(),
            data: school,
            headers: {'Content-Type': 'application/json' }
        }
    }).then(res => {
        dispatch(getAdministratedSchool(res.data))
        dispatch(loadingRequest(false))
    }).then(() => {
        successHandling("School info saved!")
    }).catch(error => {
        dispatch(loadingRequest(false))
        errorHandling(error)
    })
}

export const uploadSchoolImage = (id, formData) => (dispatch) => {
    dispatch(loadingRequest(true))
    return requestWrapper({
        axiosConfig: {
            method: 'post',
            url: POST.uploadSchoolImage(id),
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

export const deleteSchoolImage = (id) => (dispatch) => {
    dispatch(loadingRequest(true))
    return requestWrapper({
        axiosConfig: {
            method: 'DELETE',
            url: DELETE.deleteSchoolImage(id),
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

export const deleteSchool = (id) => (dispatch) => {
    dispatch(loadingRequest(true))
    return requestWrapper({
        axiosConfig: {
            method: 'DELETE',
            url: DELETE.deleteSchool(id),
        }
    }).then(() => {
        dispatch(getAdministratedSchool({}))
        dispatch(loadingRequest(false))
    }).then(() => {
        successHandling("School deleted!")
    }).catch(error => {
        dispatch(loadingRequest(false))
        errorHandling(error)
    })
}
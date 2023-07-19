import requestWrapper from "./requestWrapper";
import {POST} from "./Endpoints";
import {dancerLogin, updateDancer, updatePassword} from "../redux/actions/authActions";
import {loadingRequest} from "../redux/actions/requestActions";
import {errorHandling, successHandling} from "./notificationHandling";

export const login = (email, password) => (dispatch) => {
    dispatch(loadingRequest(true))
    return requestWrapper({
        axiosConfig: {
            method: 'POST',
            url: POST.login(email, password)
        }
    }).then(res => {
        const isAuth = res.data != null
        dispatch(dancerLogin(email, password, isAuth))
        dispatch(updateDancer(res.data))
        dispatch(loadingRequest(false))
    }).catch(error => {
        dispatch(loadingRequest(false))
        errorHandling(error)
    })
}

export const signup = (email, password, dancer) => (dispatch) => {
    dispatch(loadingRequest(true))
    return requestWrapper({
        axiosConfig: {
            method: 'POST',
            url: POST.registration(email, password),
            data: dancer,
            headers: {'Content-Type': 'application/json' }
        }
    }).then(res => {
        const isAuth = res.data != null
        dispatch(dancerLogin(email, password, isAuth))
        dispatch(updateDancer(res.data))
        dispatch(loadingRequest(false))
    }).catch(error => {
        dispatch(loadingRequest(false))
        errorHandling(error)
    })
}

export const changePassword = (email, newPassword, oldPassword) => (dispatch) => {
    dispatch(loadingRequest(true))
    return requestWrapper({
        axiosConfig: {
            method: 'POST',
            url: POST.changePassword(email, newPassword, oldPassword)
        }
    }).then(() => {
        dispatch(updatePassword(newPassword))
        dispatch(loadingRequest(false))
        successHandling("Password changed successful.")
    }).catch(error => {
        dispatch(loadingRequest(false))
        errorHandling(error)
    })
}

export const resetPassword = (email) => (dispatch) => {
    dispatch(loadingRequest(true))
    return requestWrapper({
        axiosConfig: {
            method: 'POST',
            url: POST.resetPassword(email)
        }
    }).then(() => {
        dispatch(loadingRequest(false))
        successHandling("Check your email.\nYou can change password in your profile settings.")
    }).catch(error => {
        dispatch(loadingRequest(false))
        errorHandling(error)
    })
}


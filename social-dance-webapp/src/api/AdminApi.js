import {loadingRequest} from "../redux/actions/requestActions";
import {POST} from "./Endpoints";
import {errorHandling, successHandling} from "./notificationHandling";
import requestWrapper from "./requestWrapper";

export const sendSupportEmail = (emailObj) => (dispatch) => {
    dispatch(loadingRequest(true))
    return requestWrapper({
        axiosConfig: {
            method: 'POST',
            url: POST.supportEmail(),
            data: emailObj,
            headers: {'Content-Type': 'application/json' }
        }
    }).then(() => {
        dispatch(loadingRequest(false))
        successHandling("Your message sent to support, thank you!")
    }).catch(error => {
        dispatch(loadingRequest(false))
        errorHandling(error)
    })
}
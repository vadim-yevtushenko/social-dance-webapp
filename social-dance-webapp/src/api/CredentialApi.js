import requestWrapper from "./requestWrapper";
import {POST} from "./Endpoints";
import {dancerLogin} from "../redux/actions/authActions";

export const login = (email, password) => {
    return requestWrapper({
        axiosConfig: {
            method: 'POST',
            url: POST.login(email, password)
        }
    })
}

// export const login = ({email, password}) => (dispatch) => {
//     console.log("login")
//     return requestWrapper(POST.login(email, password), "POST")
//         .then(res => {
//                         console.log("res", res)
//                         dispatch(userLogin({email, password}, res))
//                     })
//                     .catch(error => {
//                         console.log("error", error)
//                     })
// }

export const signup = (email, password, formData) => {
    return requestWrapper({
        axiosConfig: {
            method: 'post',
            url: POST.registration(email, password),
            data: formData,
            headers: {'Content-Type': 'multipart/form-data'}
        }
    })
}

export const changePassword = (email, password) => {
    return requestWrapper({
        axiosConfig: {
            method: 'POST',
            url: POST.changePassword(email, password)
        }
    })
}


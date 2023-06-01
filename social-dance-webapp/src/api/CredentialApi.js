import requestWrapper from "./requestWrapper";
import {POST} from "./Endpoints";
import {dancerLogin} from "../redux/actions/authActions";

export const login = (email, password) => {
    return requestWrapper(POST.login(email, password), "POST")
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

export const signup = (email, password, dancer) => {
    return requestWrapper(POST.registration(email, password), "POST", dancer)

}
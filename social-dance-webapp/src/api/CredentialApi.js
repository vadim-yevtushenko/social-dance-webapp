import requestWrapper from "./requestWrapper";
import {GET, POST} from "./Endpoints";

export const login = (email, password) => {
    return requestWrapper(GET.login(email, password))
}

export const signup = (email, password, dancer) => {
    return requestWrapper(GET.login(email, password), "POST", dancer)

}
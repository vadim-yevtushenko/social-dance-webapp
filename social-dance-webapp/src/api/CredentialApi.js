import {getResource} from "./request";
import {GET} from "./Endpoints";

export const login = (email, password) => {
    return getResource(GET.login(email, password))
}
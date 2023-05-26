import requestWrapper from "./requestWrapper";
import {GET} from "./Endpoints";

export const getSchools = (page, size) => {
    return requestWrapper(GET.getSchools(page, size));
};

export const getSchool = (id) => {
    return requestWrapper(GET.getSchool(id));
}
import {getResource} from "./request";
import {GET} from "./Endpoints";

export const getSchools = (page, size) => {
    return getResource(GET.getSchools(page, size));
};

export const getSchool = (id) => {
    return getResource(GET.getSchool(id));
}
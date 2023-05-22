import {GET} from "./Endpoints";
import {getResource} from "./request";

export const getDancers = (page, size) => {
    return getResource(GET.getDancers(page, size));
};

export const getDancer = (id) => {
    return getResource(GET.getDancer(id));
}
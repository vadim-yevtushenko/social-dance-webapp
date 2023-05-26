import {GET} from "./Endpoints";
import requestWrapper from "./requestWrapper";

export const getDancers = (page, size) => {
    return requestWrapper(GET.getDancers(page, size));
};

export const getDancer = (id) => {
    return requestWrapper(GET.getDancer(id));
}
import requestWrapper from "./requestWrapper";
import {GET} from "./Endpoints";

export const getEvents = (page, size) => {
    return requestWrapper(GET.getEvents(page, size));
};

export const getEvent = (id) => {
    return requestWrapper(GET.getEvent(id));
}